import { User } from "../models/User.js";
import { verifyCleanupWithAI } from "../utils/aiVerify.js";

export const handleCleanupUpload = async (req, res) => {
  try {
    const userId = req.user._id;
    const beforeUrl = req.files?.before?.[0]?.path;
    const afterUrl = req.files?.after?.[0]?.path;

    if (!beforeUrl || !afterUrl) {
      return res.status(400).json({ message: "Both images (before & after) required." });
    }

    // 🧠 Run AI verification
    const aiResult = await verifyCleanupWithAI(beforeUrl, afterUrl);

    // Update user points if verified
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (aiResult.verified) {
      user.points = (user.points || 0) + Math.round(aiResult.cleanup_score / 10);
    }

    // Optional: Store cleanup submission info
    if (!user.cleanupSubmissions) user.cleanupSubmissions = [];
    user.cleanupSubmissions.push({
      beforeImage: beforeUrl,
      afterImage: afterUrl,
      verified: aiResult.verified,
      score: aiResult.cleanup_score,
    });

    await user.save();

    res.json({
      success: true,
      message: aiResult.verified ? "Cleanup verified!" : "Cleanup not verified",
      aiResult,
      points: user.points,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
