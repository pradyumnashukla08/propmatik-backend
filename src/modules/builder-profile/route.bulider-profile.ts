import { Router } from "express";

import {
  createBuilderProfile,
  getBuilderProfile,
  getAllBuilderProfile,
  updateBuilderProfile,
} from "./controller.builder-profile";
import authMiddleware from "../../middleware/auth.middleware";

const BuliderProfileRouter = Router();


BuliderProfileRouter.use(authMiddleware);


BuliderProfileRouter.post(
  "/create",
  createBuilderProfile
);

// Get builder profile by userId
BuliderProfileRouter.get(
  "/",
  getBuilderProfile
);

// Get all builder profiles
BuliderProfileRouter.get(
  "/all-builder",
  getAllBuilderProfile
);

// Update builder profile
BuliderProfileRouter.put(
  "/update",
  updateBuilderProfile
);

export default BuliderProfileRouter;