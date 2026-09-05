import { Schema, model, Types, Document } from "mongoose";

export type NotificationType =
  | "PROPERTY"
  | "WISHLIST"
  | "MESSAGE"
  | "SYSTEM"
  | "PROJECT";

export interface INotification extends Document {
  userId: Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;

  isRead: boolean;

  entityId?: Types.ObjectId;
  entityType?: "Plot" | "Apartment" | "Project" | "User";

  createdAt: Date;
  updatedAt: Date;
}