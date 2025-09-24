import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
// ✅ Register new user
export const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      passwordConf,
      city,
      phonenumber,
      description,
    } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
      passwordConf,
      city,
      phonenumber,
      description,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    // Handle duplicate key error (E11000)
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Username or email already exists1" });
    }

    // Handle mongoose validation error
    if (err.name === "ValidationError") {
      return res.status(400).json({
        error: err,
        message: "Validation failed",
      });
    }

    // Default - other errors
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// ✅ Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials1" });

    // check password
    const isMatch = await user.isPasswordCorrect(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials2" });

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      // expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all user
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);

    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
    res.status(200).json({
      status: "sucess",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Save Trek (bookmark)
export const saveTrek = async (req, res) => {
  try {
    const { trekId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user.savedTreks.includes(trekId)) {
      user.savedTreks.push(trekId);
      await user.save();
    }

    res.json({ message: "Trek saved", savedTreks: user.savedTreks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
