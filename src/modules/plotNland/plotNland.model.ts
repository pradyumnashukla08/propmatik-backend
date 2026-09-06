import mongoose, { Schema } from "mongoose";
import { IPlotNLand } from "./plotNland.interface";

const plotNLandSchema = new Schema<IPlotNLand>(
  {

    userId:{
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
    },
    // STEP 1: BASIC PLOT DETAILS

    listingType: {
      type: String,
      enum: ["Sale", "Lease"],
      required: true,
    },

    plotType: {
      type: String,
      enum: [
        "Residential Plot",
        "Commercial Plot",
        "Agricultural Land",
        "Industrial Plot",
        "NA Plot",
        "Farm Land",
        "Investment Land",
      ],
      required: true,
    },

    condition: {
      type: String,
      enum: ["New", "Resale"],
      required: true,
    },

    plotPurpose: {
      type: String,
      trim: true,
    },

    listingTitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // STEP 2: LOCATION

    location: {
      villageLocality: {
        type: String,
        required: true,
        trim: true,
      },

      taluka: {
        type: String,
        required: true,
        trim: true,
      },

      district: {
        type: String,
        required: true,
        trim: true,
      },

      pinCode: {
        type: String,
        required: true,
        trim: true,
      },

      surveyGatNumber: {
        type: String,
        trim: true,
      },

      ctsNumber: {
        type: String,
        trim: true,
      },

      fullAddress: {
        type: String,
        required: true,
        trim: true,
      },

      coordinates: {
        latitude: {
          type: Number,
        },

        longitude: {
          type: Number,
        },
      },

      roadConnectivity: {
        nearbyHighway: {
          type: String,
          trim: true,
        },

        nearbyRailwayStation: {
          type: String,
          trim: true,
        },

        mainRoadDistanceKm: {
          type: Number,
          min: 0,
        },

        internalRoadWidthFt: {
          type: Number,
          min: 0,
        },

        plotRoadFrontageFt: {
          type: Number,
          min: 0,
        },

        roadType: {
          type: String,
          trim: true,
        },
      },
    },

    // STEP 3: SIZE & DIMENSIONS

    dimensions: {
      plotArea: {
        type: Number,
        required: true,
        min: 0,
      },

      areaUnit: {
        type: String,
        enum: [
          "sq.ft.",
          "sq.m.",
          "acre",
          "hectare",
          "guntha",
        ],
        required: true,
      },

      length: {
        value: {
          type: Number,
          min: 0,
        },

        unit: {
          type: String,
          enum: ["ft", "m"],
        },
      },

      width: {
        value: {
          type: Number,
          min: 0,
        },

        unit: {
          type: String,
          enum: ["ft", "m"],
        },
      },

      depth: {
        value: {
          type: Number,
          min: 0,
        },

        unit: {
          type: String,
          enum: ["ft", "m"],
        },
      },

      shape: {
        type: String,
        enum: [
          "Rectangular",
          "Square",
          "Irregular",
          "Other",
        ],
      },

      roadFacingSides: {
        type: Number,
        default: 1,
        min: 1,
      },

      isCornerPlot: {
        type: Boolean,
        default: false,
      },
    },
  
    // STEP 4: PRICE

    pricing: {
      totalAskingPrice: {
        type: Number,
        required: true,
        min: 0,
      },

      pricePerSqFt: {
        type: Number,
        required: true,
        min: 0,
      },

      negotiable: {
        type: Boolean,
        default: false,
      },

      tokenAmount: {
        type: Number,
        min: 0,
      },

      developmentCharges: {
        type: Number,
        min: 0,
      },

      otherCharges: {
        type: Number,
        min: 0,
      },

      brokerage: {
        type: Number,
        min: 0,
      },
    },

    // STEP 5: LAND & DEVELOPMENT

    landDevelopment: {
      landUse: {
        type: String,
        trim: true,
      },

      naStatus: {
        type: String,
        trim: true,
      },

      zoning: {
        type: String,
        trim: true,
      },

      developmentPotential: {
        type: String,
        trim: true,
      },

      fsiFar: {
        type: Number,
        min: 0,
      },

      tdrPotential: {
        type: Boolean,
        default: false,
      },

      approvals: {
        buildingPermissionStatus: {
          type: String,
          trim: true,
        },

        layoutApprovalAuthority: {
          type: String,
          trim: true,
        },

        plotNumberInLayout: {
          type: String,
          trim: true,
        },

        layoutApproved: {
          type: Boolean,
          default: false,
        },

        subdivisionApproved: {
          type: Boolean,
          default: false,
        },
      },
    },

    // STEP 6: UTILITIES

    utilities: {
      electricityAvailableNearby: {
        type: Boolean,
        default: false,
      },

      directElectricityConnection: {
        type: Boolean,
        default: false,
      },

      municipalWater: {
        type: Boolean,
        default: false,
      },

      borewellWell: {
        type: Boolean,
        default: false,
      },

      directWaterConnection: {
        type: Boolean,
        default: false,
      },

      sewerageDrainage: {
        type: Boolean,
        default: false,
      },

      septicTank: {
        type: Boolean,
        default: false,
      },

      gasPipeline: {
        type: Boolean,
        default: false,
      },

      internetFiber: {
        type: Boolean,
        default: false,
      },

      streetLights: {
        type: Boolean,
        default: false,
      },
    },

    // STEP 7: LEGAL & OWNERSHIP
  
    legalOwnership: {
      ownerName: {
        type: String,
        required: true,
        trim: true,
      },

      ownershipType: {
        type: String,
        enum: ["Single", "Joint"],
        required: true,
      },

      numberOfOwners: {
        type: Number,
        required: true,
        min: 1,
      },

      documents: {
        titleClear: {
          type: Boolean,
          default: false,
        },

        sevenTwelveExtract: {
          type: Boolean,
          default: false,
        },

        propertyCard: {
          type: Boolean,
          default: false,
        },

        saleDeed: {
          type: Boolean,
          default: false,
        },

        mutationEntry: {
          type: Boolean,
          default: false,
        },

        naOrder: {
          type: Boolean,
          default: false,
        },

        sanctionedLayout: {
          type: Boolean,
          default: false,
        },

        demarcationAvailable: {
          type: Boolean,
          default: false,
        },

        surveyMap: {
          type: Boolean,
          default: false,
        },

        taxReceipts: {
          type: Boolean,
          default: false,
        },
      },

      encumbrances: {
        loanMortgage: {
          type: Boolean,
          default: false,
        },

        courtDispute: {
          type: Boolean,
          default: false,
        },

        legalDispute: {
          type: Boolean,
          default: false,
        },
      },
    },

    // STEP 8: PHYSICAL DETAILS

    physicalDetails: {
      currentlyFenced: {
        type: Boolean,
        default: false,
      },

      boundaryWall: {
        type: Boolean,
        default: false,
      },

      gate: {
        type: Boolean,
        default: false,
      },

      levelledLand: {
        type: Boolean,
        default: false,
      },

      flatTerrain: {
        type: Boolean,
        default: false,
      },

      sloping: {
        type: Boolean,
        default: false,
      },

      filledLand: {
        type: Boolean,
        default: false,
      },

      rocky: {
        type: Boolean,
        default: false,
      },

      agriCultivation: {
        type: Boolean,
        default: false,
      },

      trees: {
        type: Boolean,
        default: false,
      },

      existingStructure: {
        type: Boolean,
        default: false,
      },

      risks: {
        waterloggingFloodingHistory: {
          type: Boolean,
          default: false,
        },

        drainNallahNearby: {
          type: Boolean,
          default: false,
        },

        highTensionElectricityLine: {
          type: Boolean,
          default: false,
        },

        railwayHighwaySetbackIssues: {
          type: Boolean,
          default: false,
        },
      },
    },

    // STEP 9: PHOTOS & DOCUMENTS

    media: {
      photos: {
        type: [String],
        default: [],
      },

      maps: {
        type: [String],
        default: [],
      },

      surveyMaps: {
        type: [String],
        default: [],
      },

      propertyCards: {
        type: [String],
        default: [],
      },

      documents: {
        type: [String],
        default: [],
      },
    },

    // STEP 10: OWNER / BROKER

    seller: {
      listingAs: {
        type: String,
        enum: ["Owner", "Broker", "Developer"],
        required: true,
      },

      ownerName: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      preferredContactMethod: {
        type: String,
        enum: ["Phone", "Email"],
        default: "Phone",
      },
    },
    
    // Listing Status
    status: {
      type: String,
      enum: [
        "Draft",
        "Pending Verification",
        "Active",
        "Rejected",
        "Sold",
        "Leased",
        "Expired",
        "Withdrawn",
      ],
      default: "Draft",
      required: true,
    },

    // Verification Status
    verificationStatus: {
      type: String,
      enum: [
        "Pending",
        "Verified",
        "Rejected",
        "Needs Review",
      ],
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PlotNLandModel = mongoose.model<IPlotNLand>(
  "PlotNLand",
  plotNLandSchema
);