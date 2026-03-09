import { IsOptional, IsDate, IsDefined, IsIn } from "class-validator";
import { Transform, Type } from "class-transformer";
import mongoose from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";
// Define the Participant subdocument schema
@Schema()
export class Participant {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: mongoose.Types.ObjectId;

  @IsDefined() // <-- Make role required
  @IsIn(['admin', 'member', 'moderator'])
  role: string; // "admin", "member", "moderator"

  @Transform(({ value }) => value ?? new Date())
  @Type(() => Date)
  @IsDate()
  joinedAt?: Date = new Date(); 

  @IsOptional()
  @IsDate()
  leftAt?: Date;
  
  @Prop({ default: false })
  isActive?: boolean;
}
