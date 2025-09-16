import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/users/users.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES');

        if(!secret) {
          throw new Error('JWT_SECRET is not defined');
        }

        if(!expiresIn) {
          throw new Error('JWT_ACCESS_TOKEN_EXPIRES is not defined');
        }

        return {
          secret: configService.get<string>('JWT_SECRET'), 
          signOptions: { expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES') }
        } 
      },
      inject: [ConfigService],
      global: true
    }),
    UserModule,
    ConversationsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
