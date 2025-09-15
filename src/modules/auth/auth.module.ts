import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategies";
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'cuongvp123',
      signOptions: {expiresIn: '10m'}
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: []
})

export class AuthModule {}