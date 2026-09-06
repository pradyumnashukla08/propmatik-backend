import { Types } from "mongoose";

export interface IConversation {
  interactionId: Types.ObjectId;

  propertyId: Types.ObjectId;

  participants: Types.ObjectId[];

  createdAt?: Date;

  updatedAt?: Date;
}