import mongoose from "mongoose";
export class Message {
  id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  replyId: mongoose.Types.ObjectId | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}