import { Router } from "express";
import { signup, login, sentOtp, otpVerification, getMe, updateMe, logout } from "./user.controller";

const UserRouter = Router();

UserRouter.post("/signup", signup);
UserRouter.post("/login", login);
UserRouter.post("/send-otp", sentOtp);
UserRouter.post("/verify-otp", otpVerification);
UserRouter.get("/get-me", getMe)
UserRouter.put("/update-me", updateMe);
UserRouter.get("/logout", logout);

export default UserRouter;
