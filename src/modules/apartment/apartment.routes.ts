
import { Router } from "express";

import {
  createApartment,
  getAllApartment,
  getApartmentById,
  updateApartmentStatus,
  editApartment,
  deleteApartment,
} from "./apartment.controller";

const ApartmentRouter = Router();

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
