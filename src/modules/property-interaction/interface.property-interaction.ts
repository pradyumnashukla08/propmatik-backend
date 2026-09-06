import mongoose, { Types } from "mongoose";

export interface IPropertyInteraction {
propertyId: Types.ObjectId;

  requestedBy: Types.ObjectId;

  propertyOwnerId: Types.ObjectId;

  type: "Chat" | "VideoCall" | "SiteVisit";
  

  status:
    | "PaymentPending"
    | "Confirmed"
    | "Completed"
    | "Cancelled"
    | "Rejected"
    | "Expired";

  paymentId?: Types.ObjectId;

  // Chat
  conversationId?: Types.ObjectId;

  // Video Call
  scheduledAt?: Date;
  duration?: number;
  meetingLink?: string;
  meetingSpaceId?: string;

  // Site Visit
  location?: {
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };

  locationCoordinates?: {
    latitude?: number;
    longitude?: number;
  };

  note?: string;

  cancelledBy?: Types.ObjectId;

  cancelledAt?: Date;

  cancellationReason?: string;

  createdAt?: Date;

  updatedAt?: Date;
}