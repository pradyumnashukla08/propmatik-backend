import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import DBConnect from "./config/db.config";
import UserRouter from "./modules/user/user.routes";
import PloatNLandRouter from "./modules/plotNland/ploatNland.router"
import globalRateLimiter from "./middleware/rateLimiter";
import ApartmentRouter from "./modules/apartment/apartment.route";

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
