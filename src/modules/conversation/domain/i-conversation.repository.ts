import { ConversationEntity } from './conversation.entity';

export abstract class IConversationRepository {
  abstract findById(id: string): Promise<ConversationEntity | null>;
  abstract findByUserId(userId: string): Promise<ConversationEntity[]>;
  abstract save(conversation: ConversationEntity): Promise<ConversationEntity>;
  abstract update(conversation: ConversationEntity): Promise<ConversationEntity>;
  abstract addPageRef(conversationId: string, pageId: string, pageNumber: number): Promise<void>;
}

export const CONVERSATION_REPOSITORY = IConversationRepository;
