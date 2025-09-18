import mongoose, { Schema } from "mongoose";

const trekSchema = new Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Moderate", "Hard"], required: true },
  season: { type: String },
  description: { type: String },
  images: [{ type: String }],
  highlights: [{ 
    type: String, 
    enum: ["Best Scenery", "Best Viewpoint", "shortest", "beginner friendly", "challenging"] 
  }],
  availability: { type: Boolean, default: true }

}, { timestamps: true });

export const Trek = mongoose.model("Trek", trekSchema);
