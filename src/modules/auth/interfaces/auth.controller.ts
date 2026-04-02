import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "./guards/auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RegisterDto, LoginDto } from "./dto/auth.dto";
import { RegisterUserUseCase } from "src/modules/user/application/use-cases/register-user.usecase";
import { LoginUserUseCase } from "src/modules/user/application/use-cases/login-user.usecase";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  @ApiResponse({ status: 201, description: 'Đăng ký thành công' })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.registerUserUseCase.execute({
      email: dto.email,
      password: dto.password,
      username: dto.username,
    });
  }

  @ApiOperation({ summary: 'Đăng nhập, trả về JWT' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công, trả về access_token' })
  @ApiResponse({ status: 401, description: 'Sai email hoặc mật khẩu' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUserUseCase.execute({ email: dto.email, password: dto.password });
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Lấy thông tin profile' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Đăng xuất' })
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
