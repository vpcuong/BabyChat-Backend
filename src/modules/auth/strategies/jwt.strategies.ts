import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // Payload chứa thông tin được encode trong JWT
    const user = await this.userService.getUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }
    
    return { 
      userId: payload.sub, 
      email: payload.email,
      roles: payload.roles 
    };
  }
}