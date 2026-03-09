import { Inject, Injectable } from '@nestjs/common';
import { IConversationRepository } from 'src/domain/conversation/repositories/i-conversation.repository';
import { IPageRepository } from 'src/domain/message/repositories/i-page.repository';
import { PageEntity } from 'src/domain/message/entities/page.entity';
import { MessageEntity } from 'src/domain/message/entities/message.entity';
import {
  ConversationNotFoundException,
  NotParticipantException,
} from 'src/common/exceptions/domain-exceptions';
import { IEventBus, EVENT_BUS } from 'src/infrastructure/events/event-bus';
import { MessageSentEvent } from 'src/domain/message/events/message-sent.event';
import { PageCreatedEvent } from 'src/domain/message/events/page-created.event';

export interface SendMessageCommand {
  conversationId: string;
  senderId: string;
  content: string;
  replyId?: string;
}

@Injectable()
export class SendMessageUseCase {
  constructor(
    @Inject(IConversationRepository) private readonly conversationRepository: IConversationRepository,
    @Inject(IPageRepository) private readonly pageRepository: IPageRepository,
    @Inject(EVENT_BUS) private readonly eventBus: IEventBus,
  ) {}

  async execute(command: SendMessageCommand): Promise<MessageEntity> {
    const conversation = await this.conversationRepository.findById(command.conversationId);
    if (!conversation) throw new ConversationNotFoundException(command.conversationId);

    if (!conversation.isParticipant(command.senderId)) {
      throw new NotParticipantException(command.senderId);
    }

    const pages = await this.pageRepository.findByConversationId(command.conversationId);
    let targetPage: PageEntity;

    const lastPage = pages[pages.length - 1];
    if (pages.length === 0 || lastPage.isFull) {
      const newPageNumber = pages.length + 1;
      const newPage = PageEntity.create({
        conversationId: command.conversationId,
        pageNumber: newPageNumber,
        pageSize: conversation.pages.limit,
      });
      targetPage = await this.pageRepository.save(newPage);

      await this.conversationRepository.addPageRef(
        command.conversationId,
        targetPage.id!,
        targetPage.pageNumber,
      );

      this.eventBus.publish(
        new PageCreatedEvent(targetPage.id!, command.conversationId, targetPage.pageNumber),
      );
    } else {
      targetPage = lastPage;
    }

    const message = MessageEntity.create({
      senderId: command.senderId,
      content: command.content,
      replyId: command.replyId,
    });

    const updatedPage = await this.pageRepository.addMessage(targetPage.id!, message);
    const savedMessage = updatedPage.messages[updatedPage.messages.length - 1] as MessageEntity;

    this.eventBus.publish(
      new MessageSentEvent(
        command.conversationId,
        command.senderId,
        savedMessage.id ?? 'unknown',
        command.content,
        targetPage.id!,
      ),
    );

    return savedMessage;
  }
}
