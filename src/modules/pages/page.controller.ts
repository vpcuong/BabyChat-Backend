import { Body, Controller, Get, Post, Param, UseGuards, Req, Request } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import type { RequestWithUser } from 'src/common/types/RequestWithUser';
import { PageService } from './page.service';
@UseGuards(JwtAuthGuard)
@Controller('pages')
export class PageController {

  constructor(private pageService: PageService) {
    
  }

}
