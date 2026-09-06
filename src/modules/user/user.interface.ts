import { Request } from "express";
import { Types } from "mongoose";

export interface SessionInterface extends Request{
    userId?: Types.ObjectId | string;
    mobile?: string;
    role?: string;
}