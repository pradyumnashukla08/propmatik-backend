import { Request, Response } from "express";
import { WishlistModel } from "./wishlist.model";

// Add To Wishlist  //fix for name
export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, propertyId, propertyType } = req.body;

    if (!userId || !propertyId || !propertyType) {
      return res.status(400).json({
        success: false,
        message: "userId, propertyId and propertyType are required",
      });
    }

    const allowedPropertyTypes = ["Plot", "Apartment"];

    if (!allowedPropertyTypes.includes(propertyType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property type",
        allowedPropertyTypes,
      });
    }

    const existingWishlist = await WishlistModel.findOne({
      userId,
      propertyId,
    });

    if (existingWishlist) {
      return res.status(409).json({
        success: false,
        message: "Property already exists in wishlist",
      });
    }

    const wishlist = await WishlistModel.create({
      userId,
      propertyId,
      propertyType,
    });

    return res.status(201).json({
      success: true,
      message: "Property added to wishlist successfully",
      data: wishlist,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during addToWishlist:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during addToWishlist",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during addToWishlist",
    });
  }
};


// Get All Wishlist
export const getAllWishlist = async (req: Request, res: Response) => {
  try {
    const wishlists = await WishlistModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Wishlists fetched successfully",
      count: wishlists.length,
      data: wishlists,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during getAllWishlist:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during getAllWishlist",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during getAllWishlist",
    });
  }
};


// Get Wishlist By User
export const getWishlistByUser = async (req: Request,res: Response) => {
  try {
    const { userId } = req.params;

    const wishlists = await WishlistModel.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "User wishlist fetched successfully",
      count: wishlists.length,
      data: wishlists,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during getWishlistByUser:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during getWishlistByUser",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during getWishlistByUser",
    });
  }
};


// Get Wishlist By ID
export const getWishlistById = async (req: Request,res: Response) => {
  try {
    const { id } = req.params;

    const wishlist = await WishlistModel.findById(id);

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      data: wishlist,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during getWishlistById:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during getWishlistById",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during getWishlistById",
    });
  }
};


// Remove From Wishlist
export const removeFromWishlist = async (req: Request,res: Response) => {
  try {
    const { id } = req.params;

    const wishlist = await WishlistModel.findByIdAndDelete(id);

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property removed from wishlist successfully",
      data: wishlist,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during removeFromWishlist:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during removeFromWishlist",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during removeFromWishlist",
    });
  }
};