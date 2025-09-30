import { CommunityPost } from "../models/Community.js";

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
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get logged-in user's posts
export const getUserPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find({ user: req.user.id }).populate(
      "trek",
      "name"
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addpost = async (req, res) => {
  try {
    const { title, location, description, images, difficulty } = req.body;
    const post = new CommunityPost({
      title,
      location,
      description,
      images: images.map((url) => ({ url })),
      difficulty,
      user: req.user?._id,
    });
    await post.save();
    res.status(201).json({ status: "success", data: post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};
