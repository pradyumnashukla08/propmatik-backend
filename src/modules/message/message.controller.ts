import { Response } from "express";
import { Types } from "mongoose";

import { SessionInterface } from "../user/user.interface";
import { MessageModel } from "./message.model";
import { PropertyInteractionModel } from "../property-interaction/model.property-interaction";


// Send Message
export const sendMessage = async (
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
      conversationId,
      message,
    } = req.body;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "Conversation ID is required",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Find conversation
    const conversation =
      await ConversationModel.findById(
        conversationId
      );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Check participant
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
          "You are not authorized to send message in this conversation",
      });
    }

    // Find interaction
    const interaction =
      await PropertyInteractionModel.findById(
        conversation.interactionId
      );

    if (!interaction) {
      return res.status(404).json({
        success: false,
        message: "Interaction not found",
      });
    }

    // Only Chat interaction
    if (interaction.type !== "Chat") {
      return res.status(400).json({
        success: false,
        message:
          "Messages can only be sent for Chat interaction",
      });
    }

    // Payment must be confirmed
    if (interaction.status !== "Confirmed") {
      return res.status(400).json({
        success: false,
        message:
          "Payment is required before sending messages",
      });
    }

    // Create message
    const newMessage =
      await MessageModel.create({
        conversationId:
          new Types.ObjectId(conversationId),

        senderId:
          new Types.ObjectId(userId),

        message: message.trim(),

        isRead: false,
      });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {
    console.error(
      "Send Message Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Get Messages
export const getMessages = async (
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

    // Find conversation
    const conversation =
      await ConversationModel.findById(
        conversationId
      );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Check participant
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
          "You are not authorized to view these messages",
      });
    }

    // Get messages
    const messages =
      await MessageModel.find({
        conversationId:
          new Types.ObjectId(conversationId),
      })
        .populate(
          "senderId",
          "-password"
        )
        .sort({
          createdAt: 1,
        });

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });

  } catch (error) {
    console.error(
      "Get Messages Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Mark Message As Read
export const markMessageAsRead = async (
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

    const { messageId } = req.params;

    // Find message
    const message =
      await MessageModel.findById(
        messageId
      );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Find conversation
    const conversation =
      await ConversationModel.findById(
        message.conversationId
      );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Check participant
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
          "You are not authorized to update this message",
      });
    }

    // Already read
    if (message.isRead) {
      return res.status(200).json({
        success: true,
        message: "Message already marked as read",
        data: message,
      });
    }

    message.isRead = true;
    message.readAt = new Date();

    await message.save();

    return res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: message,
    });

  } catch (error) {
    console.error(
      "Mark Message As Read Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};