import express from "express";
import {
  addLike,
  createPost,
  getAllPosts,
  getUserPosts,
  removeLike,
} from "../controllers/communityControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadPostImage } from "../middleware/uploadCloudinary.js";
import { CommunityPost } from "../models/Community.js";
import { addpost } from "../controllers/communityControllers.js";

const router = express.Router();

// ✅ Public
router.get("/", authMiddleware, getAllPosts);

// ✅ Protected
router.post("/", authMiddleware, createPost);
router.get("/my-posts", authMiddleware, getUserPosts);
router.post("/posts", authMiddleware, addpost);
router.post("/like/:id", authMiddleware, addLike);
router.post("/unlike/:id", authMiddleware, removeLike);

router.post(
  "/upload-post",
  authMiddleware,
  uploadPostImage.array("images", 10),
  async (req, res) => {
    try {
      const { title, location, description, difficulty } = req.body;

      //cloudinary gives path automatically = Secure URL
      const images = req.files.map((file) => ({
        url: file.path,
      }));

      const post = await CommunityPost.create({
        user: req.user._id,
        title,
        location,
        difficulty,
        description,
        images,
      });
      res.status(200).json({
        message: "Post images uploaded",
        urls: req.files.map((f) => f.path),
        post,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export default router;
