import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ _id: true })
class MessageSubdoc {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  declare _id: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  declare senderId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null })
  declare replyId?: mongoose.Types.ObjectId;

  @Prop({ required: true })
  declare content: string;

  @Prop({ default: Date.now })
  declare createdAt: Date;

  @Prop({ default: Date.now })
  declare updatedAt: Date;
}

@Schema({ timestamps: true })
export class PageDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true })
  declare conversationId: mongoose.Types.ObjectId;

  @Prop({ required: true, min: 1 })
  declare pageNumber: number;

  @Prop({ default: 50, min: 1, max: 100 })
  declare pageSize: number;

  @Prop({ default: 0, min: 0 })
  declare messageCount: number;

  @Prop({ default: Date.now })
  declare startTime: Date;

  @Prop()
  declare endTime?: Date;

  @Prop({ type: [MessageSubdoc], default: [] })
  declare messages: MessageSubdoc[];
}

export const PageSchema = SchemaFactory.createForClass(PageDocument);
