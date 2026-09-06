import { Request, Response } from "express";import { SessionInterface } from "../user/user.interface";
import { SellerProfileModel } from "./model.owner-profile";


// Create Seller Profile
export const createSellerProfile = async (
  req: SessionInterface,
  res: Response
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const existingProfile = await SellerProfileModel.findOne({
      userId,
    });

    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message: "Seller profile already exists",
      });
    }

    const {
      sellerType,
      occupation,
      address,
      totalPropertiesListed,
      totalPropertiesSold,
      about,
    } = req.body;

    const sellerProfile = await SellerProfileModel.create({
      userId,
      sellerType,
      occupation,
      address,
      totalPropertiesListed,
      totalPropertiesSold,
      about,
    });

    return res.status(201).json({
      success: true,
      message: "Seller profile created successfully",
      data: sellerProfile,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error during createSellerProfile:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "An error occurred during createSellerProfile",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Get Seller Profile
export const getSellerProfile = async (
  req: SessionInterface,
  res: Response
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const sellerProfile = await SellerProfileModel.findOne({
      userId,
    }).populate("userId", "-password");

    if (!sellerProfile) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seller profile fetched successfully",
      data: sellerProfile,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error during getSellerProfile:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "An error occurred during getSellerProfile",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Get All Seller Profiles
export const getAllSellerProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const sellerProfiles = await SellerProfileModel.find()
      .populate("userId", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Seller profiles fetched successfully",
      count: sellerProfiles.length,
      data: sellerProfiles,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error during getAllSellerProfile:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "An error occurred during getAllSellerProfile",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Update Seller Profile
export const updateSellerProfile = async (
  req: SessionInterface,
  res: Response
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const sellerProfile = await SellerProfileModel.findOne({
      userId,
    });

    if (!sellerProfile) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found",
      });
    }

    const {
      sellerType,
      occupation,
      address,
      totalPropertiesListed,
      totalPropertiesSold,
      about,
    } = req.body;

    const updatedSellerProfile =
      await SellerProfileModel.findOneAndUpdate(
        { userId },
        {
          $set: {
            sellerType,
            occupation,
            address,
            totalPropertiesListed,
            totalPropertiesSold,
            about,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Seller profile updated successfully",
      data: updatedSellerProfile,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error during updateSellerProfile:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "An error occurred during updateSellerProfile",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};