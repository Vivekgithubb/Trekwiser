import mongoose, { Schema } from "mongoose";

const communityPostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Who posted
  trek: { type: Schema.Types.ObjectId, ref: "Trek" }, // Optional: link to a trek
  content: { type: String, required: true }, // User’s review or thoughts
  // comments: [
  //   {
  //     user: { type: Schema.Types.ObjectId, ref: "User" }, // Who commented
  //     text: { type: String, required: true },
  //     createdAt: { type: Date, default: Date.now }
  //   }
  // ]
  
}, { timestamps: true });

export const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);
