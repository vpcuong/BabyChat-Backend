import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategies";
import { JwtStrategy } from "./strategies/jwt.strategies";
import { RegisterUserUseCase } from "src/application/auth/use-cases/register-user.usecase";
import { LoginUserUseCase } from "src/application/auth/use-cases/login-user.usecase";
import { EventBus, EVENT_BUS } from "src/infrastructure/events/event-bus";

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RegisterUserUseCase,
    LoginUserUseCase,
    { provide: EVENT_BUS, useClass: EventBus },
  ],
})
export class AuthModule {}
