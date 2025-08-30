import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { Document } from 'mongoose';

//export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false})
  displayName: string

  @Prop({ required: false})
  dateOfBirth: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);