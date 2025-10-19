import express from "express";
import { handleCleanupUpload } from "../controllers/cleanupController.js";
import { uploadCleanupImages } from "../middleware/uploadCloudinary.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  uploadCleanupImages.fields([{ name: "before" }, { name: "after" }]),
  handleCleanupUpload
);

export default router;
