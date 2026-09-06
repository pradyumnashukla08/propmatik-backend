import { Router } from "express";

import {
  createSellerProfile,
  getSellerProfile,
  getAllSellerProfile,
  updateSellerProfile,
} from "./controller.owner-profile";

import authMiddleware from "../../middleware/auth.middleware";

const SellerProfileRouter = Router();

SellerProfileRouter.use(authMiddleware);

// Create seller profile
SellerProfileRouter.post(
  "/create",
  createSellerProfile
);

// Get logged-in seller profile
SellerProfileRouter.get(
  "/",
  getSellerProfile
);

// Get all seller profiles
SellerProfileRouter.get(
  "/all-seller",
  getAllSellerProfile
);

// Update seller profile
SellerProfileRouter.put(
  "/update",
  updateSellerProfile
);

export default SellerProfileRouter;