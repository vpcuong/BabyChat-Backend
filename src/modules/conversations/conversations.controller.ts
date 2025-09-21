import { ConversationsService } from './conversations.service';
import { Body, Controller, Get, Post, Param, UseGuards, Req, Request } from '@nestjs/common';
import { CreateConvDto } from './dto/CreateConvDto';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import type { RequestWithUser } from 'src/common/types/RequestWithUser';
import { MessageService } from '../message/message.service';
import { PageService } from '../pages/page.service';
import { type CreateMessageDto } from '../message/dto/CreateMessageDto';
@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationsController {

  constructor(private convService: ConversationsService, private messageService: MessageService){
  
  }

  @Get()
  async getAllConversations(@Request() request: RequestWithUser){
    const userId = request.user.userId;
    return await this.convService.getAllConversations(userId);
  }

  @Get('/mine')
  getMine(@Req() request: RequestWithUser){
    const userId = request.user.userId;
    return this.convService.getMine(userId);
  }

  @Get(':id')
  async getConversationById(@Param('id') id: string){
    const conversation = await this.convService.getConversationById(id);
    return conversation;
  }

  @Post()
  create(@Body() createConvDto: CreateConvDto, @Req() request: RequestWithUser){
    const createdBy = request.user;
    return this.convService.create(createdBy.userId, createConvDto);
  }

  @Post('/messages')
  sendMessage(@Request() request: RequestWithUser, @Body() createMessageDto: CreateMessageDto){
    const sender = request.user;
    return this.convService.sendMessage(sender.userId, createMessageDto);
  }
}
