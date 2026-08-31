import { Document } from "mongoose";

export interface IPlotNLand extends Document {
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

    maps: string[];

    surveyMaps: string[];

    documents: string[];
  };

  // Step 10: Owner / Broker Info
  seller: {
    listingAs: "Owner" | "Broker" | "Developer";

    ownerName: string;

    phone: string;

    email: string;

    preferredContactMethod: "Phone" | "Email";
  };

  createdAt: Date;
  updatedAt: Date;
}