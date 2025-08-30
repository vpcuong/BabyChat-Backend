import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { ObjectId } from "mongoose";

@Schema()
export class ConvSetting {
  @Prop({ required: true })
  isPrivate: Boolean
  @Prop({ required: true })
  allowInvites: Boolean
  @Prop({ required: false })   // can members invite others?
  mutedBy: [ObjectId] // users who muted this conversation
  @Prop({ required: false })
  pinnedBy: [ObjectId] // users who pinned this conversation
};

export const ConvSettingSchema = SchemaFactory.createForClass(ConvSetting);