import { Schema, model } from "mongoose";
import { IWishlist } from "./wishlist.interface";

const wishlistSchema = new Schema<IWishlist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    propertyId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    propertyType: {
      type: String,
      enum: ["Plot", "Apartment"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export const WishlistModel = model<IWishlist>("Wishlist", wishlistSchema);