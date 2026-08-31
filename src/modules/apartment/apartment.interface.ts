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
    facing?: "East" | "West" | "North" | "South" | "North-East" | "North-West" | "South-East" | "South-West";
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

    verificationStatus: "Pending" | "Verified" | "Rejected";
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