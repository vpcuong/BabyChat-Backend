import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from 'src/modules/user/domain/i-user.repository';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { UserDocument } from './user.schema';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(UserDocument.name) private readonly userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findById(id).lean();
    return doc ? UserMapper.toDomain(doc as UserDocument) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ email: email.toLowerCase() }).lean();
    return doc ? UserMapper.toDomain(doc as UserDocument) : null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.userModel.countDocuments({ email: email.toLowerCase() });
    return count > 0;
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    const data = UserMapper.toPersistence(entity);
    const created = await this.userModel.create(data);
    return UserMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }

  async findAll(): Promise<UserEntity[]> {
    const docs = await this.userModel.find().lean();
    return docs.map((doc) => UserMapper.toDomain(doc as UserDocument));
  }
}
