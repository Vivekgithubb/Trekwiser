import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  saveTrek,
  getUsers,
  logout,
  changeDesc,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
// import authController from "server/controllers/authController.js";
import { User } from "../models/User.js";
import { uploadProfilePic } from "../middleware/uploadCloudinary.js";
import cloudinary from "../Config/Cloudinary.js";

const router = express.Router();

// ✅ Public
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(400).json({ error: "User not found" });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});
// ✅ Protected
router.get("/", getUsers);
router.post("/changeDesc", changeDesc);
router.get("/profile", authMiddleware, getProfile);
router.post("/save-trek/:trekId", authMiddleware, saveTrek);

router.post(
  "/upload-profile-pic",
  authMiddleware,
  uploadProfilePic.single("avatar"),
  async (req, res) => {
    try {
      console.log("req.user:", req.user);
      console.log("req.file:", req.file);
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      const user = await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            avatar: { url: req.file.path, public_id: req.file.filename },
          },
        }
      );
      if (!user) return res.status(404).json({ error: "User not found" });

      res.json({ message: "Profile pic uploaded", url: user.avatar });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);
// console.log(req.file); // for single upload
// console.log(req.files); // for multiple uploads

router.get("/cloudinary-signature", authMiddleware, (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "profile-pics" },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    signature,
    timestamp,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
});

router.post("/save-avatar", authMiddleware, async (req, res) => {
  try {
    const { url, public_id } = req.body;
    if (!url || !public_id)
      return res.status(400).json({ error: "Missing image info" });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { avatar: { url, public_id } } },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Avatar saved", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save avatar" });
  }
});

export default router;
