import { ConversationEntity, ConversationSettings, PageRef } from 'src/modules/conversation/domain/conversation.entity';
import { ParticipantEntity, ParticipantRole } from 'src/modules/conversation/domain/participant.entity';
import { ConversationDocument } from './conversation.schema';

export class ConversationMapper {
  static toDomain(doc: ConversationDocument): ConversationEntity {
    const participants = (doc.participants ?? []).map((p) =>
      ParticipantEntity.reconstitute({
        userId: p.userId.toString(),
        role: p.role as ParticipantRole,
        joinedAt: p.joinedAt,
        leftAt: p.leftAt,
        isActive: p.isActive ?? false,
      }),
    );

    const settings: ConversationSettings = {
      isPrivate: doc.settings?.isPrivate ?? false,
      allowInvites: doc.settings?.allowInvites ?? true,
      mutedBy: (doc.settings?.mutedBy ?? []).map((id) => id.toString()),
      pinnedBy: (doc.settings?.pinnedBy ?? []).map((id) => id.toString()),
    };

    const pages: PageRef = {
      page: doc.pages?.page ?? 0,
      limit: doc.pages?.limit ?? 100,
      list: (doc.pages?.list ?? []).map((id) => id.toString()),
    };

    return ConversationEntity.reconstitute({
      id: (doc._id as any).toString(),
      type: doc.type as any,
      name: doc.name,
      description: doc.description,
      avatar: doc.avatar,
      createdBy: doc.createdBy?.toString(),
      participants,
      settings,
      pages,
      createdAt: (doc as any).createdAt,
      updatedAt: (doc as any).updatedAt,
    });
  }

  static toPersistence(entity: ConversationEntity): Record<string, any> {
    return {
      type: entity.type,
      name: entity.name,
      description: entity.description,
      avatar: entity.avatar,
      createdBy: entity.createdBy,
      participants: entity.participants.map((p) => ({
        userId: p.userId,
        role: p.role,
        joinedAt: p.joinedAt,
        leftAt: p.leftAt,
        isActive: p.isActive,
      })),
      settings: {
        isPrivate: entity.settings.isPrivate,
        allowInvites: entity.settings.allowInvites,
        mutedBy: entity.settings.mutedBy,
        pinnedBy: entity.settings.pinnedBy,
      },
      pages: {
        page: entity.pages.page,
        limit: entity.pages.limit,
        list: entity.pages.list,
      },
    };
  }
}
