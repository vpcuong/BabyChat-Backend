import { Inject, Injectable } from '@nestjs/common';
import { IConversationRepository } from 'src/domain/conversation/repositories/i-conversation.repository';
import { IUserRepository } from 'src/domain/user/repositories/i-user.repository';
import { ConversationEntity, ConversationType, ConversationSettings } from 'src/domain/conversation/entities/conversation.entity';
import { UserNotFoundException } from 'src/common/exceptions/domain-exceptions';
import { IEventBus, EVENT_BUS } from 'src/infrastructure/events/event-bus';
import { ConversationCreatedEvent } from 'src/domain/conversation/events/conversation-created.event';

export interface CreateConversationCommand {
  type: ConversationType;
  createdByUserId: string;
  participantUserIds: string[];
  name?: string;
  description?: string;
  avatar?: string;
  settings?: Partial<ConversationSettings>;
}

@Injectable()
export class CreateConversationUseCase {
  constructor(
    @Inject(IConversationRepository) private readonly conversationRepository: IConversationRepository,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(EVENT_BUS) private readonly eventBus: IEventBus,
  ) {}

  async execute(command: CreateConversationCommand): Promise<ConversationEntity> {
    for (const userId of command.participantUserIds) {
      const exists = await this.userRepository.findById(userId);
      if (!exists) throw new UserNotFoundException(userId);
    }

    const conversation = ConversationEntity.create({
      type: command.type,
      createdByUserId: command.createdByUserId,
      participantUserIds: command.participantUserIds,
      name: command.name,
      description: command.description,
      avatar: command.avatar,
      settings: command.settings,
    });

    const saved = await this.conversationRepository.save(conversation);

    this.eventBus.publish(
      new ConversationCreatedEvent(
        saved.id ?? saved.createdBy,
        saved.type,
        command.createdByUserId,
        command.participantUserIds,
      ),
    );

    return saved;
  }
}
