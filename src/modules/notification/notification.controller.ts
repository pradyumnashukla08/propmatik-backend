import { Request, Response } from "express";
import { NotificationModel } from "./model.notification";

// Create Notification
export const createNotification = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      title,
      message,
      type,
      entityId,
      entityType,
    } = req.body;

    if (!userId || !title || !message || !type) {
      return res.status(400).json({
        success: false,
        message: "userId, title, message and type are required",
      });
    }

    const allowedTypes = [
      "PROPERTY",
      "WISHLIST",
      "MESSAGE",
      "SYSTEM",
      "PROJECT",
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification type",
        allowedTypes,
      });
    }

    const notification = await NotificationModel.create({
      userId,
      title,
      message,
      type,
      entityId,
      entityType,
    });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during createNotification:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during createNotification",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during createNotification",
    });
  }
};


// Get All Notifications
export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await NotificationModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      count: notifications.length,
      data: notifications,
    });
  }
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during getAllNotifications:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during getAllNotifications",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during getAllNotifications",
    });
  }
};


// Get Notifications By User
export const getNotificationsByUser = async (req: Request,res: Response) => {
  try {
    const { userId } = req.params;

    const notifications = await NotificationModel
      .find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "User notifications fetched successfully",
      count: notifications.length,
      data: notifications,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during getNotificationsByUser:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during getNotificationsByUser",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during getNotificationsByUser",
    });
  }
};


// Get Unread Notifications
export const getUnreadNotifications = async (req: Request,res: Response) => {
  try {
    const { userId } = req.params;

    const notifications = await NotificationModel
      .find({
        userId,
        isRead: false,
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Unread notifications fetched successfully",
      count: notifications.length,
      data: notifications,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during getUnreadNotifications:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during getUnreadNotifications",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during getUnreadNotifications",
    });
  }
};


// Get Notification By ID
export const getNotificationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notification = await NotificationModel.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification fetched successfully",
      data: notification,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during getNotificationById:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during getNotificationById",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during getNotificationById",
    });
  }
};


// Mark Notification As Read
export const markNotificationAsRead = async (req: Request,res: Response) => {
  try {
    const { id } = req.params;

    const notification = await NotificationModel.findByIdAndUpdate(
      id,
      { isRead: true },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during markNotificationAsRead:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during markNotificationAsRead",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during markNotificationAsRead",
    });
  }
};


// Mark All Notifications As Read
export const markAllNotificationsAsRead = async (req: Request,res: Response) => {
  try {
    const { userId } = req.params;

    const result = await NotificationModel.updateMany(
      {
        userId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error during markAllNotificationsAsRead:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "An error occurred during markAllNotificationsAsRead",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "An unknown error occurred during markAllNotificationsAsRead",
    });
  }
};


// Delete Notification
export const deleteNotification = async (req: Request,res: Response) => {
  try {
    const { id } = req.params;

    const notification =await NotificationModel.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
      data: notification,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error("Error during deleteNotification:", error);

      return res.status(500).json({
        success: false,
        message: "An error occurred during deleteNotification",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unknown error occurred during deleteNotification",
    });
  }
};


// Delete All User Notifications
export const deleteAllNotifications = async (req: Request,res: Response) => {
  try {
    const { userId } = req.params;

    const result = await NotificationModel.deleteMany({
      userId,
    });

    return res.status(200).json({
      success: true,
      message: "All user notifications deleted successfully",
      deletedCount: result.deletedCount,
    });
  } 
  catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error during deleteAllNotifications:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "An error occurred during deleteAllNotifications",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "An unknown error occurred during deleteAllNotifications",
    });
  }
};