import { model, Schema } from "mongoose";
import { INotification } from "./interface.notifiaction";

const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["PROPERTY", "WISHLIST", "MESSAGE", "SYSTEM", "PROJECT"],
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    entityId: {
      type: Schema.Types.ObjectId,
    },

    entityType: {
      type: String,
      enum: ["Plot", "Apartment", "Project", "User"],
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({
  userId: 1,
  isRead: 1,
  createdAt: -1,
});

export const NotificationModel = model<INotification>("Notification",notificationSchema);