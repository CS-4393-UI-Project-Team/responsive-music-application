import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  listUsers,
  removeUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// User registration
userRouter.post("/register", registerUser);

// User login
userRouter.post("/login", loginUser);

// Get logged-in user profile
userRouter.get("/profile", protect, getUserProfile);

// List all users (Admin only)
userRouter.get("/list", protect, admin, listUsers);

// Remove user (Admin only)
userRouter.post("/remove", protect, admin, removeUser);

export default userRouter;
