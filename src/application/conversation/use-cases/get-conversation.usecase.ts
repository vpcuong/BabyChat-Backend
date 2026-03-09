import { Inject, Injectable } from '@nestjs/common';
import { IConversationRepository } from 'src/domain/conversation/repositories/i-conversation.repository';
import { IPageRepository } from 'src/domain/message/repositories/i-page.repository';
import { ConversationEntity } from 'src/domain/conversation/entities/conversation.entity';
import { MessageEntity } from 'src/domain/message/entities/message.entity';
import { ConversationNotFoundException } from 'src/common/exceptions/domain-exceptions';

@Injectable()
export class GetConversationsByUserUseCase {
  constructor(
    @Inject(IConversationRepository) private readonly conversationRepository: IConversationRepository,
  ) {}

  async execute(userId: string): Promise<ConversationEntity[]> {
    return this.conversationRepository.findByUserId(userId);
  }
}

@Injectable()
export class GetConversationByIdUseCase {
  constructor(
    @Inject(IConversationRepository) private readonly conversationRepository: IConversationRepository,
  ) {}

  async execute(id: string): Promise<ConversationEntity> {
    const conv = await this.conversationRepository.findById(id);
    if (!conv) throw new ConversationNotFoundException(id);
    return conv;
  }
}

@Injectable()
export class GetMessagesByPageUseCase {
  constructor(
    @Inject(IPageRepository) private readonly pageRepository: IPageRepository,
  ) {}

  async execute(conversationId: string, pageNumber: number): Promise<MessageEntity[]> {
    return this.pageRepository.getMessagesByPageNumber(conversationId, pageNumber);
  }
}

@Injectable()
export class GetPageListUseCase {
  constructor(
    @Inject(IConversationRepository) private readonly conversationRepository: IConversationRepository,
  ) {}

  async execute(conversationId: string): Promise<{ page: number; limit: number; list: string[] }> {
    const conv = await this.conversationRepository.findById(conversationId);
    if (!conv) throw new ConversationNotFoundException(conversationId);
    return conv.pages;
  }
}
