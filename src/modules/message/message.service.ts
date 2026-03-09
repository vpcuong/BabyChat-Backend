import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/CreateMessageDto';

@Injectable()
export class MessageService {
  async sendMessage(senderId: string, createMessageDto: CreateMessageDto) {
    // Stub — message sending is handled by SendMessageUseCase in conversations module
    console.log(senderId, createMessageDto);
    return 'message';
  }
}
