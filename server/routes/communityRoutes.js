import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
} from "../controllers/communityControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadPostImage } from "../middleware/uploadCloudinary.js";

const router = express.Router();

// ✅ Public
router.get("/", getAllPosts);

// ✅ Protected
router.post("/", authMiddleware, createPost);
router.get("/my-posts", authMiddleware, getUserPosts);

router.post(
  "/upload-post-image",
  authMiddleware,
  uploadPostImage.array("images", 10),
  (req, res) => {
    res.json({
      message: "Post images uploaded",
      urls: req.files.map((f) => f.path),
    });
  }
);
// console.log(req.file);   // for single upload
// console.log(req.files);  // for multiple uploads

export default router;
