import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './entities/page';
import { CreatePageDto } from './dto/CreatePageDto';
import { type CreateMessageDto } from '../message/dto/CreateMessageDto';
import mongoose from 'mongoose';
@Injectable()
export class PageService {

  constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {

  }

  async getPagesByConvId(convId: mongoose.Types.ObjectId) {
    return await this.pageModel.find({ conversationId: convId })
  }

  async getPageById(id: mongoose.Types.ObjectId) {
    return await this.pageModel.findOne({ _id: id })
  }

  async createNextPage(convId: mongoose.Types.ObjectId) {
    const pages = await this.pageModel.find({ convId: convId });
    // 
    const newPage = new CreatePageDto();
    newPage.conversationId = new mongoose.Types.ObjectId(convId);
    newPage.pageNumber = pages.length + 1;
    newPage.createdAt = new Date();
    return await this.pageModel.create(newPage);
  }

  async addMessageToPage(pageId: mongoose.Types.ObjectId, senderId: mongoose.Types.ObjectId, 
    createMessageDto: CreateMessageDto) {
    const page = await this.pageModel.findOne({ _id: pageId });

    if(page === null) {
      throw new Error(`pageId: ${pageId} not exists`);
    }

    page.messages.push({ 
      id: new mongoose.Types.ObjectId(), 
      senderId: senderId, 
      content: createMessageDto.content, 
      replyId: createMessageDto.replyId ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    page.messageCount += 1;
    return this.pageModel.findOneAndUpdate({ _id: pageId }, page, { new: true });
  }

}
