import { Types, Document } from "mongoose";

export interface ISellerProfile extends Document {
  userId: Types.ObjectId;

  sellerType: "Individual" | "Company";

  occupation?: string;

  address?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };

  totalPropertiesListed: number;
  totalPropertiesSold: number;

  about?: string;

  createdAt: Date;
  updatedAt: Date;
}