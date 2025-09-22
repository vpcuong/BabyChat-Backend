import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Message } from "../entities/message";
export class CreatePageDto {  
  @Prop({ required: true })
  conversationId: mongoose.Types.ObjectId;

  @Prop({ required: true, min: 1 })
  pageNumber: number;

  @Prop()
  messages: Message[];

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;
}