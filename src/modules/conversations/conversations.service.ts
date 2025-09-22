import { Injectable } from '@nestjs/common';
import { Conversation } from './entities/conversation';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateConvDto } from './dto/CreateConvDto';
import { UsersService } from '../users/users.service';
import { PageService } from '../pages/page.service';
import { type CreateMessageDto } from '../message/dto/CreateMessageDto';
@Injectable()
export class ConversationsService {

  constructor(@InjectModel(Conversation.name) private convModel: Model<Conversation>,
    private userService: UsersService, private pageService: PageService) {

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
    createConvDto.pages = {
      page: 0,
      limit: 100,
      list: []
    }

    return await this.convModel.create(createConvDto);
  }

  async getMine(userId: string) {
    return await this.convModel.find({participants: {$elemMatch: {userId: userId}}});
  }

  async sendMessage(senderId: string, createMessageDto: CreateMessageDto) {
    const pages = await this.pageService.getPagesByConvId(createMessageDto.conversationId);
    if (pages.length === 0) {
      const newPage = await this.pageService.createNextPage(createMessageDto.conversationId);
      try {
        const updatedConversation = await this.convModel.findOneAndUpdate(
          { _id: createMessageDto.conversationId },
          {
            $push: { 'pages.list': newPage.id },
            $set: { 
              'pages.page': newPage.pageNumber,
              'isNew': false
            }
          },
          { new: true } // This option returns the updated document
        );
        
        if (!updatedConversation) {
          throw new Error(`conversationId: ${createMessageDto.conversationId} not exists`);
        }
        
        return updatedConversation;
      } catch (error) {
        throw new Error(`Failed to update conversation: ${error.message}`);
      }
    }
    return "message";
  }
}
