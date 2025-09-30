import mongoose, { Schema } from "mongoose";

const communityPostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Who posted
    title: { type: String, required: true }, // Trek title
    location: { type: String, required: true }, // Trek location
    description: { type: String, required: true }, // Trek description
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Difficult"],
      required: true,
    }, // Trek difficulty
    images: [
      {
        url: { type: String, required: true },
      },
    ],
    likes: { type: Number, default: 0 },
    // comments: [
    //   {
    //     user: { type: Schema.Types.ObjectId, ref: "User" }, // Who commented
    //     text: { type: String, required: true },
    //     createdAt: { type: Date, default: Date.now }
    //   }
    // ]
  },
  { timestamps: true }
);

export const CommunityPost = mongoose.model(
  "CommunityPost",
  communityPostSchema
);
