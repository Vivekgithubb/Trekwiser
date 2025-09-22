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

export const getPopularTreks = async (req, res) => {
  try {
    const trek = await Trek.find({ highlights: "Best Scenery" });
    if (!trek || trek.length === 0)
      return res.status(500).json({
        status: "error",
        message: "No treks found",
      });
    return res.status(200).json({
      status: "success",
      data: {
        treks: trek,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err,
    });
  }
};

export const getGallery = async (req, res) => {
  try {
    const images = (await Trek.find({}, { images: 1, _id: 0 })).flatMap(
      (trek) => trek.images
    );
    if (!images)
      return res.status(400).json({
        satus: "NO image",
      });
    res.status(200).json({
      satus: "Success",
      data: {
        images,
      },
    });
    console.log(images);
  } catch (err) {
    console.log(err);
  }
};
