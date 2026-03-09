import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { IPageRepository } from 'src/domain/message/repositories/i-page.repository';
import { PageEntity } from 'src/domain/message/entities/page.entity';
import { MessageEntity } from 'src/domain/message/entities/message.entity';
import { PageDocument } from '../schemas/page.schema';
import { PageMapper } from '../mappers/page.mapper';

@Injectable()
export class PageRepository implements IPageRepository {
  constructor(@InjectModel(PageDocument.name) private readonly pageModel: Model<PageDocument>) {}

  async findById(id: string): Promise<PageEntity | null> {
    const doc = await this.pageModel.findById(id);
    return doc ? PageMapper.toDomain(doc) : null;
  }

  async findByConversationId(conversationId: string): Promise<PageEntity[]> {
    const docs = await this.pageModel.find({
      conversationId: new mongoose.Types.ObjectId(conversationId),
    });
    return docs.map((doc) => PageMapper.toDomain(doc));
  }

  async findByConversationIdAndPageNumber(
    conversationId: string,
    pageNumber: number,
  ): Promise<PageEntity | null> {
    const doc = await this.pageModel.findOne({
      conversationId: new mongoose.Types.ObjectId(conversationId),
      pageNumber,
    });
    return doc ? PageMapper.toDomain(doc) : null;
  }

  async save(entity: PageEntity): Promise<PageEntity> {
    const data = PageMapper.toPersistence(entity);
    const created = await this.pageModel.create(data);
    return PageMapper.toDomain(created);
  }

  async addMessage(pageId: string, message: MessageEntity): Promise<PageEntity> {
    const updated = await this.pageModel.findByIdAndUpdate(
      pageId,
      {
        $push: {
          messages: {
            senderId: new mongoose.Types.ObjectId(message.senderId),
            content: message.content,
            replyId: message.replyId ? new mongoose.Types.ObjectId(message.replyId) : null,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
          },
        },
        $inc: { messageCount: 1 },
      },
      { new: true },
    );
    if (!updated) throw new Error(`Page ${pageId} not found`);
    return PageMapper.toDomain(updated);
  }

  async getMessagesByPageNumber(
    conversationId: string,
    pageNumber: number,
  ): Promise<MessageEntity[]> {
    const page = await this.findByConversationIdAndPageNumber(conversationId, pageNumber);
    return page ? [...page.messages] : [];
  }
}
