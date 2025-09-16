import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

type ValidUser = {
  email: string;
  username: string
}
@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {

  }

  async validateUser({ email, password }): Promise<any> {

    const user = await this.userService.findUserByEmail(email);

    if(!user){
      throw new UnauthorizedException('', 'User not found');
    }

    if(await bcrypt.compare(password, user.password)){
      const { password, ...result} = user.toObject();
      return result;
    }

    return null;
  }

  async login(loginDto: { email: string; password: string }) {
    const user = await this.validateUser({ email: loginDto.email, password: loginDto.password }); 
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      email: user.email, 
      sub: user._id,
      username: user.username,
      roles: user.roles // FIXME: roles
    };

    const returnResult =  {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: this.generateRefreshToken(payload), // Optional
      user: user,
    };

    const checkPayload = this.jwtService.verify(returnResult.access_token);

    if(!checkPayload){
      throw new UnauthorizedException('Invalid token');
    }

    return returnResult;
  }

  async register(registerDto: { email: string; password: string; username: string }) {
    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    // Create user
    const user = await this.userService.createUser({
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
    });

    // Generate token
    return this.login({ email: user.email, password: registerDto.password });
  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newPayload = { email: payload.email, sub: payload.sub };
      
      return {
        access_token: this.jwtService.sign(newPayload),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async signIn(user: ValidUser) {

    const payload = { username: user.username, sub: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken, username: user.username, email: user.email };
  }
}