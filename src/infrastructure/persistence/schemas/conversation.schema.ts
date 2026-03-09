import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ _id: false })
class ParticipantSubdoc {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true, enum: ['admin', 'member', 'moderator'] })
  role: string;

  @Prop({ default: Date.now })
  joinedAt: Date;

  @Prop()
  leftAt?: Date;

  @Prop({ default: false })
  isActive: boolean;
}

@Schema({ _id: false })
class ConvSettingSubdoc {
  @Prop({ default: false })
  isPrivate: boolean;

  @Prop({ default: true })
  allowInvites: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] })
  mutedBy: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] })
  pinnedBy: mongoose.Types.ObjectId[];
}

@Schema({ _id: false })
class PageInfoSubdoc {
  @Prop({ default: 0 })
  page: number;

  @Prop({ default: 100 })
  limit: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }], default: [] })
  list: mongoose.Types.ObjectId[];
}

@Schema({ timestamps: true })
export class ConversationDocument extends Document {
  @Prop({ required: true, enum: ['direct', 'group', 'channel'] })
  type: string;

  @Prop({ required: false })
  name?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  avatar?: string;

  @Prop({ type: [ParticipantSubdoc], required: true, default: [] })
  participants: ParticipantSubdoc[];

  @Prop({ type: ConvSettingSubdoc, required: false })
  settings?: ConvSettingSubdoc;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Types.ObjectId;

  @Prop({ type: PageInfoSubdoc, required: true })
  pages: PageInfoSubdoc;
}

export const ConversationSchema = SchemaFactory.createForClass(ConversationDocument);

ConversationSchema.path('participants').validate(
  (value: ParticipantSubdoc[]) => value && value.length > 0,
  'participants array must contain at least one element',
);
