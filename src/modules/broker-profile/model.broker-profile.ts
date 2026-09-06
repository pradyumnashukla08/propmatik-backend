import { model, Schema } from "mongoose";
import { IBrokerProfile } from "./interface.broker-profile";

const brokerProfileSchema = new Schema<IBrokerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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

    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    projectsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },

    agencyName: {
      type: String,
      trim: true,
    },

    officeAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
    },

    about: {
      type: String,
      maxlength: 1000,
    },

    specialization: [
      {
        type: String,
        enum: [
          "Residential",
          "Commercial",
          "Plot",
          "Industrial",
          "Rental",
        ],
      },
    ],

    operatingLocations: [String],

    languages: [String],
  },
  {
    timestamps: true,
  }
);

export const BrokerProfileModel = model<IBrokerProfile>( "BrokerProfile", brokerProfileSchema);