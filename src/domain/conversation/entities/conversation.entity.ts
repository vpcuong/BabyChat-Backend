import { ParticipantEntity, ParticipantRole } from './participant.entity';

export type ConversationType = 'direct' | 'group' | 'channel';

export interface ConversationSettings {
  isPrivate: boolean;
  allowInvites: boolean;
  mutedBy: string[];
  pinnedBy: string[];
}

export interface PageRef {
  page: number;
  limit: number;
  list: string[]; // page document IDs
}

export interface CreateConversationProps {
  type: ConversationType;
  createdByUserId: string;
  participantUserIds: string[];
  name?: string;
  description?: string;
  avatar?: string;
  settings?: Partial<ConversationSettings>;
}

export class ConversationEntity {
  readonly id?: string;
  readonly type: ConversationType;
  readonly name?: string;
  readonly description?: string;
  readonly avatar?: string;
  readonly createdBy: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  private _participants: ParticipantEntity[];
  private _settings: ConversationSettings;
  private _pages: PageRef;

  private constructor(props: {
    id?: string;
    type: ConversationType;
    name?: string;
    description?: string;
    avatar?: string;
    createdBy: string;
    participants: ParticipantEntity[];
    settings: ConversationSettings;
    pages: PageRef;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.type = props.type;
    this.name = props.name;
    this.description = props.description;
    this.avatar = props.avatar;
    this.createdBy = props.createdBy;
    this._participants = props.participants;
    this._settings = props.settings;
    this._pages = props.pages;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  get participants(): ReadonlyArray<ParticipantEntity> {
    return this._participants;
  }

  get settings(): Readonly<ConversationSettings> {
    return this._settings;
  }

  get pages(): Readonly<PageRef> {
    return this._pages;
  }

  static create(props: CreateConversationProps): ConversationEntity {
    const validTypes: ConversationType[] = ['direct', 'group', 'channel'];
    if (!validTypes.includes(props.type)) {
      throw new Error(`Invalid conversation type: ${props.type}`);
    }

    if (props.type !== 'direct' && !props.name) {
      throw new Error('Name is required for group and channel conversations');
    }

    // Creator is always admin
    const participants: ParticipantEntity[] = [
      ParticipantEntity.create({ userId: props.createdByUserId, role: 'admin' }),
      ...props.participantUserIds.map((uid) =>
        ParticipantEntity.create({ userId: uid, role: 'member' }),
      ),
    ];

    return new ConversationEntity({
      type: props.type,
      name: props.name,
      description: props.description,
      avatar: props.avatar,
      createdBy: props.createdByUserId,
      participants,
      settings: {
        isPrivate: props.settings?.isPrivate ?? false,
        allowInvites: props.settings?.allowInvites ?? true,
        mutedBy: props.settings?.mutedBy ?? [],
        pinnedBy: props.settings?.pinnedBy ?? [],
      },
      pages: { page: 0, limit: 100, list: [] },
    });
  }

  static reconstitute(props: {
    id: string;
    type: ConversationType;
    name?: string;
    description?: string;
    avatar?: string;
    createdBy: string;
    participants: ParticipantEntity[];
    settings: ConversationSettings;
    pages: PageRef;
    createdAt?: Date;
    updatedAt?: Date;
  }): ConversationEntity {
    return new ConversationEntity(props);
  }

  isParticipant(userId: string): boolean {
    return this._participants.some((p) => p.userId === userId);
  }

  getParticipantRole(userId: string): ParticipantRole | null {
    return this._participants.find((p) => p.userId === userId)?.role ?? null;
  }

  addPageRef(pageId: string, pageNumber: number): void {
    this._pages = {
      ...this._pages,
      page: pageNumber,
      list: [...this._pages.list, pageId],
    };
  }
}
