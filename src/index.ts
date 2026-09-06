import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import DBConnect from "./config/db.config";
import UserRouter from "./modules/user/user.routes";
import PloatNLandRouter from "./modules/plotNland/ploatNland.routes"
import globalRateLimiter from "./middleware/rateLimiter";
import ApartmentRouter from "./modules/apartment/apartment.routes";
import NotificationRouter from "./modules/notification/notification.routes";
import BrokerProfileRouter from "./modules/broker-profile/routes.broker-profile";
import BuliderProfileRouter from "./modules/builder-profile/route.bulider-profile";
import ConversationRouter from "./modules/conversation/conversation.route";
import MessageRouter from "./modules/message/message.route";
import SellerProfileRouter from "./modules/owner-profile/route.owner-profile";
import PropertyInteractionRouter from "./modules/property-interaction/route.property-interaction";
import WishlistRouter from "./modules/wishlist/wishlist.routes";

const app = express();

DBConnect();

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalRateLimiter);

app.use("/user", UserRouter);
app.use('/plot-land', PloatNLandRouter)
app.use('/apartment', ApartmentRouter)
app.use("/notifications", NotificationRouter);
app.use('/broker', BrokerProfileRouter)
app.use('/builder', BuliderProfileRouter)
app.use('/owner', SellerProfileRouter)
app.use('/conversation', ConversationRouter)
app.use('/message', MessageRouter)
app.use('/property-interaction', PropertyInteractionRouter)
app.use('/wishlist', WishlistRouter)

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "propmatik is running successfully",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "propmatik is healthy",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`propmatik is running on http://localhost:${PORT}`);
});
