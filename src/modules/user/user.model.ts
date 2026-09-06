import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  email?: string;
  mobile: string;
  password: string;
  memberType: "normal" | "premium";
  curentCity?: string;
  isVerified: boolean;
  otp?: number;
  otpExpiryTime?: Date;
  refreshTokenHash?: string | null;
  refreshTokenExpiryTime?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      default: null,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    memberType: {
      type: String,
      required: true,
      enum: ["normal", "premium"],
      default: "normal",
    },
    curentCity: {
      type: String,
      required: false,
      default: null,
    },
    otp: {
        type: Number,
        default: null
    },
    otpExpiryTime: {
        type: Date,
        default: null
    },
    refreshTokenHash: {
        type: String,
        default: null
    },
    refreshTokenExpiryTime: {
        type: Date,
        default: null
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
