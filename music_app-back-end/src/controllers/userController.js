// src/controllers/userController.js

import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User registration
const registerUser = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = await userModel.create({
      username,
      email,
      password,
      isAdmin: isAdmin || false,
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({ success: false, message: "Failed to register user" });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.json({ success: false, message: "Failed to login" });
  }
};

// Get logged-in user's profile
const getUserProfile = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (user) {
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error listing users:", error);
    res.status(500).json({ success: false, message: "Failed to list users." });
  }
};
// Remove a user by ID (admin only)
const removeUser = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required." });
  }

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    await userModel.findByIdAndDelete(id);
    res.json({ success: true, message: "User removed successfully." });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ success: false, message: "Failed to remove user." });
  }
};

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  listUsers,
  removeUser,
  generateToken,
};
