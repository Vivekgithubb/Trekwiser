import express from "express";
import { registerUser, loginUser, getProfile, saveTrek } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected
router.get("/profile", authMiddleware, getProfile);
router.post("/save-trek/:trekId", authMiddleware, saveTrek);

export default router;
