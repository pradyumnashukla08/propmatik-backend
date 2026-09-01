import { model, Schema } from "mongoose";
import { IBuilderProfile } from "./interafce.builder-profile";

const builderProfileSchema = new Schema<IBuilderProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    rera: {
      reraId: {
        type: String,
        required: true,
        trim: true,
      },

      isVerified: {
        type: Boolean,
        default: false,
      },

      registeredName: String,

      registrationDate: Date,

      expiryDate: Date,

      state: String,
    },

    establishedYear: {
      type: Number,
    },

    totalProjects: {
      type: Number,
      default: 0,
    },

    completedProjects: {
      type: Number,
      default: 0,
    },

    ongoingProjects: {
      type: Number,
      default: 0,
    },

    officeAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
    },

    operatingLocations: [String],

    website: String,

    about: {
      type: String,
      maxlength: 1500,
    },
  },
  {
    timestamps: true,
  }
);

export const BuilderProfileModel = model<IBuilderProfile>("BuilderProfile", builderProfileSchema);