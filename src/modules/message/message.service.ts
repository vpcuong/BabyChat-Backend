import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/CreateMessageDto';

@Injectable()
export class MessageService {
  async sendMessage(senderId: string, createMessageDto: CreateMessageDto){
    //FIXME: validate conversation, sender....
    console.log(senderId, createMessageDto)
    return "message";
  }
}
