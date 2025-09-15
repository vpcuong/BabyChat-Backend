import { ConversationsService } from './conversations.service';
import { Body, Controller, Get, Post, Param} from '@nestjs/common';
import { CreateConvDto } from './dto/CreateConvDto';
import { Participant } from '../participants/entities/participant';
@Controller('conversations')
export class ConversationsController {

  constructor(private convService: ConversationsService){
  
  }

  @Get()
  async getAllConversations(){
    return await this.convService.getAllConversations();
  }

  @Get(':id')
  async getConversationById(@Param('id') id: string){
    const conversation = await this.convService.getConversationById(id);
    return conversation;
  }

  @Post()
  create(@Body() createConvDto: CreateConvDto){
    console.log(createConvDto);
    const par: Participant = {
      userId: createConvDto.participants[0].userId,
      role: 'admin',
      joinedAt: new Date()
    };
    console.log(par);
    return this.convService.create(createConvDto);
  }
}
