import { Types } from "mongoose";

export interface IMessage {
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId;

  message: string;

  isRead?: boolean;
  readAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}