import "dotenv/config"

import jwt from "jsonwebtoken";
const accessTokenExpireTime = process.env.ACCESS_TOKEN_EXPIRES
if(!accessTokenExpireTime){
    throw new Error("ACCESS_TOKEN_EXPIRES variable missing in .env file")
}

const genrateAccessToken = (id: string, mobile: string, role: string= "USER") => {
    return jwt.sign({id, mobile, role}, process.env.ACCESS_SECRET!, {expiresIn: "15m"})
}

export default genrateAccessToken