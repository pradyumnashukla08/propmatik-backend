import { Router } from "express";

import {
  addToWishlist,
  getAllWishlist,
  getWishlistByUser,
  getWishlistById,
  removeFromWishlist,
} from "./wishlist.controller";

const WishlistRouter = Router();

// Add Property to Wishlist
WishlistRouter.post("/", addToWishlist);

// Get All Wishlist
WishlistRouter.get("/", getAllWishlist);

// Get User Wishlist
WishlistRouter.get("/user/:userId", getWishlistByUser);

// Get Wishlist By ID
WishlistRouter.get("/:id", getWishlistById);

// Remove Property From Wishlist
WishlistRouter.delete("/:id", removeFromWishlist);

export default WishlistRouter;