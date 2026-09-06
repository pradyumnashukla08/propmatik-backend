import { Response } from "express";
import { Types } from "mongoose";

import { SessionInterface } from "../user/user.interface";
import { ConversationModel } from "./conversation.model";
import { PropertyInteractionModel } from "../property-interaction/model.property-interaction";

export const createConversation = async (
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

    const { interactionId } = req.body;

    if (!interactionId) {
      return res.status(400).json({
        success: false,
        message: "Interaction ID is required",
      });
    }

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

    // Only Chat interaction can create conversation
    if (interaction.type !== "Chat") {
      return res.status(400).json({
        success: false,
        message:
          "Conversation can only be created for Chat interaction",
      });
    }

    // Payment must be confirmed
    if (interaction.status !== "Confirmed") {
      return res.status(400).json({
        success: false,
        message:
          "Payment is required before starting chat",
      });
    }

    // Check user is participant
    const isParticipant =
      interaction.requestedBy.toString() ===
        userId.toString() ||
      interaction.propertyOwnerId.toString() ===
        userId.toString();

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized for this conversation",
      });
    }

    // Check existing conversation
    const existingConversation =
      await ConversationModel.findOne({
        interactionId: interaction._id,
      });

    if (existingConversation) {
      return res.status(200).json({
        success: true,
        message: "Conversation already exists",
        data: existingConversation,
      });
    }

    const conversation =
      await ConversationModel.create({
        interactionId: interaction._id,
        propertyId: interaction.propertyId,
        participants: [
          interaction.requestedBy,
          interaction.propertyOwnerId,
        ],
      });

    // Store conversation ID in interaction
    interaction.conversationId =
      conversation._id;

    await interaction.save();

    return res.status(201).json({
      success: true,
      message: "Conversation created successfully",
      data: conversation,
    });
  } catch (error) {
    console.error(
      "Create Conversation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getConversationById = async (
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

    const { conversationId } = req.params;

    const conversation =
      await ConversationModel.findById(
        conversationId
      )
        .populate("participants", "-password")
        .populate("interactionId")
        .populate("propertyId");

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    const isParticipant =
      conversation.participants.some(
        (participant) =>
          participant.toString() ===
          userId.toString()
      );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to access this conversation",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conversation fetched successfully",
      data: conversation,
    });
  } catch (error) {
    console.error(
      "Get Conversation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};