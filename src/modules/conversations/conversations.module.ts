import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSchema, Conversation } from './entities/conversation';
import { User } from '../users/entities/user';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Conversation.name, 
        schema: ConversationSchema 
      }
    ]),
    UserModule
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService]
})
export class ConversationsModule {}
