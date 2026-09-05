
import { Request, Response } from "express";
import { createApartmentSchema } from "./apartment.interface";
import { ApartmentModel } from "./apartment.model";

// Create Apartment
export const createApartment = async (req: Request, res: Response) => {
  try {
    const validationResult = createApartmentSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    // Validated data
    const apartmentData = validationResult.data;

    // Create apartment
    const apartment = await ApartmentModel.create({
      ...apartmentData,

      // System controlled fields
      status: "Draft",
      verificationStatus: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Apartment created successfully",
      data: apartment,
    });

  } 
  catch (error) {
    if(error instanceof Error) {
      console.error("Error during createApartment:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during createApartment",
      });
    }
  }
};


// Get All Apartments
export const getAllApartment = async (req: Request, res: Response) => {
  try {
    const apartments = await ApartmentModel.find().sort({ createdAt: -1 }); 
    return res.status(200).json({
        success: true, 
        message: "Apartments fetched successfully",
        count: apartments.length, 
        data: apartments, 
    });
  } 
  catch (error) {
    if(error instanceof Error) {
      console.error("Error during getAllApartment:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during getAllApartment",
      });
    }
  }
};


// Get Apartment By ID
export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const apartment = await ApartmentModel.findById(req.params.id).sort({ createdAt: -1 }); 
    return res.status(200).json({
        success: true, 
        message: "Apartments fetched successfully",
        data: apartment, 
    });
  }
  catch (error) {
    if(error instanceof Error) {
      console.error("Error during getApartmentById:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during getApartmentById",
      });
    }
  }
};


// Update Apartment Status
export const updateApartmentStatus = async (req: Request, res: Response) => {
  try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatus = [
        "Draft",
        "Pending Verification",
        "Active",
        "Rejected",
        "Sold",
        "Rented",
        "Expired",
        "Withdrawn",
        ];

        if (!status || !allowedStatus.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid apartment status",
            allowedStatus,
        });
        }

        const updatedApartment = await ApartmentModel.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedApartment) {
        return res.status(404).json({
            success: false,
            message: "Apartment not found",
        });
        }

        return res.status(200).json({
        success: true,
        message: "Apartment status updated successfully",
        data: updatedApartment,
        });
  } 
  catch (error) {
    if(error instanceof Error) {
      console.error("Error during updateApartmentStatus:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during updateApartmentStatus",
      });
    }
  }
};


// Edit Apartment
export const editApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

    // Protected fields
    delete updateData.status;
    delete updateData.verificationStatus;

    // RERA number cannot be changed
    if (updateData.buildingDetails) {
      delete updateData.buildingDetails.reraNumber;
    }

    const updatedApartment = await ApartmentModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedApartment) {
      return res.status(404).json({
        success: false,
        message: "Apartment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Apartment updated successfully",
      data: updatedApartment,
    });
  } 
  catch (error) {
    if(error instanceof Error) {
      console.error("Error during editApartment:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during editApartment",
      });
    }
  }
};


// Delete Apartment
export const deleteApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedApartment = await ApartmentModel.findByIdAndDelete(id);

    if (!deletedApartment) {
      return res.status(404).json({
        success: false,
        message: "Apartment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Apartment deleted successfully",
      data: deletedApartment,
    });
  } 
  catch (error) {
    if(error instanceof Error) {
      console.error("Error during deleteApartment:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during deleteApartment",
      });
    }
  }
};