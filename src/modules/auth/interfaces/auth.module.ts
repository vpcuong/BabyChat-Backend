import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../infrastructure/local.strategy";
import { JwtStrategy } from "../infrastructure/jwt.strategy";
import { RegisterUserUseCase } from "src/modules/user/application/use-cases/register-user.usecase";
import { LoginUserUseCase } from "src/modules/user/application/use-cases/login-user.usecase";
import { EventBus, EVENT_BUS } from "src/shared/events/event-bus";
import { UserModule } from "src/modules/user/interfaces/users.module";

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
