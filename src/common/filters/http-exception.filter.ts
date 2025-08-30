import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import { BusinessException } from '../exceptions/business-exceptions';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | object;
    let error: string;

    if (exception instanceof HttpException) {
      // Handle NestJS HTTP exceptions
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = exception.constructor.name;
      } else {
        message = (exceptionResponse as any).message || exceptionResponse;
        error = (exceptionResponse as any).error || exception.constructor.name;
      }
    }else if(exception instanceof BusinessException){
      // Handle generic errors
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'Internal server error';
      error = 'BusinessError';
    } else if (exception instanceof MongoError) {
      // Handle MongoDB errors
      const mongoError = this.handleMongoError(exception);
      status = mongoError.status;
      message = mongoError.message;
      error = 'DatabaseError';
    } else if (exception instanceof Error) {
      // Handle generic errors
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'Internal server error';
      error = 'InternalServerError';
    } else {
      // Handle unknown errors
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Something went wrong';
      error = 'UnknownError';
    }

    // Log the error
    this.logger.error(
      `${request.method} ${request.url} ${message}`,
      // exception instanceof Error ? exception.stack : exception,
      GlobalExceptionFilter.name,
    );

    // Send error response
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error: error,
      message: message,
    };

    response.status(status).json(errorResponse);
  }

  private handleMongoError(error: MongoError): { status: number; message: string } {
    switch (error.code) {
      case 11000: // Duplicate key error
        return {
          status: HttpStatus.CONFLICT,
          message: 'Resource already exists',
        };
      case 11001: // Duplicate key on update
        return {
          status: HttpStatus.CONFLICT,
          message: 'Duplicate key error',
        };
      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Database operation failed',
        };
    }
  }
}