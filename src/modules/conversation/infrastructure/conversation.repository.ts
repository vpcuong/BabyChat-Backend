import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { IConversationRepository } from 'src/modules/conversation/domain/i-conversation.repository';
import { ConversationEntity } from 'src/modules/conversation/domain/conversation.entity';
import { ConversationDocument } from './conversation.schema';
import { ConversationMapper } from './conversation.mapper';

@Injectable()
export class ConversationRepository implements IConversationRepository {
  constructor(
    @InjectModel(ConversationDocument.name)
    private readonly convModel: Model<ConversationDocument>,
  ) {}

  async findById(id: string): Promise<ConversationEntity | null> {
    const doc = await this.convModel.findById(id);
    return doc ? ConversationMapper.toDomain(doc) : null;
  }

  async findByUserId(userId: string): Promise<ConversationEntity[]> {
    const docs = await this.convModel.find({
      participants: { $elemMatch: { userId: new mongoose.Types.ObjectId(userId) } },
    });
    return docs.map((doc) => ConversationMapper.toDomain(doc));
  }

  async save(entity: ConversationEntity): Promise<ConversationEntity> {
    const data = ConversationMapper.toPersistence(entity);
    const created = await this.convModel.create(data);
    return ConversationMapper.toDomain(created);
  }

  async update(entity: ConversationEntity): Promise<ConversationEntity> {
    const data = ConversationMapper.toPersistence(entity);
    const updated = await this.convModel.findByIdAndUpdate(entity.id, data, { new: true });
    if (!updated) throw new Error(`Conversation ${entity.id} not found`);
    return ConversationMapper.toDomain(updated);
  }

  async addPageRef(conversationId: string, pageId: string, pageNumber: number): Promise<void> {
    await this.convModel.findByIdAndUpdate(conversationId, {
      $push: { 'pages.list': new mongoose.Types.ObjectId(pageId) },
      $set: { 'pages.page': pageNumber },
    });
  }
}
