import { ConversationsService } from './conversations.service';
import { Body, Controller, Get, Post} from '@nestjs/common';
import { CreateConvDto } from './dto/CreateConvDto';
@Controller('conversations')
export class ConversationsController {

  constructor(private convService: ConversationsService){
  
  }

  @Post()
  create(@Body() createConvDto: CreateConvDto){
    console.log(createConvDto);
    console.log(createConvDto.participants);
    return this.convService.create(createConvDto);
  }
}
