import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import {
  sendMessage,
  getMessages,
  markMessageAsRead,
} from "./message.controller";

const MessageRouter = Router();

MessageRouter.use(authMiddleware);


// Send message
MessageRouter.post(
  "/send",
  sendMessage
);


// Get conversation messages
MessageRouter.get(
  "/:conversationId",
  getMessages
);


// Mark message as read
MessageRouter.patch(
  "/:messageId/read",
  markMessageAsRead
);

export default MessageRouter;