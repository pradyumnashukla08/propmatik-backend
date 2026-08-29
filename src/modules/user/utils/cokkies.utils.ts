import { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    secure: isProduction, 
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    path: "/", 
};

export const setAccessAndRefreshToken = (res: Response, access_token: string, refresh_token: string) => {
    res.cookie("access_token", access_token, {
        ...cookieOptions,
        maxAge: Number(process.env.ACCESS_TOKEN_EXPIRES)
    });

    res.cookie("refresh_token", refresh_token, {
        ...cookieOptions,
        maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES)
    });
};

export const clearAccessAndRefreshToken = (res: Response) => {
    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);
};