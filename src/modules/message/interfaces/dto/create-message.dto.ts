import { IsString, IsMongoId, IsOptional } from "class-validator";
import mongoose from "mongoose";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'Hello world!' })
  @IsString()
  content: string;

  @ApiProperty({ example: '64a1b2c3d4e5f6a7b8c9d0e1' })
  @IsMongoId()
  conversationId: mongoose.Types.ObjectId;

  @ApiPropertyOptional({ example: '64a1b2c3d4e5f6a7b8c9d0e2', nullable: true })
  @IsMongoId()
  @IsOptional()
  replyId: mongoose.Types.ObjectId | null;
}