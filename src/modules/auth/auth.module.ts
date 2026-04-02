import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategies";
import { JwtStrategy } from "./strategies/jwt.strategies";
import { RegisterUserUseCase } from "src/application/auth/use-cases/register-user.usecase";
import { LoginUserUseCase } from "src/application/auth/use-cases/login-user.usecase";
import { EventBus, EVENT_BUS } from "src/infrastructure/events/event-bus";
import { UserModule } from "../users/users.module";

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    RegisterUserUseCase,
    LoginUserUseCase,
    { provide: EVENT_BUS, useClass: EventBus },
  ],
})
export class AuthModule {}
