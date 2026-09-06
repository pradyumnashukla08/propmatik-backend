import { Request, Response } from "express";
import { SessionInterface } from "../user/user.interface"
import { BrokerProfileModel } from "./model.broker-profile";

export const createBrokerProfile = async (req: SessionInterface, res: Response) => {
    try{
        const { userId } = req.body;

        if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
        }

        // Check if broker profile already exists
        const existingProfile = await BrokerProfileModel.findOne({
        userId,
        });

        if (existingProfile) {
            return res.status(409).json({
                success: false,
                message: "Broker profile already exists",
            });
        }

        const {
            rera,
            experienceYears,
            projectsCompleted,
            agencyName,
            officeAddress,
            about,
            specialization,
            operatingLocations,
            languages,
        } = req.body;

        const brokerProfile = await BrokerProfileModel.create({
            userId,

            rera: {
                reraId: rera.reraId,
                isVerified: false,
            },

            experienceYears,
            projectsCompleted,
            agencyName,
            officeAddress,
            about,
            specialization,
            operatingLocations,
            languages,
        });

        return res.status(201).json({
        success: true,
        message: "Broker profile created successfully",
        data: brokerProfile,
        });
    }
    catch(error){
        if(error instanceof Error){
            console.log("Error during createBrokerProfile:", error.message);
            return res.status(500).json({
                success: false,
                message: "An error occurred during createBrokerProfile",
            });
        }
    }
};


export const getBrokerProfile = async (req: Request, res: Response) => {
    try{
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        const brokerProfile = await BrokerProfileModel.findOne({
        userId,
        }).populate("userId", "-password");

        if (!brokerProfile) {
        return res.status(404).json({
            success: false,
            message: "Broker profile not found",
        });
        }

        return res.status(200).json({
            success: true,
            message: "Broker profile fetched successfully",
            data: brokerProfile,
        });
    }
    catch(error){
        if(error instanceof Error){
            console.log("Error during getBrokerProfile:", error.message);
            return res.status(500).json({
                success: false,
                message: "An error occurred during getBrokerProfile",
            });
        }
    }
};


export const getAllBrokerProfile = async (req: Request, res: Response) => {
    try{
        const brokerProfiles = await BrokerProfileModel.find()
            .populate("userId", "-password")
            .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                message: "Broker profiles fetched successfully",
                count: brokerProfiles.length,
                data: brokerProfiles,
            });
    } 
    catch(error){
        if(error instanceof Error){
            console.log("Error during getAllBrokerProfile:", error.message);
            return res.status(500).json({
                success: false,
                message: "An error occurred during getAllBrokerProfile",
            });
        }
    }
};


export const updateBrokerProfile = async (req: Request, res: Response) => {
    try{
        const { userId } = req.body;

        if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
        }

        const brokerProfile = await BrokerProfileModel.findOne({
        userId,
        });

        if (!brokerProfile) {
        return res.status(404).json({
            success: false,
            message: "Broker profile not found",
        });
        }

        const {
            experienceYears,
            projectsCompleted,
            officeAddress,
            about,
            specialization,
            operatingLocations,
            languages,
        } = req.body;

        const updatedBrokerProfile =
        await BrokerProfileModel.findOneAndUpdate(
            { userId },
            {
            $set: {
                experienceYears,
                projectsCompleted,
                officeAddress,
                about,
                specialization,
                operatingLocations,
                languages,
            },
            },
            {
            new: true,
            runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Broker profile updated successfully",
            data: updatedBrokerProfile,
        });
    }
    catch(error){
        if(error instanceof Error){
            console.log("Error during updateBrokerProfile:", error.message);
            return res.status(500).json({
                success: false,
                message: "An error occurred during updateBrokerProfile",
            });
        }
    }
};


