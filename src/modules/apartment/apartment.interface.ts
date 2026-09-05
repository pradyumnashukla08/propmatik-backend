import { Document } from "mongoose";

export interface IApartment extends Document {
  // Step 1: Basic Details
  listingType: "Sale" | "Rent";
  propertyType: "Apartment" | "Flat" | "Studio" | "Penthouse";
  bhk: "1" | "1.5" | "2" | "2.5" | "3" | "4" | "5+";
  propertyStatus: "Ready to Move" | "Under Construction" | "Upcoming";
  condition: "New" | "Resale";
  furnishing: "Furnished" | "Semi-furnished" | "Unfurnished";
  propertyTitle: string;
  description: string;

  // Listing Status
  status:
    | "Draft"
    | "Pending Verification"
    | "Active"
    | "Rejected"
    | "Sold"
    | "Rented"
    | "Expired"
    | "Withdrawn";

  // Verification Status
  verificationStatus:
    | "Pending"
    | "Verified"
    | "Rejected"
    | "Needs Review";

  // Step 2: Location
  location: {
    buildingSocietyName?: string;
    areaLocality: string;
    city: string;
    pinCode: string;
    fullAddress: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };

  // Step 3: Specifications
  specifications: {
    carpetArea: number;
    builtUpArea?: number;
    superBuiltUpArea?: number;

    floor: number;
    totalFloors: number;
    towerWing?: string;

    facing?:
      | "East"
      | "West"
      | "North"
      | "South"
      | "North-East"
      | "North-West"
      | "South-East"
      | "South-West";

    view?: string;

    roomConfigurations: {
      bedrooms: number;
      bathrooms: number;
      balconies: number;
      toilets: number;
      studyRoom: boolean;
      servantRoom: boolean;
      poojaRoom: boolean;
      storeRoom: boolean;
    };
  };

  // Step 4: Pricing & Financials
  pricing: {
    askingPrice: number;
    pricePerSqFt: number;
    negotiable: boolean;

    additionalBreakdown: {
      stampDutyEstimate?: number;
      registrationEstimate?: number;
      otherCharges?: number;
      maintenancePerMonth?: number;
      parkingCharges?: number;
      transferCharges?: number;
    };

    estimatedTotalAcquisitionCost: number;
  };

  // Step 5: Building Details
  buildingDetails: {
    developerBuilder?: string;
    yearBuilt?: number;
    totalTowers?: number;
    totalApartments?: number;
    numberOfFloors?: number;
    apartmentsPerFloor?: number;
    reraNumber?: string;

    societyRegistered: boolean;
    ocAvailable: boolean;
    ccAvailable: boolean;
  };

  // Step 6: Amenities
  amenities: {
    common: string[];

    parking: {
      typesAvailable: (
        | "Open"
        | "Covered"
        | "Stilt"
        | "Podium"
        | "Basement"
      )[];
      numberOfSpaces: number;
      evChargingAvailable: boolean;
    };
  };

  // Step 7: Interior Features
  interiorFeatures: string[];

  // Step 8: Photos & Media
  media: {
    images: string[];
    videos: string[];
    virtualTours: string[];
    floorPlans: string[];
    brochures: string[];
  };

  // Step 9: Legal & Verification
  legalVerification: {
    saleDeedOrAgreement?: string;
    propertyTaxOrMaintenance?: string;
    verifiedAt?: Date;
  };

  // Step 10: Seller / Broker Info
  seller: {
    listingAs: "Owner" | "Broker" | "Builder";
    ownerName: string;
    phone: string;
    email: string;
    preferredContactMethod: "Phone" | "Email";
  };

  createdAt: Date;
  updatedAt: Date;
}

import { z } from "zod";

export const createApartmentSchema = z.object({
  listingType: z.enum(["Sale", "Rent"]),

  propertyType: z.enum([
    "Apartment",
    "Flat",
    "Studio",
    "Penthouse",
  ]),

  bhk: z.enum([
    "1",
    "1.5",
    "2",
    "2.5",
    "3",
    "4",
    "5+",
  ]),

  propertyStatus: z.enum([
    "Ready to Move",
    "Under Construction",
    "Upcoming",
  ]),

  condition: z.enum(["New", "Resale"]),

  furnishing: z.enum([
    "Furnished",
    "Semi-furnished",
    "Unfurnished",
  ]),

  propertyTitle: z
    .string()
    .trim()
    .min(3, "Property title must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  location: z.object({
    buildingSocietyName: z.string().trim().optional(),

    areaLocality: z
      .string()
      .trim()
      .min(2, "Area/Locality is required"),

    city: z
      .string()
      .trim()
      .min(2, "City is required"),

    pinCode: z
      .string()
      .regex(/^[0-9]{6}$/, "Invalid PIN code"),

    fullAddress: z
      .string()
      .trim()
      .min(5, "Full address is required"),

    coordinates: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
      })
      .optional(),
  }),

  specifications: z.object({
    carpetArea: z
      .number()
      .positive("Carpet area must be greater than 0"),

    builtUpArea: z.number().positive().optional(),

    superBuiltUpArea: z.number().positive().optional(),

    floor: z
      .number()
      .int()
      .min(0, "Floor cannot be negative"),

    totalFloors: z
      .number()
      .int()
      .positive("Total floors must be greater than 0"),

    towerWing: z.string().trim().optional(),

    facing: z
      .enum([
        "East",
        "West",
        "North",
        "South",
        "North-East",
        "North-West",
        "South-East",
        "South-West",
      ])
      .optional(),

    view: z.string().trim().optional(),

    roomConfigurations: z.object({
      bedrooms: z.number().int().min(0),

      bathrooms: z.number().int().min(0),

      balconies: z.number().int().min(0),

      toilets: z.number().int().min(0),

      studyRoom: z.boolean(),

      servantRoom: z.boolean(),

      poojaRoom: z.boolean(),

      storeRoom: z.boolean(),
    }),
  }),

  pricing: z.object({
    askingPrice: z
      .number()
      .positive("Asking price must be greater than 0"),

    pricePerSqFt: z
      .number()
      .positive("Price per sq.ft must be greater than 0"),

    negotiable: z.boolean(),

    additionalBreakdown: z.object({
      stampDutyEstimate: z.number().min(0).optional(),

      registrationEstimate: z.number().min(0).optional(),

      otherCharges: z.number().min(0).optional(),

      maintenancePerMonth: z.number().min(0).optional(),

      parkingCharges: z.number().min(0).optional(),

      transferCharges: z.number().min(0).optional(),
    }),

    estimatedTotalAcquisitionCost: z
      .number()
      .positive(
        "Estimated total acquisition cost must be greater than 0"
      ),
  }),

  buildingDetails: z.object({
    developerBuilder: z.string().trim().optional(),

    yearBuilt: z
      .number()
      .int()
      .min(1800)
      .max(new Date().getFullYear() + 10)
      .optional(),

    totalTowers: z.number().int().positive().optional(),

    totalApartments: z.number().int().positive().optional(),

    numberOfFloors: z.number().int().positive().optional(),

    apartmentsPerFloor: z.number().int().positive().optional(),

    // RERA number can be provided during creation
    reraNumber: z.string().trim().optional(),

    societyRegistered: z.boolean(),

    ocAvailable: z.boolean(),

    ccAvailable: z.boolean(),
  }),

  amenities: z.object({
    common: z.array(z.string().trim()),

    parking: z.object({
      typesAvailable: z.array(
        z.enum([
          "Open",
          "Covered",
          "Stilt",
          "Podium",
          "Basement",
        ])
      ),

      numberOfSpaces: z
        .number()
        .int()
        .min(0),

      evChargingAvailable: z.boolean(),
    }),
  }),

  interiorFeatures: z.array(z.string().trim()),

  media: z.object({
    images: z.array(z.string().url()),

    videos: z.array(z.string().url()),

    virtualTours: z.array(z.string().url()),

    floorPlans: z.array(z.string().url()),

    brochures: z.array(z.string().url()),
  }),

  legalVerification: z.object({
    saleDeedOrAgreement: z.string().optional(),

    propertyTaxOrMaintenance: z.string().optional(),

    verifiedAt: z.coerce.date().optional(),
  }),

  seller: z.object({
    listingAs: z.enum([
      "Owner",
      "Broker",
      "Builder",
    ]),

    ownerName: z
      .string()
      .trim()
      .min(2, "Owner name is required"),

    phone: z
      .string()
      .regex(
        /^[6-9][0-9]{9}$/,
        "Invalid Indian mobile number"
      ),

    email: z
      .string()
      .email("Invalid email address"),

    preferredContactMethod: z.enum([
      "Phone",
      "Email",
    ]),
  }),
});
