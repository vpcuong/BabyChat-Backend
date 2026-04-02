import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/interfaces/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pages')
export class PageController {}
