import { CommunityPost } from "../models/CommunityPost.js";

// ✅ Create post
export const createPost = async (req, res) => {
  try {
    const { trek, content } = req.body;

    const post = await CommunityPost.create({
      user: req.user.id,
      trek,
      content,
    });

    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .populate("user", "username")
      .populate("trek", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get logged-in user's posts
export const getUserPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find({ user: req.user.id })
      .populate("trek", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
