import { Types, Document } from "mongoose";

export interface IBuilderProfile extends Document {
  userId: Types.ObjectId;

  companyName: string;

  rera: {
    reraId: string;
    isVerified: boolean;
    registeredName?: string;
    registrationDate?: Date;
    expiryDate?: Date;
    state?: string;
  };

  establishedYear?: number;

  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;

  officeAddress?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };

  operatingLocations?: string[];

  website?: string;

  about?: string;

  createdAt: Date;
  updatedAt: Date;
}
