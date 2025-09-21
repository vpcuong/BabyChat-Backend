import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";
import { Participant } from "src/modules/participants/entities/participant";
import { User } from "src/modules/users/entities/user";
import { ConvSetting } from "./convSetting";

@Schema()
export class Conversation {
  @Prop({ required: true })
  type: string; // "direct", "group", "channel"

  @Prop({ required: false})
  name: string // null for direct messages, required for groups

  @Prop({ required: false })
  description: string; // optional, for groups/channels

  @Prop({ required: false })
  avatar: string; // group/channel avatar URL
  
  // Participants with roles and status
  @Prop({ required: true})
  participants: Participant[];
  
  // Conversation settings
  @Prop({ required: false})
  settings: ConvSetting;

  // Metadata
  @Prop({required: false, default: Date.now})
  createdAt: Date;
  @Prop({required: false, default: Date.now})
  updatedAt: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  createdBy: User;

  pages: {
    page: number,
    limit: number,
    list: mongoose.Schema.Types.ObjectId[]
  }
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.path('participants').validate(function(value: Participant[]) {
  return value && value.length > 0;
}, 'participants array must contain at least one element');