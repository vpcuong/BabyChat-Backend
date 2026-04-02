import { Body, Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/interfaces/guards/jwt-auth.guard';
import type { RequestWithUser } from 'src/shared/types/request-with-user';
import { CreateConversationUseCase } from 'src/modules/conversation/application/use-cases/create-conversation.usecase';
import { SendMessageUseCase } from 'src/modules/conversation/application/use-cases/send-message.usecase';
import {
  GetConversationsByUserUseCase,
  GetConversationByIdUseCase,
  GetMessagesByPageUseCase,
  GetPageListUseCase,
} from 'src/modules/conversation/application/use-cases/get-conversation.usecase';
import { CreateConvDto } from './dto/create-conv.dto';
import { CreateMessageDto } from 'src/modules/message/interfaces/dto/create-message.dto';

@ApiTags('conversations')
@ApiBearerAuth('access-token')
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

  @ApiOperation({ summary: 'Lấy danh sách hội thoại của user' })
  @Get()
  getAllConversations(@Request() request: RequestWithUser) {
    return this.getConversationsByUserUseCase.execute(request.user.userId);
  }

  @Get('/mine')
  getMine(@Request() request: RequestWithUser) {
    return this.getConversationsByUserUseCase.execute(request.user.userId);
  }

  @ApiOperation({ summary: 'Lấy hội thoại theo ID' })
  @Get(':id')
  getConversationById(@Param('id') id: string) {
    return this.getConversationByIdUseCase.execute(id);
  }

  @ApiOperation({ summary: 'Tạo hội thoại mới' })
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

  @ApiOperation({ summary: 'Gửi tin nhắn trong hội thoại' })
  @Post('/messages')
  sendMessage(@Request() request: RequestWithUser, @Body() dto: CreateMessageDto) {
    return this.sendMessageUseCase.execute({
      conversationId: dto.conversationId.toString(),
      senderId: request.user.userId,
      content: dto.content,
      replyId: dto.replyId?.toString(),
    });
  }

  @ApiOperation({ summary: 'Lấy tin nhắn theo trang' })
  @Get('/messages/:conversationId/:pageNum')
  getMessages(
    @Param('conversationId') conversationId: string,
    @Param('pageNum') pageNum: string,
  ) {
    return this.getMessagesByPageUseCase.execute(conversationId, Number(pageNum));
  }

  @ApiOperation({ summary: 'Lấy danh sách trang của hội thoại' })
  @Get(':id/pages')
  getPages(@Param('id') conversationId: string) {
    return this.getPageListUseCase.execute(conversationId);
  }
}
