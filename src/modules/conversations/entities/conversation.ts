import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";
import { Participant } from "src/modules/participants/entities/participant";
import { ConvSetting } from "./convSetting";
@Schema({ _id: false })
class PageInfo {
  @Prop({ required: true })
  page: number
  @Prop({ required: true })
  limit: number
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pages' }], default: [] })
  list: mongoose.Types.ObjectId[]
}
@Schema({ timestamps: true })
export class Conversation {
  @Prop({ required: true, enum: ['direct', 'group', 'channel'] })
  type: string; // "direct", "group", "channel"

  @Prop({ required: false })
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  createdBy: mongoose.Types.ObjectId;
  @Prop({ required: true})
  pages: PageInfo
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.path('participants').validate(function(value: Participant[]) {
  return value && value.length > 0;
}, 'participants array must contain at least one element');