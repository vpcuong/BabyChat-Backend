export type ParticipantRole = 'admin' | 'member' | 'moderator';

export interface CreateParticipantProps {
  userId: string;
  role: ParticipantRole;
}

export class ParticipantEntity {
  readonly userId: string;
  readonly role: ParticipantRole;
  readonly joinedAt: Date;
  readonly leftAt?: Date;
  readonly isActive: boolean;

  private constructor(props: {
    userId: string;
    role: ParticipantRole;
    joinedAt: Date;
    leftAt?: Date;
    isActive: boolean;
  }) {
    this.userId = props.userId;
    this.role = props.role;
    this.joinedAt = props.joinedAt;
    this.leftAt = props.leftAt;
    this.isActive = props.isActive;
  }

  static create(props: CreateParticipantProps): ParticipantEntity {
    const validRoles: ParticipantRole[] = ['admin', 'member', 'moderator'];
    if (!validRoles.includes(props.role)) {
      throw new Error(`Invalid role: ${props.role}. Must be one of ${validRoles.join(', ')}`);
    }
    return new ParticipantEntity({
      userId: props.userId,
      role: props.role,
      joinedAt: new Date(),
      isActive: true,
    });
  }

  static reconstitute(props: {
    userId: string;
    role: ParticipantRole;
    joinedAt: Date;
    leftAt?: Date;
    isActive: boolean;
  }): ParticipantEntity {
    return new ParticipantEntity(props);
  }
}
