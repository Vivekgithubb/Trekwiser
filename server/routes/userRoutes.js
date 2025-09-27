import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  saveTrek,
  getUsers,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadProfilePic } from "../middleware/uploadCloudinary.js";

const router = express.Router();

// ✅ Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected
router.get("/", getUsers);
router.get("/profile", authMiddleware, getProfile);
router.post("/save-trek/:trekId", authMiddleware, saveTrek);

router.post(
  "/upload-profile-pic",
  authMiddleware,
  uploadProfilePic.single("avatar"),
  (req, res) => {
    res.json({ message: "Profile pic uploaded", url: req.file.path });
  }
);
console.log(req.file);   // for single upload
console.log(req.files);  // for multiple uploads


export default router;
