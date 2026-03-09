/**
 * ParticipantRole Value Object
 * - Encapsulates valid participant roles
 * - Provides role hierarchy checks
 */

export type ParticipantRoleValue = 'admin' | 'moderator' | 'member';

// Role hierarchy: admin > moderator > member
const ROLE_HIERARCHY: Record<ParticipantRoleValue, number> = {
  admin: 3,
  moderator: 2,
  member: 1,
};

export class ParticipantRole {
  private readonly value: ParticipantRoleValue;

  private constructor(value: ParticipantRoleValue) {
    this.value = value;
  }

  static create(raw: string): ParticipantRole {
    const validRoles = Object.keys(ROLE_HIERARCHY) as ParticipantRoleValue[];
    if (!validRoles.includes(raw as ParticipantRoleValue)) {
      throw new Error(
        `Invalid participant role '${raw}'. Must be one of: ${validRoles.join(', ')}`,
      );
    }
    return new ParticipantRole(raw as ParticipantRoleValue);
  }

  static admin(): ParticipantRole {
    return new ParticipantRole('admin');
  }

  static moderator(): ParticipantRole {
    return new ParticipantRole('moderator');
  }

  static member(): ParticipantRole {
    return new ParticipantRole('member');
  }

  isAdmin(): boolean {
    return this.value === 'admin';
  }

  isModerator(): boolean {
    return this.value === 'moderator';
  }

  isMember(): boolean {
    return this.value === 'member';
  }

  isAtLeastModerator(): boolean {
    return ROLE_HIERARCHY[this.value] >= ROLE_HIERARCHY['moderator'];
  }

  hasHigherPrivilegeThan(other: ParticipantRole): boolean {
    return ROLE_HIERARCHY[this.value] > ROLE_HIERARCHY[other.value];
  }

  equals(other: ParticipantRole): boolean {
    return this.value === other.value;
  }

  toString(): ParticipantRoleValue {
    return this.value;
  }
}
