import { PageEntity } from 'src/modules/message/domain/page.entity';
import { MessageEntity } from 'src/modules/message/domain/message.entity';
import { PageDocument } from './page.schema';

export class PageMapper {
  static toDomain(doc: PageDocument): PageEntity {
    const messages = (doc.messages ?? []).map((m) =>
      MessageEntity.reconstitute({
        id: m._id.toString(),
        senderId: m.senderId.toString(),
        content: m.content,
        replyId: m.replyId?.toString(),
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
      }),
    );

    return PageEntity.reconstitute({
      id: (doc._id as any).toString(),
      conversationId: doc.conversationId.toString(),
      pageNumber: doc.pageNumber,
      pageSize: doc.pageSize,
      messages,
      messageCount: doc.messageCount,
      startTime: doc.startTime,
      endTime: doc.endTime,
      createdAt: (doc as any).createdAt,
      updatedAt: (doc as any).updatedAt,
    });
  }

  static toPersistence(entity: PageEntity): Record<string, any> {
    return {
      conversationId: entity.conversationId,
      pageNumber: entity.pageNumber,
      pageSize: entity.pageSize,
      messageCount: entity.messageCount,
      startTime: entity.startTime,
      endTime: entity.endTime,
      messages: entity.messages.map((m) => ({
        senderId: m.senderId,
        content: m.content,
        replyId: m.replyId ?? null,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
      })),
    };
  }
}
