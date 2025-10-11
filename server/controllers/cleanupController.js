import crypto from "crypto";
import { verifyCleanupWithAI } from "../utils/aiVerify.js";
import { User } from "../models/User.js";

// generate a signature + timestamp for Cloudinary direct upload
export const getUploadSignature = (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    // Cloudinary signature: sha1("timestamp=<timestamp><API_SECRET>")
    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
      .digest("hex");

    res.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signature generation failed" });
  }
};

// backend receives the two Cloudinary URLs and runs AI verification
export const handleCleanupUpload = async (req, res) => {
  try {
    const userId = req.user._id;
    const { beforeUrl, afterUrl } = req.body;

    if (!beforeUrl || !afterUrl) {
      return res.status(400).json({ message: "Both beforeUrl and afterUrl required" });
    }

    // call your AI pipeline (must accept remote URLs)
    const aiResult = await verifyCleanupWithAI(beforeUrl, afterUrl);
    // aiResult expected shape:
    // { same_location, trash_before, trash_after, cleanup_score, verified }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // award points (example mapping: 1 point per 10% cleanup_score)
    let pointsEarned = 0;
    if (aiResult.verified) {
      pointsEarned = Math.max(0, Math.round(aiResult.cleanup_score / 10));
      user.points = (user.points || 0) + pointsEarned;
    }

    user.cleanupSubmissions = user.cleanupSubmissions || [];
    user.cleanupSubmissions.push({
      beforeImage: beforeUrl,
      afterImage: afterUrl,
      verified: !!aiResult.verified,
      score: aiResult.cleanup_score || 0,
    });

    await user.save();

    res.json({
      success: true,
      aiResult,
      points: user.points,
      pointsEarned,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
