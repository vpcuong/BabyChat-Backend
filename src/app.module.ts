import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './modules/user/interfaces/users.module';
import { ConversationsModule } from './modules/conversation/interfaces/conversations.module';
import { AuthModule } from './modules/auth/interfaces/auth.module';
import { MessageModule } from './modules/message/interfaces/message.module';
import { PageModule } from './modules/message/interfaces/page.module';
import { EventBus, EVENT_BUS } from './shared/events/event-bus';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
        if (!secret) throw new Error('JWT_SECRET is not defined');
        if (!expiresIn) throw new Error('JWT_ACCESS_TOKEN_EXPIRES is not defined');
        return { secret, signOptions: { expiresIn }, global: true };
      },
      inject: [ConfigService],
      global: true,
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    ConversationsModule,
    AuthModule,
    MessageModule,
    PageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: EVENT_BUS, useClass: EventBus },
    EventBus,
  ],
  exports: [EVENT_BUS],
})
export class AppModule {}
