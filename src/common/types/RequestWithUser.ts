import mongoose from "mongoose";
export interface RequestWithUser extends Request {
  user: {
    userId: mongoose.Types.ObjectId;
    email: string;
    roles: string[]
  };
}