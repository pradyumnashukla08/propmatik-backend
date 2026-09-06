import { SessionInterface } from "../user/user.interface";
import { Response, Request } from "express";
import { BuilderProfileModel } from "./model.builder-profile";

export const createBuilderProfile = async (
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

    const existingProfile = await BuilderProfileModel.findOne({
      userId,
    });

    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message: "Builder profile already exists",
      });
    }

    const {
      companyName,
      rera,
      establishedYear,
      totalProjects,
      completedProjects,
      ongoingProjects,
      officeAddress,
      operatingLocations,
      website,
      about,
    } = req.body;

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    if (!rera?.reraId) {
      return res.status(400).json({
        success: false,
        message: "RERA ID is required",
      });
    }

    const builderProfile = await BuilderProfileModel.create({
      userId,

      companyName,

      rera: {
        reraId: rera.reraId,
        isVerified: false,
      },

      establishedYear,
      totalProjects,
      completedProjects,
      ongoingProjects,
      officeAddress,
      operatingLocations,
      website,
      about,
    });

    return res.status(201).json({
      success: true,
      message: "Builder profile created successfully",
      data: builderProfile,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error during createBuilderProfile:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "An error occurred during createBuilderProfile",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const getBuilderProfile = async (
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

    const builderProfile = await BuilderProfileModel.findOne({
      userId,
    }).populate("userId", "-password");

    if (!builderProfile) {
      return res.status(404).json({
        success: false,
        message: "Builder profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Builder profile fetched successfully",
      data: builderProfile,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error during getBuilderProfile:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "An error occurred during getBuilderProfile",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const getAllBuilderProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const builderProfiles = await BuilderProfileModel.find()
      .populate("userId", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Builder profiles fetched successfully",
      count: builderProfiles.length,
      data: builderProfiles,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error during getAllBuilderProfile:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "An error occurred during getAllBuilderProfile",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const updateBuilderProfile = async (
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

    const builderProfile = await BuilderProfileModel.findOne({
      userId,
    });

    if (!builderProfile) {
      return res.status(404).json({
        success: false,
        message: "Builder profile not found",
      });
    }

    const {
      establishedYear,
      totalProjects,
      completedProjects,
      ongoingProjects,
      officeAddress,
      operatingLocations,
      website,
      about,
    } = req.body;

    const updatedBuilderProfile =
      await BuilderProfileModel.findOneAndUpdate(
        { userId },
        {
          $set: {
            establishedYear,
            totalProjects,
            completedProjects,
            ongoingProjects,
            officeAddress,
            operatingLocations,
            website,
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
      message: "Builder profile updated successfully",
      data: updatedBuilderProfile,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error during updateBuilderProfile:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message: "An error occurred during updateBuilderProfile",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};