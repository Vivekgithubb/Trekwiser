import express from "express";
import { handleCleanupUpload } from "../controllers/cleanupController.js";
import { uploadCleanupImages } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  verifyJWT,
  uploadCleanupImages.fields([{ name: "before" }, { name: "after" }]),
  handleCleanupUpload
);

export default router;
