import { Types, Document } from "mongoose";

export interface IBrokerProfile extends Document {
  userId: Types.ObjectId;

  rera: {
    reraId: string;
    isVerified: boolean;
    registeredName?: string;
    registrationDate?: Date;
    expiryDate?: Date;
    state?: string;
  };

  experienceYears: number;

  projectsCompleted: number;

  officeAddress?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };

  agencyName?: string;

  about?: string;

  specialization?: (
    | "Residential"
    | "Commercial"
    | "Plot"
    | "Industrial"
    | "Rental"
  )[];

  operatingLocations?: string[];

  languages?: string[];

  createdAt: Date;
  updatedAt: Date;
}