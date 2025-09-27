import { v2 as cloudinary } from "cloudinary";

cloudinary.config(); // picks up CLOUDINARY_URL from .env

export default cloudinary;
