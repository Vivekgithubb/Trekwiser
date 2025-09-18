import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import your route files
import userRoutes from "./routes/userRoutes.js";
import trekRoutes from "./routes/trekRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";

dotenv.config({
  path: '../config.env'
});

console.log("My secret is:", process.env.ACCESS_TOKEN_SECRET);

const app = express();

// Core Middleware
app.use(cors({
  origin: "http://localhost:5173", // ✅ Your frontend's URL
  credentials: true, // ✅ Allow cookies
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.DATABASE)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/treks", trekRoutes);
app.use("/api/community", communityRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Backend is running on port 3000");
});