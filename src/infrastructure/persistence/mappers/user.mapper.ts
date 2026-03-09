import { UserEntity } from 'src/domain/user/entities/user.entity';
import { UserDocument } from '../schemas/user.schema';

export class UserMapper {
  static toDomain(doc: UserDocument): UserEntity {
    return UserEntity.reconstitute({
      id: (doc._id as any).toString(),
      username: doc.username,
      email: doc.email,
      password: doc.password,
      displayName: doc.displayName,
      dateOfBirth: doc.dateOfBirth,
      createdAt: doc.createdAt,
    });
  }

  static toPersistence(entity: UserEntity): Partial<UserDocument> {
    return {
      username: entity.username,
      email: entity.email,
      password: entity.password,
      displayName: entity.displayName,
      dateOfBirth: entity.dateOfBirth,
    };
  }
}
