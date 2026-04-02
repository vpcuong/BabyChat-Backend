import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class UserDocument extends Document {
  @Prop({ required: true })
  declare username: string;

  @Prop({ required: true, unique: true })
  declare email: string;

  @Prop({ required: true })
  declare password: string;

  @Prop({ required: false })
  declare displayName?: string;

  @Prop({ required: false })
  declare dateOfBirth?: Date;

  @Prop({ default: Date.now })
  declare createdAt: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }], default: [] })
  declare listChats: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }], default: [] })
  declare listGroups: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
