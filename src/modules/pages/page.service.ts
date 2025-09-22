import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './entities/page';
import { CreatePageDto } from './dto/CreatePageDto';
import mongoose from 'mongoose';
@Injectable()
export class PageService {

  constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {

  }

  async getPagesByConvId(convId: string) {
    return await this.pageModel.find({ convId: convId })
  }

  async getPageById(id: string) {
    return await this.pageModel.findOne({ _id: id })
  }

  async createNextPage(convId: string) {
    const pages = await this.pageModel.find({ convId: convId });
    // 
    const newPage = new CreatePageDto();
    newPage.conversationId = new mongoose.Types.ObjectId(convId);
    newPage.pageNumber = pages.length + 1;
    newPage.createdAt = new Date();
    return await this.pageModel.create(newPage);
  }

}
