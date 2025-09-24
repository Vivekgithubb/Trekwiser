import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import your route files
import userRoutes from "./routes/userRoutes.js";
import trekRoutes from "./routes/trekRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";

// dotenv.config();
dotenv.config({
  path: "../config.env",
});

// console.log("My secret is:", process.env.ACCESS_TOKEN_SECRET);

const app = express();

// Core Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for laptop
      "http://127.0.0.1:5173", // just in case
      "http://192.168.0.106:5173", // your LAN IP for phone
    ], // ✅ Your frontend's URL
    credentials: true, // ✅ Allow cookies
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// // API Routes
app.use("/api/users", userRoutes);
app.use("/api/treks", trekRoutes);
app.use("/api/community", communityRoutes);
app.get("/api/test", (req, res) => {
  res.send("Backend is working!");
});
// Start the server
app.listen(3000, "0.0.0.0", () => {
  console.log("Backend is running on port 3000");
});
