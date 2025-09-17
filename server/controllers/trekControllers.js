import { Trek } from "../models/Trek.js";

// ✅ Get all treks
export const getAllTreks = async (req, res) => {
  try {
    const treks = await Trek.find();
    res.json(treks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get single trek by ID
export const getTrekById = async (req, res) => {
  try {
    const trek = await Trek.findById(req.params.id);
    if (!trek) return res.status(404).json({ message: "Trek not found" });
    res.json(trek);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
