import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";
@Schema()
export class Page {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true })
  conversationId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, min: 1 })
  pageNumber: number;

  @Prop({ default: 50, min: 1, max: 100 })
  pageSize: number;

  @Prop({ default: 0, min: 0 })
  messageCount: number;

  @Prop({ default: Date.now })
  startTime: Date;

  @Prop()
  endTime: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);
