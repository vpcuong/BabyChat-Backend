import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "./guards/auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RegisterDto, LoginDto } from "./dto/auth.dto";
import { RegisterUserUseCase } from "src/modules/user/application/use-cases/register-user.usecase";
import { LoginUserUseCase } from "src/modules/user/application/use-cases/login-user.usecase";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.registerUserUseCase.execute({
      email: dto.email,
      password: dto.password,
      username: dto.username,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUserUseCase.execute({ email: dto.email, password: dto.password });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout() {
    // TODO: implement token blacklist (Redis)
    return { message: 'Logged out successfully' };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getInfo(@Request() request) {
    return request.user;
  }
}
