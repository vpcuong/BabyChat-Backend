import { Injectable } from '@nestjs/common';
import { Conversation } from './entities/conversation';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateConvDto } from './dto/CreateConvDto';
@Injectable()
export class ConversationsService {

  constructor(@InjectModel(Conversation.name) private convModel: Model<Conversation>) {}

  getAllConversations() {
    return this.convModel.find();
  }

  async getConversationById(id: string) { 
    return await this.convModel.findOne({_id: id});
  }

  async create(createConvDto: CreateConvDto) {
    return await this.convModel.create(createConvDto);
  }
}
