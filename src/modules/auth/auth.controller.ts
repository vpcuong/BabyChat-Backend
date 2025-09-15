import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RegisterDto } from "../auth/dto/auth.dto";
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input : { email: string, password: string }) {
    return this.authService.login(input);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    // Implement token blacklist logic if needed
    return { message: 'Logged out successfully' };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getInfo(@Request() request) {
    return request.user;
  }
}