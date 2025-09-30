import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
} from "../controllers/communityControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadPostImage } from "../middleware/uploadCloudinary.js";
import { CommunityPost } from "../models/Community.js";
import { addpost } from "../controllers/communityControllers.js";

const router = express.Router();

// ✅ Public
router.get("/", getAllPosts);

// ✅ Protected
router.post("/", authMiddleware, createPost);
router.get("/my-posts", authMiddleware, getUserPosts);
router.post("/posts", authMiddleware, addpost);

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

// Like a post
router.post("/posts/:id/like", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Increment likes
    const post = await CommunityPost.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, // increment likes
      { new: true }           // return updated document
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Like added", likes: post.likes });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like post" });
  }
});

console.log(req.file);   // for single upload
console.log(req.files);  // for multiple uploads


export default router;
