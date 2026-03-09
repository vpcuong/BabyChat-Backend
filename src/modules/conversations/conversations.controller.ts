import { Body, Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { RequestWithUser } from 'src/common/types/RequestWithUser';
import { CreateConversationUseCase } from 'src/application/conversation/use-cases/create-conversation.usecase';
import { SendMessageUseCase } from 'src/application/conversation/use-cases/send-message.usecase';
import {
  GetConversationsByUserUseCase,
  GetConversationByIdUseCase,
  GetMessagesByPageUseCase,
  GetPageListUseCase,
} from 'src/application/conversation/use-cases/get-conversation.usecase';
import { CreateConvDto } from './dto/CreateConvDto';
import { CreateMessageDto } from '../message/dto/CreateMessageDto';

@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(
    private readonly createConversationUseCase: CreateConversationUseCase,
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly getConversationsByUserUseCase: GetConversationsByUserUseCase,
    private readonly getConversationByIdUseCase: GetConversationByIdUseCase,
    private readonly getMessagesByPageUseCase: GetMessagesByPageUseCase,
    private readonly getPageListUseCase: GetPageListUseCase,
  ) {}

  @Get()
  getAllConversations(@Request() request: RequestWithUser) {
    return this.getConversationsByUserUseCase.execute(request.user.userId);
  }

  @Get('/mine')
  getMine(@Request() request: RequestWithUser) {
    return this.getConversationsByUserUseCase.execute(request.user.userId);
  }

  @Get(':id')
  getConversationById(@Param('id') id: string) {
    return this.getConversationByIdUseCase.execute(id);
  }

  @Post()
  createConversation(@Body() dto: CreateConvDto, @Request() request: RequestWithUser) {
    return this.createConversationUseCase.execute({
      type: dto.type as any,
      createdByUserId: request.user.userId,
      participantUserIds: dto.participants.map((p) => p.userId.toString()),
      name: dto.name,
      description: dto.description,
      avatar: dto.avatar,
    });
  }

  @Post('/messages')
  sendMessage(@Request() request: RequestWithUser, @Body() dto: CreateMessageDto) {
    return this.sendMessageUseCase.execute({
      conversationId: dto.conversationId.toString(),
      senderId: request.user.userId,
      content: dto.content,
      replyId: dto.replyId?.toString(),
    });
  }

  @Get('/messages/:conversationId/:pageNum')
  getMessages(
    @Param('conversationId') conversationId: string,
    @Param('pageNum') pageNum: string,
  ) {
    return this.getMessagesByPageUseCase.execute(conversationId, Number(pageNum));
  }

  @Get(':id/pages')
  getPages(@Param('id') conversationId: string) {
    return this.getPageListUseCase.execute(conversationId);
  }
}
