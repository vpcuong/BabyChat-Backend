import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageDocument, PageSchema } from 'src/infrastructure/persistence/schemas/page.schema';
import { PageRepository } from 'src/infrastructure/persistence/repositories/page.repository';
import { IPageRepository } from 'src/domain/message/repositories/i-page.repository';
import { PageController } from './page.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PageDocument.name, schema: PageSchema }]),
  ],
  controllers: [PageController],
  providers: [
    { provide: IPageRepository, useClass: PageRepository },
  ],
  exports: [IPageRepository],
})
export class PageModule {}
