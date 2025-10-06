import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/CreateMessageDto';
import mongoose from 'mongoose';
@Injectable()
export class MessageService {
  async sendMessage(senderId: mongoose.Types.ObjectId, createMessageDto: CreateMessageDto){
    //FIXME: validate conversation, sender....
    console.log(senderId, createMessageDto)
    return "message";
  }
}
