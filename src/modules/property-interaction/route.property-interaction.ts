import { Router } from "express";

import {
  createPropertyInteraction,
  getMyPropertyInteractions,
  getPropertyInteractionById,
  cancelPropertyInteraction,
} from "./controller.property-interaction";
import authMiddleware from "../../middleware/auth.middleware";

const PropertyInteractionRouter = Router();

PropertyInteractionRouter.use(authMiddleware);

// Create interaction
PropertyInteractionRouter.post(
  "/create",
  createPropertyInteraction
);

// Get my interactions
PropertyInteractionRouter.get(
  "/my",
  getMyPropertyInteractions
);

// Get single interaction
PropertyInteractionRouter.get(
  "/:interactionId",
  getPropertyInteractionById
);

// Cancel interaction
PropertyInteractionRouter.patch(
  "/:interactionId/cancel",
  cancelPropertyInteraction
);

export default PropertyInteractionRouter;