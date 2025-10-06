import { IsString, IsMongoId } from "class-validator";
import mongoose from "mongoose";
export class CreateMessageDto {
  @IsString()
  content: string;
  @IsMongoId()
  conversationId: mongoose.Types.ObjectId;
  @IsMongoId()
  replyId: mongoose.Types.ObjectId | null;
}