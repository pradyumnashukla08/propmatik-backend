import { Request, Response } from "express";
import UserModel from "./user.model";
import bcrypt from "bcrypt";
import { setAccessAndRefreshToken, clearAccessAndRefreshToken } from "./utils/cokkies.utils";
import genrateAccessToken from "./utils/genrateAccessToken";
import crypto from "crypto";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, mobile, email, password } = req.body;

    if (!fullname || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const user = await UserModel.exists({ mobile });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      fullname,
      mobile,
      email,
      password: hashedPassword,
    });



    return res.status(201).json({
      success: true,
      message: "User created successfully, Please check your sms for verification code.",
    });
  } 
  catch (error) {
    if(error instanceof Error) {
        console.error("Error during signup:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during signup",
        });
    }
  }
};


export const sentOtp = async(req: Request, res: Response) => {
    try{

    }
    catch(error){
        if(error instanceof Error) {
            console.error("Error during OTP sending:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during OTP sending",
            });
        }
    }
} 

export const otpVerification = async (req: Request, res: Response) => {
    try{

    }
    catch(error){
        if(error instanceof Error) {
            console.error("Error during OTP verification:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during OTP verification",
            });
        }
    }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both mobile and password",
      });
    }

    const user = await UserModel.findOne({ mobile });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const verified = user.isVerified;
    if(!verified){
        return res.status(401).json({
            success: false,
            message: "User is not verified, Please verify your account first.",
        });
    }

    const access_token =  genrateAccessToken(user._id.toString(), user?.mobile);
    let refresh_token =  crypto.randomUUID();
    const refreshTokenhHash = crypto.createHash("sha256").update(refresh_token).digest("hex");
    const refreshTokenExpiryTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    user.refreshTokenHash = refreshTokenhHash;
    user.refreshTokenExpiryTime = refreshTokenExpiryTime;
    await user.save();

    setAccessAndRefreshToken(res, access_token, refresh_token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
            userId: user._id,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            memberType: user.memberType,
            curentCity: user.curentCity,
            isVerified: user.isVerified,
            updatedAt: user.updatedAt,
        }
    });

  } catch (error) {
    if(error instanceof Error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login",
        });
    }
  }
};


export const getMe = async(req: Request, res: Response) => {
    try {
        const userId = req.body.id; // Assuming you have a middleware that sets req.user
        const user = await UserModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        if(error instanceof Error) {
            console.error("Error during getMe:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during getMe",
            });
        }
    }
}

export const updateMe = async(req: Request, res: Response) => {
    try {

        const { fullname, email, curentCity , userId} = req.body;

        const user = await UserModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (curentCity) user.curentCity = curentCity;

        await user.save();
        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        if(error instanceof Error) {
            console.error("Error during updateProfile:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during updateProfile",
            });
        }
    }
}

export const logout = async(req: Request, res: Response) => {
    try {
        const userId = req.body.id; // Assuming you have a middleware that sets req.user
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.refreshTokenHash = null;
        user.refreshTokenExpiryTime = null;

        await user.save();

        clearAccessAndRefreshToken(res)

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } 
    catch (error) {
        if(error instanceof Error){
            console.error("Error during logout:", error);
            return res.status(500).json({
                success: false,
                message: "An error occurred during logout",
            });
        }
    }
}

export const sendOtpForForgotPassword = async(req: Request, res: Response) => {
    try {
        const {mobile} =  req.body

        const user = await UserModel.findOne({mobile});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            }); 
        }

        
    } 
    catch (error) {
        if(error instanceof Error){
            console.log("Error during forgotPassword:", error.message);
        }
        return res.status(500).json({
            success: false,
            message: "An error occurred during forgotPassword",
        });
    }
}