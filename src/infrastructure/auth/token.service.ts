import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const TOKEN_SERVICE = 'ITokenService';

export interface TokenPayload {
  sub: string;
  email: string;
  username: string;
}

export interface ITokenService {
  generateAccessToken(payload: TokenPayload): Promise<string>;
  generateRefreshToken(payload: TokenPayload): string;
  verifyToken(token: string): TokenPayload;
}

/**
 * TokenService — Infrastructure concern
 * Wraps JwtService so domain/application layers never import JWT directly.
 */
@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync({ ...payload });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign({ ...payload }, { expiresIn: '7d' });
  }

  verifyToken(token: string): TokenPayload {
    return this.jwtService.verify<TokenPayload>(token);
  }
}
