import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId, Document } from "mongoose";
import { User } from "src/modules/users/entities/user";

// Define the Participant subdocument schema
@Schema({ _id: false })
export class Participant {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: User;

  @Prop({ required: true }) // <-- Make role required
  role: string; // "admin", "member", "moderator"

  @Prop({ required: true, default: Date.now})
  joinedAt: Date;

  @Prop({ required: true, default: null})
  leftAt: Date;

  @Prop({ default: true})
  isActive: boolean;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);