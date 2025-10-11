import express from "express";
import { getUploadSignature, handleCleanupUpload } from "../controllers/cleanupController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

// frontend obtains this signature to upload to Cloudinary directly
router.get("/signature", verifyJWT, getUploadSignature);

// frontend posts the Cloudinary URLs (no files)
router.post("/upload", verifyJWT, handleCleanupUpload);

export default router;
