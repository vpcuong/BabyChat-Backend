/**
 * MessageContent Value Object
 * - Validates content is not empty
 * - Enforces max length
 */

const MAX_LENGTH = 4000;

export class MessageContent {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(raw: string): MessageContent {
    if (!raw || raw.trim().length === 0) {
      throw new Error('Message content cannot be empty');
    }
    if (raw.trim().length > MAX_LENGTH) {
      throw new Error(`Message content cannot exceed ${MAX_LENGTH} characters`);
    }
    return new MessageContent(raw.trim());
  }

  equals(other: MessageContent): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  get length(): number {
    return this.value.length;
  }
}
