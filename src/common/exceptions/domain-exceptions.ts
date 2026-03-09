import { HttpException, HttpStatus } from '@nestjs/common';

// ─── User exceptions ──────────────────────────────────────────────────────────

export class UserNotFoundException extends HttpException {
  constructor(identifier?: string) {
    const message = identifier ? `User '${identifier}' not found` : 'User not found';
    super({ error: 'UserNotFound', message, statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }
}

export class UserAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(
      { error: 'UserAlreadyExists', message: `User with email '${email}' already exists`, statusCode: HttpStatus.CONFLICT },
      HttpStatus.CONFLICT,
    );
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      { error: 'InvalidCredentials', message: 'Email or password is incorrect', statusCode: HttpStatus.UNAUTHORIZED },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

// ─── Conversation exceptions ──────────────────────────────────────────────────

export class ConversationNotFoundException extends HttpException {
  constructor(id?: string) {
    const message = id ? `Conversation '${id}' not found` : 'Conversation not found';
    super({ error: 'ConversationNotFound', message, statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }
}

export class NotParticipantException extends HttpException {
  constructor(userId: string) {
    super(
      { error: 'NotParticipant', message: `User '${userId}' is not a participant of this conversation`, statusCode: HttpStatus.FORBIDDEN },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class AlreadyParticipantException extends HttpException {
  constructor(userId: string) {
    super(
      { error: 'AlreadyParticipant', message: `User '${userId}' is already a participant`, statusCode: HttpStatus.CONFLICT },
      HttpStatus.CONFLICT,
    );
  }
}

export class InvalidConversationTypeException extends HttpException {
  constructor(type: string) {
    super(
      { error: 'InvalidConversationType', message: `Conversation type '${type}' is not valid`, statusCode: HttpStatus.BAD_REQUEST },
      HttpStatus.BAD_REQUEST,
    );
  }
}

// ─── Page / Message exceptions ────────────────────────────────────────────────

export class PageNotFoundException extends HttpException {
  constructor(id?: string) {
    const message = id ? `Page '${id}' not found` : 'Page not found';
    super({ error: 'PageNotFound', message, statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }
}

export class PageFullException extends HttpException {
  constructor(pageId: string) {
    super(
      { error: 'PageFull', message: `Page '${pageId}' is full and cannot accept new messages`, statusCode: HttpStatus.CONFLICT },
      HttpStatus.CONFLICT,
    );
  }
}

export class EmptyMessageException extends HttpException {
  constructor() {
    super(
      { error: 'EmptyMessage', message: 'Message content cannot be empty', statusCode: HttpStatus.BAD_REQUEST },
      HttpStatus.BAD_REQUEST,
    );
  }
}
