import express from "express";
import { createPost, getAllPosts, getUserPosts } from "../controllers/communityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public
router.get("/", getAllPosts);

// ✅ Protected
router.post("/", authMiddleware, createPost);
router.get("/my-posts", authMiddleware, getUserPosts);

export default router;
