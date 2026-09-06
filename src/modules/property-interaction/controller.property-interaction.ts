import { Response } from "express";
import { Types } from "mongoose";

import { PropertyInteractionModel } from "./model.property-interaction";
import { SessionInterface } from "../user/user.interface";
import { ApartmentModel } from "../apartment/apartment.model";
import { PlotNLandModel } from "../plotNland/plotNland.model";

export const createPropertyInteraction = async (
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

    const {
      propertyId,
      type,
      scheduledAt,
      duration,
      note,
      location,
      locationCoordinates,
      propertyType,
    } = req.body;

    // Find property
    let property;

    if (propertyType === "Apartment") {
      property = await ApartmentModel.findById(propertyId);
    } else if (propertyType === "Plot") {
      property = await PlotNLandModel.findById(propertyId);
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid property type",
      });
    }

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Property owner
    const propertyOwnerId = new Types.ObjectId(
      property.userId.toString()
    );

    // User cannot interact with his own property
    if (propertyOwnerId.toString() === userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot interact with your own property",
      });
    }

    // Video Call validation
    if (type === "VideoCall") {
      if (!scheduledAt) {
        return res.status(400).json({
          success: false,
          message: "Scheduled time is required for video call",
        });
      }

      if (!duration) {
        return res.status(400).json({
          success: false,
          message: "Duration is required for video call",
        });
      }
    }

    // Site Visit validation
    if (type === "SiteVisit") {
      if (!scheduledAt) {
        return res.status(400).json({
          success: false,
          message: "Scheduled time is required for site visit",
        });
      }

      if (!location) {
        return res.status(400).json({
          success: false,
          message: "Location is required for site visit",
        });
      }
    }

    // Check existing active interaction
    const existingInteraction =
      await PropertyInteractionModel.findOne({
        propertyId,
        requestedBy: userId,
        type,
        status: {
          $in: ["PaymentPending", "Confirmed"],
        },
      });

    if (existingInteraction) {
      return res.status(409).json({
        success: false,
        message: `You already have an active ${type} interaction for this property`,
      });
    }

    // Create interaction
    const interaction =
      await PropertyInteractionModel.create({
        propertyId: new Types.ObjectId(propertyId),
        requestedBy: new Types.ObjectId(userId),
        propertyOwnerId,
        type,
        status: "PaymentPending",
        scheduledAt,
        duration,
        note,
        location,
        locationCoordinates,
      });

    return res.status(201).json({
      success: true,
      message: "Property interaction created successfully",
      data: interaction,
    });
  } catch (error) {
    console.error(
      "Create Property Interaction Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getMyPropertyInteractions = async (
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

    const interactions =
      await PropertyInteractionModel.find({
        requestedBy: userId,
      })
        .populate("propertyId")
        .populate("propertyOwnerId")
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Property interactions fetched successfully",
      data: interactions,
    });
  } catch (error) {
    console.error(
      "Get My Property Interactions Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getPropertyInteractionById = async (
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

    const { interactionId } = req.params;

    const interaction =
      await PropertyInteractionModel.findById(
        interactionId
      )
        .populate("propertyId")
        .populate("requestedBy")
        .populate("propertyOwnerId")
        .populate("paymentId")
        .populate("conversationId");

    if (!interaction) {
      return res.status(404).json({
        success: false,
        message: "Interaction not found",
      });
    }

    // Only requester or property owner can see interaction
    const isRequester =
      interaction.requestedBy.toString() ===
      userId.toString();

    const isOwner =
      interaction.propertyOwnerId.toString() ===
      userId.toString();

    if (!isRequester && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this interaction",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property interaction fetched successfully",
      data: interaction,
    });
  } catch (error) {
    console.error(
      "Get Property Interaction Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const cancelPropertyInteraction = async (
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

    const { interactionId } = req.params;

    const { cancellationReason } = req.body;

    const interaction =
      await PropertyInteractionModel.findById(
        interactionId
      );

    if (!interaction) {
      return res.status(404).json({
        success: false,
        message: "Interaction not found",
      });
    }

    // Check requester or owner
    const isRequester =
      interaction.requestedBy.toString() ===
      userId.toString();

    const isOwner =
      interaction.propertyOwnerId.toString() ===
      userId.toString();

    if (!isRequester && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this interaction",
      });
    }

    // Already cancelled
    if (interaction.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Interaction is already cancelled",
      });
    }

    // Completed interaction cannot be cancelled
    if (interaction.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Completed interaction cannot be cancelled",
      });
    }

    interaction.status = "Cancelled";
    interaction.cancelledBy = userId as any;
    interaction.cancelledAt = new Date();
    interaction.cancellationReason =
      cancellationReason;

    await interaction.save();

    return res.status(200).json({
      success: true,
      message: "Property interaction cancelled successfully",
      data: interaction,
    });
  } catch (error) {
    console.error(
      "Cancel Property Interaction Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};