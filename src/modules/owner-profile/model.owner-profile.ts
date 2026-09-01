import { model, Schema } from "mongoose";
import { ISellerProfile } from "./interface.owner-profile";

const sellerProfileSchema = new Schema<ISellerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    sellerType: {
      type: String,
      enum: ["Individual", "Company"],
      default: "Individual",
    },

    occupation: {
      type: String,
      trim: true,
    },

    address: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
    },

    totalPropertiesListed: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalPropertiesSold: {
      type: Number,
      default: 0,
      min: 0,
    },

    about: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

export const SellerProfileModel = model<ISellerProfile>("SellerProfile",sellerProfileSchema);