import mongoose, { Schema } from "mongoose";
import { IApartment } from "../interfaces/apartment.interface";


//This Schema valid for apartment and homes

const apartmentSchema = new Schema<IApartment>(
  {
    // STEP 1: BASIC DETAILS
   
    listingType: {
      type: String,
      enum: ["Sale", "Rent"],
      required: true,
    },

    propertyType: {
      type: String,
      enum: ["Apartment", "Flat", "Studio", "Penthouse"],
      required: true,
    },

    bhk: {
      type: String,
      enum: ["1", "1.5", "2", "2.5", "3", "4", "5+"],
      required: true,
    },

    propertyStatus: {
      type: String,
      enum: ["Ready to Move", "Under Construction", "Upcoming"],
      required: true,
    },

    condition: {
      type: String,
      enum: ["New", "Resale"],
      required: true,
    },

    furnishing: {
      type: String,
      enum: ["Furnished", "Semi-furnished", "Unfurnished"],
      required: true,
    },

    propertyTitle: {
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
      buildingSocietyName: {
        type: String,
        trim: true,
      },

      areaLocality: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      pinCode: {
        type: String,
        required: true,
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
    },

    // STEP 3: SPECIFICATIONS

    specifications: {
      carpetArea: {
        type: Number,
        required: true,
        min: 0,
      },

      builtUpArea: {
        type: Number,
        min: 0,
      },

      superBuiltUpArea: {
        type: Number,
        min: 0,
      },

      floor: {
        type: Number,
        required: true,
        min: 0,
      },

      totalFloors: {
        type: Number,
        required: true,
        min: 1,
      },

      towerWing: {
        type: String,
        trim: true,
      },

      facing: {
        type: String,
        enum: [
          "East",
          "West",
          "North",
          "South",
          "North-East",
          "North-West",
          "South-East",
          "South-West",
        ],
      },

      view: {
        type: String,
        trim: true,
      },

      roomConfigurations: {
        bedrooms: {
          type: Number,
          required: true,
          min: 0,
        },

        bathrooms: {
          type: Number,
          required: true,
          min: 0,
        },

        balconies: {
          type: Number,
          required: true,
          min: 0,
        },

        toilets: {
          type: Number,
          required: true,
          min: 0,
        },

        studyRoom: {
          type: Boolean,
          default: false,
        },

        servantRoom: {
          type: Boolean,
          default: false,
        },

        poojaRoom: {
          type: Boolean,
          default: false,
        },

        storeRoom: {
          type: Boolean,
          default: false,
        },
      },
    },

    // STEP 4: PRICING
   
    pricing: {
      askingPrice: {
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

      additionalBreakdown: {
        stampDutyEstimate: {
          type: Number,
          default: 0,
        },

        registrationEstimate: {
          type: Number,
          default: 0,
        },

        otherCharges: {
          type: Number,
          default: 0,
        },

        maintenancePerMonth: {
          type: Number,
          default: 0,
        },

        parkingCharges: {
          type: Number,
          default: 0,
        },

        transferCharges: {
          type: Number,
          default: 0,
        },
      },

      estimatedTotalAcquisitionCost: {
        type: Number,
        default: 0,
      },
    },

    // STEP 5: BUILDING DETAILS

    buildingDetails: {
      developerBuilder: {
        type: String,
        trim: true,
      },

      yearBuilt: {
        type: Number,
      },

      totalTowers: {
        type: Number,
        min: 1,
      },

      totalApartments: {
        type: Number,
        min: 1,
      },

      numberOfFloors: {
        type: Number,
        min: 1,
      },

      apartmentsPerFloor: {
        type: Number,
        min: 1,
      },

      reraNumber: {
        type: String,
        trim: true,
      },

      societyRegistered: {
        type: Boolean,
        default: false,
      },

      ocAvailable: {
        type: Boolean,
        default: false,
      },

      ccAvailable: {
        type: Boolean,
        default: false,
      },
    },

   
    // STEP 6: AMENITIES
   

    amenities: {
      common: {
        type: [String],
        default: [],
      },

      parking: {
        typesAvailable: {
          type: [String],
          enum: [
            "Open",
            "Covered",
            "Stilt",
            "Podium",
            "Basement",
          ],
          default: [],
        },

        numberOfSpaces: {
          type: Number,
          default: 0,
        },

        evChargingAvailable: {
          type: Boolean,
          default: false,
        },
      },
    },

   
    // STEP 7: INTERIOR FEATURES
   

    interiorFeatures: {
      type: [String],
      default: [],
    },

   
    // STEP 8: MEDIA
   

    media: {
      images: {
        type: [String],
        default: [],
      },

      videos: {
        type: [String],
        default: [],
      },

      virtualTours: {
        type: [String],
        default: [],
      },

      floorPlans: {
        type: [String],
        default: [],
      },

      brochures: {
        type: [String],
        default: [],
      },
    },

   
    // STEP 9: LEGAL
   

    legalVerification: {
      saleDeedOrAgreement: {
        type: String,
      },

      propertyTaxOrMaintenance: {
        type: String,
      },

      verificationStatus: {
        type: String,
        enum: ["Pending", "Verified", "Rejected"],
        default: "Pending",
      },

      verifiedAt: {
        type: Date,
      },
    },

   
    // STEP 10: SELLER
   

    seller: {
      listingAs: {
        type: String,
        enum: ["Owner", "Broker", "Builder"],
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
  },
  {
    timestamps: true,
  }
);

export const ApartmentModel = mongoose.model<IApartment>("Apartment", apartmentSchema);