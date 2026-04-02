import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ _id: false })
class ParticipantSubdoc {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  declare userId: mongoose.Types.ObjectId;

  @Prop({ required: true, enum: ['admin', 'member', 'moderator'] })
  declare role: string;

  @Prop({ default: Date.now })
  declare joinedAt: Date;

  @Prop()
  declare leftAt?: Date;

  @Prop({ default: false })
  declare isActive: boolean;
}

@Schema({ _id: false })
class ConvSettingSubdoc {
  @Prop({ default: false })
  declare isPrivate: boolean;

  @Prop({ default: true })
  declare allowInvites: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] })
  declare mutedBy: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] })
  declare pinnedBy: mongoose.Types.ObjectId[];
}

@Schema({ _id: false })
class PageInfoSubdoc {
  @Prop({ default: 0 })
  declare page: number;

  @Prop({ default: 100 })
  declare limit: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }], default: [] })
  declare list: mongoose.Types.ObjectId[];
}

@Schema({ timestamps: true })
export class ConversationDocument extends Document {
  @Prop({ required: true, enum: ['direct', 'group', 'channel'] })
  declare type: string;

  @Prop({ required: false })
  declare name?: string;

  @Prop({ required: false })
  declare description?: string;

  @Prop({ required: false })
  declare avatar?: string;

  @Prop({ type: [ParticipantSubdoc], required: true, default: [] })
  declare participants: ParticipantSubdoc[];

  @Prop({ type: ConvSettingSubdoc, required: false })
  declare settings?: ConvSettingSubdoc;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  declare createdBy: mongoose.Types.ObjectId;

  @Prop({ type: PageInfoSubdoc, required: true })
  declare pages: PageInfoSubdoc;
}

export const ConversationSchema = SchemaFactory.createForClass(ConversationDocument);

ConversationSchema.path('participants').validate(
  (value: ParticipantSubdoc[]) => value && value.length > 0,
  'participants array must contain at least one element',
);
