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
    const userId = req.user?._id;
    console.log(userId);
    const result = posts.map((post) => ({
      ...post.toObject(),
      likedByUser: req.user?._id ? post.likes.includes(req.user?._id) : false,
    }));
    res.json(result);
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

export const addLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const newLiked = await CommunityPost.findById(id);
    if (!newLiked) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!newLiked.likes.includes(userId)) {
      newLiked.likes.push(userId);
      await newLiked.save();
    }
    res.json({ liked: true, likesCount: newLiked.likes.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
export const removeLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const newLiked = await CommunityPost.findById(id);
    if (!newLiked) {
      return res.status(404).json({ message: "Post not found" });
    }

    newLiked.likes = newLiked.likes.filter(
      (id) => id.toString() !== userId.toString()
    );
    await newLiked.save();
    res.json({ liked: false, likesCount: newLiked.likes.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
