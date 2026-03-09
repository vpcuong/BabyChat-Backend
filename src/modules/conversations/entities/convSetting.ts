import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

@Schema()
export class ConvSetting {
  @Prop({ required: true })
  isPrivate: boolean
  @Prop({ required: true })
  allowInvites: boolean
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }], default: [] })
  mutedBy: mongoose.Types.ObjectId[] // users who muted this conversation

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }], default: [] })
  pinnedBy: mongoose.Types.ObjectId[] // users who pinned this conversation
};

export const ConvSettingSchema = SchemaFactory.createForClass(ConvSetting);