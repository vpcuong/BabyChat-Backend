import { Injectable } from '@nestjs/common';
import { Conversation } from './entities/conversation';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateConvDto } from './dto/CreateConvDto';
@Injectable()
export class ConversationsService {

  constructor(@InjectModel(Conversation.name) private convModel: Model<Conversation>) {}

  async create(createConvDto: CreateConvDto) {
    return await this.convModel.create(createConvDto);
  }
}
