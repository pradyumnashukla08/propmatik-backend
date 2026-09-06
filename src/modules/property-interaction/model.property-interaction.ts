import { model, Schema } from "mongoose";

import { IPropertyInteraction } from "./interface.property-interaction";

const propertyInteractionSchema =
  new Schema<IPropertyInteraction>(
    {
      propertyId: {
        type: Schema.Types.ObjectId,
        ref: "Property",
        required: true,
      },

      requestedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      propertyOwnerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      type: {
        type: String,
        enum: ["Chat", "VideoCall", "SiteVisit"],
        required: true,
      },

      status: {
        type: String,
        enum: [
          "PaymentPending",
          "Confirmed",
          "Completed",
          "Cancelled",
          "Rejected",
          "Expired",
        ],
        default: "PaymentPending",
      },

      paymentId: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
      },

      // Chat
      conversationId: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
      },

      // Video Call
      scheduledAt: {
        type: Date,
      },

      duration: {
        type: Number,
      },

      meetingLink: {
        type: String,
      },

      meetingSpaceId: {
        type: String,
      },

      // Site Visit
      location: {
        address: String,
        city: String,
        state: String,
        pincode: String,
      },

      locationCoordinates: {
        latitude: Number,
        longitude: Number,
      },

      note: {
        type: String,
        maxlength: 500,
        trim: true,
      },

      cancelledBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      cancelledAt: {
        type: Date,
      },

      cancellationReason: {
        type: String,
        maxlength: 500,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const PropertyInteractionModel =
  model<IPropertyInteraction>(
    "PropertyInteraction",
    propertyInteractionSchema
  );