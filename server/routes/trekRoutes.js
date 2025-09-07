import express from "express";
import { getAllTreks, getTrekById } from "../controllers/trekController.js";

const router = express.Router();

// ✅ Public
router.get("/", getAllTreks);          // list all treks
router.get("/:id", getTrekById);       // trek details

export default router;
