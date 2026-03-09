export interface CreateMessageProps {
  senderId: string;
  content: string;
  replyId?: string;
}

export class MessageEntity {
  readonly id?: string;
  readonly senderId: string;
  readonly content: string;
  readonly replyId?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: {
    id?: string;
    senderId: string;
    content: string;
    replyId?: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.senderId = props.senderId;
    this.content = props.content;
    this.replyId = props.replyId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: CreateMessageProps): MessageEntity {
    if (!props.content || props.content.trim().length === 0) {
      throw new Error('Message content cannot be empty');
    }
    if (!props.senderId) {
      throw new Error('Sender ID is required');
    }

    const now = new Date();
    return new MessageEntity({
      id: undefined, // assigned by persistence layer
      senderId: props.senderId,
      content: props.content.trim(),
      replyId: props.replyId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: {
    id: string;
    senderId: string;
    content: string;
    replyId?: string;
    createdAt: Date;
    updatedAt: Date;
  }): MessageEntity {
    return new MessageEntity(props);
  }
}
