import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ _id: true })
class MessageSubdoc {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  senderId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null })
  replyId?: mongoose.Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

@Schema({ timestamps: true })
export class PageDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true })
  conversationId: mongoose.Types.ObjectId;

  @Prop({ required: true, min: 1 })
  pageNumber: number;

  @Prop({ default: 50, min: 1, max: 100 })
  pageSize: number;

  @Prop({ default: 0, min: 0 })
  messageCount: number;

  @Prop({ default: Date.now })
  startTime: Date;

  @Prop()
  endTime?: Date;

  @Prop({ type: [MessageSubdoc], default: [] })
  messages: MessageSubdoc[];
}

export const PageSchema = SchemaFactory.createForClass(PageDocument);
