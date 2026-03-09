/**
 * Email Value Object
 * - Immutable
 * - Equality by value
 * - Validates format on creation
 */
export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(raw: string): Email {
    if (!raw || raw.trim().length === 0) {
      throw new Error('Email cannot be empty');
    }

    const normalized = raw.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized)) {
      throw new Error(`'${raw}' is not a valid email address`);
    }

    return new Email(normalized);
  }

  static fromPersistence(value: string): Email {
    return new Email(value);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
