import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSchema, Conversation } from './entities/conversation';
@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Conversation.name, 
        schema: ConversationSchema 
      }
    ]),
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService]
})
export class ConversationsModule {}
