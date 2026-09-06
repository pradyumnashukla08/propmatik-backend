import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { SessionInterface } from "../modules/user/user.interface";


interface AuthPayload extends JwtPayload {
  userId: string;
  mobile: string;
  role: string;
}


const authMiddleware = async(req: SessionInterface, res: Response, next: NextFunction)=>{
   try {
        const {access_token} = req.cookies;

        if(!access_token){
            return res.status(401).json({
            "success": false,
            "code": "AUTH_TOKEN_MISSING",
            "message": "Access token not found"
            });
        }


        const decoded = jwt.verify(
            access_token,
            process.env.ACCESS_SECRET!
        ) as AuthPayload;

        if(!decoded){
            return res.status(401).json({
                "success": false,
                "code": "AUTH_TOKEN_INVALID",
                "message": "Invalid access token"
            }) 
        }

        req.userId = decoded.id
        req.mobile = decoded.mobile
        req.role = decoded.role
        next()
   } 
   catch (error) {
    if(error instanceof Error){
        console.log(error.message);
        return res.status(500).json({message: `Internal server error :- ${error.message}`})
    }
   }
}

export default authMiddleware
