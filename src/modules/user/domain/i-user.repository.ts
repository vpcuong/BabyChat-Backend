import { UserEntity } from './user.entity';

export abstract class IUserRepository {
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract existsByEmail(email: string): Promise<boolean>;
  abstract save(user: UserEntity): Promise<UserEntity>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<UserEntity[]>;
}

export const USER_REPOSITORY = IUserRepository;
