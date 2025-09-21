import { Injectable } from '@nestjs/common';
import { Conversation } from './entities/conversation';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateConvDto } from './dto/CreateConvDto';
import { UsersService } from '../users/users.service';
@Injectable()
export class ConversationsService {

  constructor(@InjectModel(Conversation.name) private convModel: Model<Conversation>,
    private userService: UsersService) {

  }

  getAllConversations(userId: string) {
    return this.convModel.find({participants: {$elemMatch: {userId: userId}}});
  }

  async getConversationById(id: string) { 
    return await this.convModel.findOne({_id: id});
  }

  async create(userId: string, createConvDto: CreateConvDto) {
    // validate and add new properties for participants
    for (const par of createConvDto.participants) {
      // validate participants
      const user = await this.userService.getUserById(par.userId);
      if (!user) {
        throw new Error(`userId: ${par.userId} not exists`);
      }
      // add new properties
      par.role = 'member';
      par.joinedAt = new Date();
    }

    createConvDto.createdBy = userId;
    createConvDto.participants.push({userId: userId, role: 'admin', joinedAt: new Date()});

    return await this.convModel.create(createConvDto);
  }

  async getMine(userId: string) {
    return await this.convModel.find({participants: {$elemMatch: {userId: userId}}});
  }
}
