import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
import userRoutes from "./routes/userRoutes";
import trekRoutes from "./routes/trekRoutes";
import communityRoutes from "./routes/communityRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Your frontend's URL
    credentials: true, // ✅ Allow cookies
  })
);

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(3000, () => {
  console.log("backend is running");
});

app.use("/api/users", userRoutes);
app.use("/api/treks", trekRoutes);
app.use("/api/community", communityRoutes);
