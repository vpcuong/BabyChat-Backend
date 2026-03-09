import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { ConversationDocument, ConversationSchema } from 'src/infrastructure/persistence/schemas/conversation.schema';
import { ConversationRepository } from 'src/infrastructure/persistence/repositories/conversation.repository';
import { IConversationRepository } from 'src/domain/conversation/repositories/i-conversation.repository';
import { UserModule } from '../users/users.module';
import { PageModule } from '../pages/page.module';
import { CreateConversationUseCase } from 'src/application/conversation/use-cases/create-conversation.usecase';
import { SendMessageUseCase } from 'src/application/conversation/use-cases/send-message.usecase';
import {
  GetConversationsByUserUseCase,
  GetConversationByIdUseCase,
  GetMessagesByPageUseCase,
  GetPageListUseCase,
} from 'src/application/conversation/use-cases/get-conversation.usecase';
import { EventBus, EVENT_BUS } from 'src/infrastructure/events/event-bus';

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
    ConversationsService,
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
