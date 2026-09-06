import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IPlotNLand extends Document {
  userId: mongoose.Types.ObjectId;
  // Step 1: Basic Plot Details
  listingType: "Sale" | "Lease";

  plotType:
    | "Residential Plot"
    | "Commercial Plot"
    | "Agricultural Land"
    | "Industrial Plot"
    | "NA Plot"
    | "Farm Land"
    | "Investment Land";

  condition: "New" | "Resale";

  plotPurpose?: string;

  listingTitle: string;

  description: string;

  // Step 2: Location
  location: {
    villageLocality: string;
    taluka: string;
    district: string;
    pinCode: string;

    surveyGatNumber?: string;
    ctsNumber?: string;

    fullAddress: string;

    coordinates?: {
      latitude: number;
      longitude: number;
    };

    roadConnectivity: {
      nearbyHighway?: string;
      nearbyRailwayStation?: string;
      mainRoadDistanceKm?: number;
      internalRoadWidthFt?: number;
      plotRoadFrontageFt?: number;

      roadType?: string;
    };
  };

  // Step 3: Size & Dimensions
  dimensions: {
    plotArea: number;

    areaUnit:
      | "sq.ft."
      | "sq.m."
      | "acre"
      | "hectare"
      | "guntha";

    length?: {
      value: number;
      unit: "ft" | "m";
    };

    width?: {
      value: number;
      unit: "ft" | "m";
    };

    depth?: {
      value: number;
      unit: "ft" | "m";
    };

    shape?: "Rectangular" | "Square" | "Irregular" | "Other";

    roadFacingSides: number;

    isCornerPlot: boolean;
  };

  // Step 4: Price
  pricing: {
    totalAskingPrice: number;

    pricePerSqFt: number;

    negotiable: boolean;

    tokenAmount?: number;

    developmentCharges?: number;

    otherCharges?: number;

    brokerage?: number;
  };

  // Step 5: Land & Development
  landDevelopment: {
    landUse?: string;

    naStatus?: string;

    zoning?: string;

    developmentPotential?: string;

    fsiFar?: number;

    tdrPotential?: boolean;

    approvals: {
      buildingPermissionStatus?: string;

      layoutApprovalAuthority?: string;

      plotNumberInLayout?: string;

      layoutApproved: boolean;

      subdivisionApproved: boolean;
    };
  };

  // Step 6: Utilities & Infrastructure
  utilities: {
    electricityAvailableNearby: boolean;

    directElectricityConnection: boolean;

    municipalWater: boolean;

    borewellWell: boolean;

    directWaterConnection: boolean;

    sewerageDrainage: boolean;

    septicTank: boolean;

    gasPipeline: boolean;

    internetFiber: boolean;

    streetLights: boolean;
  };

  // Step 7: Legal & Ownership
  legalOwnership: {
    ownerName: string;

    ownershipType: "Single" | "Joint";

    numberOfOwners: number;

    documents: {
      titleClear: boolean;

      sevenTwelveExtract: boolean;

      propertyCard: boolean;

      saleDeed: boolean;

      mutationEntry: boolean;

      naOrder: boolean;

      sanctionedLayout: boolean;

      demarcationAvailable: boolean;

      surveyMap: boolean;

      taxReceipts: boolean;
    };

    encumbrances: {
      loanMortgage: boolean;

      courtDispute: boolean;

      legalDispute: boolean;
    };
  };

  // Step 8: Physical Details
  physicalDetails: {
    currentlyFenced: boolean;

    boundaryWall: boolean;

    gate: boolean;

    levelledLand: boolean;

    flatTerrain: boolean;

    sloping: boolean;

    filledLand: boolean;

    rocky: boolean;

    agriCultivation: boolean;

    trees: boolean;

    existingStructure: boolean;

    risks: {
      waterloggingFloodingHistory: boolean;

      drainNallahNearby: boolean;

      highTensionElectricityLine: boolean;

      railwayHighwaySetbackIssues: boolean;
    };
  };

  // Step 9: Photos & Documents
  media: {
    photos: string[];

    propertyCard: string;

    maps: string[];

    surveyMaps: string[];

    documents: string[];

    videos: string;
  };

  // Step 10: Owner / Broker Info
  seller: {
    listingAs: "Owner" | "Broker" | "Developer";

    ownerName: string;

    phone: string;

    email: string;

    preferredContactMethod: "Phone" | "Email";
  };

  // Step 11: Other Details
   status:
    | "Draft"
    | "Pending Verification"
    | "Active"
    | "Rejected"
    | "Sold"
    | "Leased"
    | "Expired"
    | "Withdrawn";

  // Verification Status
  verificationStatus:
    | "Pending"
    | "Verified"
    | "Rejected"
    | "Needs Review";

  createdAt: Date;
  updatedAt: Date;
}


import { z } from "zod";

export const createPlotNLandSchema = z.object({
  listingType: z.enum(["Sale", "Lease"]),
  
  plotType: z.enum([
    "Residential Plot",
    "Commercial Plot",
    "Agricultural Land",
    "Industrial Plot",
    "NA Plot",
    "Farm Land",
    "Investment Land",
  ]),

  condition: z.enum(["New", "Resale"]),

  plotPurpose: z.string().trim().optional(),

  listingTitle: z
    .string()
    .trim()
    .min(5, "Listing title must be at least 5 characters")
    .max(150, "Listing title cannot exceed 150 characters"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters"),

  location: z.object({
    villageLocality: z.string().trim().min(1),
    taluka: z.string().trim().min(1),
    district: z.string().trim().min(1),

    pinCode: z
      .string()
      .regex(/^[1-9][0-9]{5}$/, "Invalid PIN code"),

    surveyGatNumber: z.string().trim().optional(),
    ctsNumber: z.string().trim().optional(),

    fullAddress: z
      .string()
      .trim()
      .min(10, "Full address is required"),

    coordinates: z
      .object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
      })
      .optional(),

    roadConnectivity: z.object({
      nearbyHighway: z.string().trim().optional(),
      nearbyRailwayStation: z.string().trim().optional(),

      mainRoadDistanceKm: z
        .number()
        .min(0)
        .optional(),

      internalRoadWidthFt: z
        .number()
        .min(0)
        .optional(),

      plotRoadFrontageFt: z
        .number()
        .min(0)
        .optional(),

      roadType: z.string().trim().optional(),
    }),
  }),

  dimensions: z.object({
    plotArea: z
      .number()
      .positive("Plot area must be greater than 0"),

    areaUnit: z.enum([
      "sq.ft.",
      "sq.m.",
      "acre",
      "hectare",
      "guntha",
    ]),

    length: z
      .object({
        value: z.number().positive(),
        unit: z.enum(["ft", "m"]),
      })
      .optional(),

    width: z
      .object({
        value: z.number().positive(),
        unit: z.enum(["ft", "m"]),
      })
      .optional(),

    depth: z
      .object({
        value: z.number().positive(),
        unit: z.enum(["ft", "m"]),
      })
      .optional(),

    shape: z
      .enum(["Rectangular", "Square", "Irregular", "Other"])
      .optional(),

    roadFacingSides: z
      .number()
      .int()
      .min(1)
      .max(4),

    isCornerPlot: z.boolean(),
  }),

  pricing: z.object({
    totalAskingPrice: z
      .number()
      .positive("Price must be greater than 0"),

    pricePerSqFt: z
      .number()
      .positive("Price per sq.ft. must be greater than 0"),

    negotiable: z.boolean(),

    tokenAmount: z
      .number()
      .min(0)
      .optional(),

    developmentCharges: z
      .number()
      .min(0)
      .optional(),

    otherCharges: z
      .number()
      .min(0)
      .optional(),

    brokerage: z
      .number()
      .min(0)
      .optional(),
  }),

  landDevelopment: z.object({
    landUse: z.string().trim().optional(),
    naStatus: z.string().trim().optional(),
    zoning: z.string().trim().optional(),
    developmentPotential: z.string().trim().optional(),

    fsiFar: z
      .number()
      .min(0)
      .optional(),

    tdrPotential: z.boolean().optional(),

    approvals: z.object({
      buildingPermissionStatus: z.string().trim().optional(),
      layoutApprovalAuthority: z.string().trim().optional(),
      plotNumberInLayout: z.string().trim().optional(),

      layoutApproved: z.boolean(),
      subdivisionApproved: z.boolean(),
    }),
  }),

  utilities: z.object({
    electricityAvailableNearby: z.boolean(),
    directElectricityConnection: z.boolean(),

    municipalWater: z.boolean(),
    borewellWell: z.boolean(),
    directWaterConnection: z.boolean(),

    sewerageDrainage: z.boolean(),
    septicTank: z.boolean(),

    gasPipeline: z.boolean(),
    internetFiber: z.boolean(),
    streetLights: z.boolean(),
  }),

  legalOwnership: z.object({
    ownerName: z
      .string()
      .trim()
      .min(2, "Owner name is required"),

    ownershipType: z.enum(["Single", "Joint"]),

    numberOfOwners: z
      .number()
      .int()
      .min(1),

    documents: z.object({
      titleClear: z.boolean(),
      sevenTwelveExtract: z.boolean(),
      propertyCard: z.boolean(),
      saleDeed: z.boolean(),
      mutationEntry: z.boolean(),
      naOrder: z.boolean(),
      sanctionedLayout: z.boolean(),
      demarcationAvailable: z.boolean(),
      surveyMap: z.boolean(),
      taxReceipts: z.boolean(),
    }),

    encumbrances: z.object({
      loanMortgage: z.boolean(),
      courtDispute: z.boolean(),
      legalDispute: z.boolean(),
    }),
  }),

  physicalDetails: z.object({
    currentlyFenced: z.boolean(),
    boundaryWall: z.boolean(),
    gate: z.boolean(),

    levelledLand: z.boolean(),
    flatTerrain: z.boolean(),
    sloping: z.boolean(),
    filledLand: z.boolean(),

    rocky: z.boolean(),
    agriCultivation: z.boolean(),
    trees: z.boolean(),
    existingStructure: z.boolean(),

    risks: z.object({
      waterloggingFloodingHistory: z.boolean(),
      drainNallahNearby: z.boolean(),
      highTensionElectricityLine: z.boolean(),
      railwayHighwaySetbackIssues: z.boolean(),
    }),
  }),

  media: z.object({
    photos: z
      .array(z.string().url())
      .min(1, "At least one photo is required"),

    maps: z.array(z.string().url()),
    surveyMaps: z.array(z.string().url()),
    documents: z.array(z.string().url()),
    propertyCards: z.array(z.string().url()),
  }),

  seller: z.object({
    listingAs: z.enum(["Owner", "Broker", "Developer"]),

    ownerName: z
      .string()
      .trim()
      .min(2),

    phone: z
      .string()
      .regex(/^[6-9][0-9]{9}$/, "Invalid Indian phone number"),

    email: z
      .string()
      .email("Invalid email address"),

    preferredContactMethod: z.enum(["Phone", "Email"]),
  }),
});