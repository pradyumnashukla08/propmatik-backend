
import { Router } from "express";

import {
  createApartment,
  getAllApartment,
  getApartmentById,
  updateApartmentStatus,
  editApartment,
  deleteApartment,
} from "./apartment.controller";
import authMiddleware from "../../middleware/auth.middleware";

const ApartmentRouter = Router();

ApartmentRouter.use(authMiddleware);
// Create Apartment
ApartmentRouter.post("/", createApartment);
// Get All Apartments
ApartmentRouter.get("/", getAllApartment);
// Get Apartment By ID
ApartmentRouter.get("/:id", getApartmentById);
// Update Apartment Status
ApartmentRouter.put("/status/:id", updateApartmentStatus);
// Edit Apartment
ApartmentRouter.put("/:id", editApartment);
// Delete Apartment
ApartmentRouter.delete("/:id", deleteApartment);

export default ApartmentRouter;
