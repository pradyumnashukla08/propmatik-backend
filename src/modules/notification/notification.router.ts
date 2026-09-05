import { Router } from "express";

import {
  createNotification,
  getAllNotifications,
  getNotificationsByUser,
  getUnreadNotifications,
  getNotificationById,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "./notification.controller";

const NotificationRouter = Router();

NotificationRouter.post("/", createNotification);
NotificationRouter.get("/", getAllNotifications);
NotificationRouter.get("/user/:userId", getNotificationsByUser);
NotificationRouter.get("/user/:userId/unread",getUnreadNotifications);
NotificationRouter.put("/user/:userId/read-all",markAllNotificationsAsRead);
NotificationRouter.get("/:id", getNotificationById);
NotificationRouter.put("/:id/read", markNotificationAsRead);
NotificationRouter.delete("/:id", deleteNotification);
NotificationRouter.delete("/user/:userId",deleteAllNotifications);

export default NotificationRouter;