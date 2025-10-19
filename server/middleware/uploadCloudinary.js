import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Config/Cloudinary.js"; // import Cloudinary instance

// Profile pics
const profilePicStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile-pics",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Post images
const postImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "post-images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Cleanup images
const cleanupStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "cleanup-images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const uploadProfilePic = multer({ storage: profilePicStorage });
export const uploadPostImage = multer({ storage: postImageStorage });
export const uploadCleanupImages = multer({ storage: cleanupStorage });
