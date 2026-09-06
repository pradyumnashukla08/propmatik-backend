import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware";

import {
  createConversation,
  getConversationById,
} from "./conversation.controller";

const ConversationRouter = Router();

ConversationRouter.use(authMiddleware);

ConversationRouter.post(
  "/create",
  createConversation
);

ConversationRouter.get(
  "/:conversationId",
  getConversationById
);

export default ConversationRouter;