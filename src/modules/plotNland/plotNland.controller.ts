import { Request, Response } from "express";
import mongoose from "mongoose";
import { createPlotNLandSchema } from "./plotNland.interface";
import { PlotNLandModel } from "./plotNland.model";
export const createPlotNland = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        // 1. Validate request body
        const validationResult = createPlotNLandSchema.safeParse(req.body);

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

        // 2. Get validated data
        const plotNlandData = validationResult.data;

        // 3. Create listing
        const plotNland =
        await PlotNLandModel.create({
            ...plotNlandData,

            // Explicit defaults
            userId,
            status: "Draft",
            verificationStatus: "Pending",
        });

        // 4. Success response
        return res.status(201).json({
        success: true,
        message: "Plot/Land created successfully",
        data: plotNland,
        });

    }  
    catch (error) {
    // Mongoose validation error
        if (error instanceof mongoose.Error.ValidationError) {

        return res.status(400).json({
            success: false,
            message: "Database validation failed",
            errors: Object.values(error.errors).map((err) => ({
            field: err.path,
            message: err.message,
            })),
        });
        }

        // Invalid MongoDB related error
        if (error instanceof mongoose.Error.CastError) {

        return res.status(400).json({
            success: false,
            message: `Invalid value for field: ${error.path}`,
        });
        }

        // Other errors
        if(error instanceof Error){
            console.error("Error during createPlotNland:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during createPlotNland",
            });
        }    
    }
}

export const getAllPlotNland = async (req: Request, res: Response) => {
    try {
        const plotsNLand = await PlotNLandModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Plot/Land listings fetched successfully",
            count: plotsNLand.length,
            data: plotsNLand,
        });
    } 
    catch (error) {
        if(error instanceof Error){
            console.error("Error during getALLPlotNland:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during getAlLPlotNland",
            });
        }    
    }
}

export const getPlotNlandById = async(req: Request, res: Response) => {
    try {
        const plotsNLand = await PlotNLandModel.findById(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Plot/Land listings fetched successfully",
            data: plotsNLand,
        });
    } 
    catch (error) {
        if(error instanceof Error){
            console.error("Error during gelPlotNlandById:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during gelPlotNlandById",
            });
        }    
    }
}

export const updatePlotNlandStatus = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatus = [
            "Draft",
            "Pending Verification",
            "Active",
            "Rejected",
            "Sold",
            "Leased",
            "Expired",
            "Withdrawn",
        ];

        // Validate status
        if (!status || !allowedStatus.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status",
            allowedStatus,
        });
        }

    // Find and update
        const updatedPlotNland =
            await PlotNLandModel.findByIdAndUpdate(
            id,
            { status },
            {
            new: true,
            runValidators: true,
            }
        );

        // Listing not found
        if (!updatedPlotNland) {
            return res.status(404).json({
                success: false,
                message: "Plot/Land listing not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Plot/Land status updated successfully",
            data: updatedPlotNland,
        });
    } 
    catch (error) {
        if(error instanceof Error){
            console.error("Error during upadteStausOfPlotNland:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during upadteStausOfPlotNland",
            });
        }    
    }
}


export const editPlotNland = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Body se protected fields ko alag kar do
        const {
            status,
            verificationStatus,
            rera,
            reraDetails,
            ...updateData
        } = req.body;

    // Update listing
    const updatedPlotNland =
        await PlotNLandModel.findByIdAndUpdate(
            id,
            updateData,
            {
            new: true,
            runValidators: true,
            }
        );

    // Listing nahi mili
        if (!updatedPlotNland) {
        return res.status(404).json({
            success: false,
            message: "Plot/Land listing not found",
        });
        }

        return res.status(200).json({
        success: true,
        message: "Plot/Land updated successfully",
        data: updatedPlotNland,
        });

    } 
    catch (error) {
        if(error instanceof Error){
            console.error("Error during editPlotNLand:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during editPlotNLand",
            });
        }    
    }
}

export const deletePlotNland = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedPlotNland =
        await PlotNLandModel.findByIdAndDelete(id);

        if (!deletedPlotNland) {
            return res.status(404).json({
                success: false,
                message: "Plot/Land listing not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Plot/Land deleted successfully",
            data: deletedPlotNland,
        });
    } 
    catch (error) {
        if(error instanceof Error){
            console.error("Error during deletePlotNland:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during deletePlotNland",
            });
        }    
    }
}