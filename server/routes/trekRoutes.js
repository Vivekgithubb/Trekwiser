import express from "express";
import {
  getAllTreks,
  getGallery,
  getPopularTreks,
  getTrekById,
} from "../controllers/trekControllers.js";

const router = express.Router();

// ✅ Public
router.get("/gallery", getGallery); // gallery trek
router.get("/popular", getPopularTreks); // popular trek details
router.get("/", getAllTreks); // list all treks
router.get("/:id", getTrekById); // trek details

export default router;
