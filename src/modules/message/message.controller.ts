import { Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/CreateMessageDto';
import { type RequestWithUser } from 'src/common/types/RequestWithUser';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {

  }

  @Get()
  getMessages() {
    return "message"
  }

  @Post()
  sendMessage(@Request() request: RequestWithUser, @Body() createMessageDto: CreateMessageDto) {
    const sender = request.user;
    return this.messageService.sendMessage(sender.userId, createMessageDto);
  }
}
