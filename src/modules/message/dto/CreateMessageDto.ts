import { IsString, IsMongoId } from "class-validator";
export class CreateMessageDto {
  @IsString()
  content: string;
  @IsMongoId()
  conversationId: string;
  @IsMongoId()
  replyId: string;
}