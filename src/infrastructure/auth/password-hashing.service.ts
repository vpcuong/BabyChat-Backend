import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const PASSWORD_HASHING_SERVICE = 'IPasswordHashingService';

export interface IPasswordHashingService {
  hash(plainPassword: string): Promise<string>;
  compare(plainPassword: string, hash: string): Promise<boolean>;
}

/**
 * PasswordHashingService — Infrastructure concern
 * Uses bcrypt to hash and compare passwords.
 * Domain layer never imports bcrypt directly.
 */
@Injectable()
export class PasswordHashingService implements IPasswordHashingService {
  private readonly SALT_ROUNDS = 10;

  async hash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, this.SALT_ROUNDS);
  }

  async compare(plainPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }
}
