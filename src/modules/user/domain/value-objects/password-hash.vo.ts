/**
 * PasswordHash Value Object
 * - Wraps an already-hashed password string
 * - Prevents raw passwords from leaking into domain
 * - Actual hashing happens in infrastructure (PasswordHashingService)
 */
export class PasswordHash {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static fromHash(hash: string): PasswordHash {
    if (!hash || hash.trim().length === 0) {
      throw new Error('Password hash cannot be empty');
    }
    return new PasswordHash(hash);
  }

  toString(): string {
    return this.value;
  }

  equals(other: PasswordHash): boolean {
    return this.value === other.value;
  }
}
