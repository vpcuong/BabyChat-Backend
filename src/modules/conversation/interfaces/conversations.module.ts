import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsController } from './conversations.controller';
import { ConversationDocument, ConversationSchema } from 'src/modules/conversation/infrastructure/conversation.schema';
import { ConversationRepository } from 'src/modules/conversation/infrastructure/conversation.repository';
import { IConversationRepository } from 'src/modules/conversation/domain/i-conversation.repository';
import { UserModule } from 'src/modules/user/interfaces/users.module';
import { PageModule } from 'src/modules/message/interfaces/page.module';
import { CreateConversationUseCase } from 'src/modules/conversation/application/use-cases/create-conversation.usecase';
import { SendMessageUseCase } from 'src/modules/conversation/application/use-cases/send-message.usecase';
import {
  GetConversationsByUserUseCase,
  GetConversationByIdUseCase,
  GetMessagesByPageUseCase,
  GetPageListUseCase,
} from 'src/modules/conversation/application/use-cases/get-conversation.usecase';
import { EventBus, EVENT_BUS } from 'src/shared/events/event-bus';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConversationDocument.name, schema: ConversationSchema },
    ]),
    UserModule,
    PageModule,
  ],
  controllers: [ConversationsController],
  providers: [
    { provide: IConversationRepository, useClass: ConversationRepository },
    { provide: EVENT_BUS, useClass: EventBus },
    CreateConversationUseCase,
    SendMessageUseCase,
    GetConversationsByUserUseCase,
    GetConversationByIdUseCase,
    GetMessagesByPageUseCase,
    GetPageListUseCase,
  ],
})
export class ConversationsModule {}
