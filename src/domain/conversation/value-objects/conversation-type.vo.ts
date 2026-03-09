/**
 * ConversationType Value Object
 * - Encapsulates valid conversation types
 * - Prevents invalid types from entering the domain
 */

export type ConversationTypeValue = 'direct' | 'group' | 'channel';

const VALID_TYPES: ConversationTypeValue[] = ['direct', 'group', 'channel'];

export class ConversationType {
  private readonly value: ConversationTypeValue;

  private constructor(value: ConversationTypeValue) {
    this.value = value;
  }

  static create(raw: string): ConversationType {
    if (!VALID_TYPES.includes(raw as ConversationTypeValue)) {
      throw new Error(
        `Invalid conversation type '${raw}'. Must be one of: ${VALID_TYPES.join(', ')}`,
      );
    }
    return new ConversationType(raw as ConversationTypeValue);
  }

  static direct(): ConversationType {
    return new ConversationType('direct');
  }

  static group(): ConversationType {
    return new ConversationType('group');
  }

  static channel(): ConversationType {
    return new ConversationType('channel');
  }

  isDirect(): boolean {
    return this.value === 'direct';
  }

  isGroup(): boolean {
    return this.value === 'group';
  }

  isChannel(): boolean {
    return this.value === 'channel';
  }

  equals(other: ConversationType): boolean {
    return this.value === other.value;
  }

  toString(): ConversationTypeValue {
    return this.value;
  }
}
