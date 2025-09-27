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

export default router;
