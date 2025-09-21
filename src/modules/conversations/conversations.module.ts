import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSchema, Conversation } from './entities/conversation';
import { UserModule } from '../users/users.module';
import { PageModule } from '../pages/page.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Conversation.name, 
        schema: ConversationSchema 
      }
    ]),
    UserModule,
    PageModule,
    MessageModule
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService]
})
export class ConversationsModule {}
