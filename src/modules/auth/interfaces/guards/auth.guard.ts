import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if(!authorization) {
      throw new UnauthorizedException('Authorization header not found');
    }
    
    const token = authorization.split(' ')[1];

    if(!token) {
      throw new UnauthorizedException('Token not found');
    }

    try{
      const tokenPayload = await this.jwtService.verifyAsync(token);
      request.user = tokenPayload;

      return true;
    }
    catch(e) {
      throw new UnauthorizedException('Invalid token');
    } 
  }
}