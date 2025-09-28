import cloudinary from "../Config/Cloudinary.js"; // import Cloudinary instance
console.log(
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

const result = await cloudinary.uploader.upload("/home0.jpg", {
  folder: "profile-pics",
});
console.log(result.secure_url);
