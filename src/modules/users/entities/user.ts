import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Conversation } from 'src/modules/conversations/entities/conversation';
import { Document } from 'mongoose';

//export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false})
  displayName: string

  @Prop({ required: false})
  dateOfBirth: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  listChats: Conversation[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  listGroups: Conversation[];
}

export const UserSchema = SchemaFactory.createForClass(User);