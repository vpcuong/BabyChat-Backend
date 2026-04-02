import { Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { type RequestWithUser } from 'src/shared/types/request-with-user';
import { JwtAuthGuard } from 'src/modules/auth/interfaces/guards/jwt-auth.guard';

@ApiTags('messages')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {

  }

  @Get()
  getMessages() {
    return "message"
  }

  @ApiOperation({ summary: 'Gửi tin nhắn' })
  @Post()
  sendMessage(@Request() request: RequestWithUser, @Body() createMessageDto: CreateMessageDto) {
    const sender = request.user;
    return this.messageService.sendMessage(sender.userId, createMessageDto);
  }
}
