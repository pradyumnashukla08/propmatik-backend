import { Types, Document } from "mongoose";

export type PropertyType = "Plot" | "Apartment";

export interface IWishlist extends Document {
  userId: Types.ObjectId;

  propertyId: Types.ObjectId;

  propertyType: PropertyType;

  createdAt: Date;
  updatedAt: Date;
}