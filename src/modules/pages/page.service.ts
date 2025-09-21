import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './entities/page';
@Injectable()
export class PageService {

  constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {

  }

  async getPagesByConvId(convId: string) {
    return await this.pageModel.find({ convId: convId })
  }

}
