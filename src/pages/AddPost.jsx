import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddPost = ({ user }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [images, setImages] = useState([]);
  const [progress, setprogress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Handle multiple image upload
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    // Prepare form data
    const postData = new FormData();
    postData.append("title", title);
    postData.append("location", location);
    postData.append("description", description);
    postData.append("difficulty", difficulty);
    // postData.append("userId", user.id); // userId comes from backend auth
    try {
      // 1. Get Cloudinary signature from backend
      const { data: sig } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/cloudinary-signature-post`,
        { withCredentials: true }
      );
      console.log(sig);

      // 2. Upload each image to Cloudinary
      const uploadedUrls = [];
      for (const img of images) {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("api_key", sig.api_key);
        formData.append("timestamp", sig.timestamp);
        formData.append("signature", sig.signature);
        formData.append("folder", "images-post");

        const cloudRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${sig.cloud_name}/image/upload`,
          formData,
          {
            onUploadProgress: (evt) => {
              const percent = Math.round((evt.loaded * 100) / evt.total);
              setprogress(percent);
            },
          }
        );

        uploadedUrls.push(cloudRes.data.secure_url);
      }

      //3 send post data + image url to backend
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/community/posts`,
        {
          title,
          location,
          description,
          difficulty,
          images: uploadedUrls,
        },
        { withCredentials: true }
      );
      console.log("Done uploading posts");
      toast.success("Post added successfully!");
      navigate(-1);
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
      setprogress(0);
    }
  };

  return (
    <div className="h-screen w-full ">
      <div className="max-w-3xl font-figtree mx-auto pt-15 py-8 px-4">
        <h2 className="text-2xl mt-10  font-bold mb-6">Create a New Post</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 text-[12px] rounded-2xl shadow-md"
        >
          <input
            type="text"
            placeholder="Trek Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full border rounded-lg p-2"
            required
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>

          {/* Multiple image upload */}
          <div className="flex flex-col items-start gap-2">
            <label className="text-sm font-medium mb-2">Upload Photos</label>
            <div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer  bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
              >
                Choose Photos
              </label>
            </div>
          </div>
          {/* Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className={`w-full mt-4 text-white py-1 font-figtree rounded-lg text-[15px] ${
              uploading ? "bg-zinc-600" : "bg-black"
            }`}
            disabled={uploading}
          >
            Post
          </button>
          {uploading && (
            <div className="w-full bg-gray-200 rounded mt-2 h-3 overflow-hidden">
              <div
                className="bg-blue-500 h-3 rounded"
                style={{ width: `${progress}%`, transition: "width 2.6s" }}
              ></div>
            </div>
          )}
        </form>

        {/* Live Preview */}
        {(title || description || images.length > 0) && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
            <Card className="overflow-hidden rounded-2xl shadow-lg">
              {/* Show first image as cover */}
              {images.length > 0 && (
                <img
                  src={URL.createObjectURL(images[0])}
                  alt="cover"
                  className="w-full h-56 object-cover"
                />
              )}
              <CardContent className="p-4">
                <h2 className="text-xl font-bold">{title || "Trek Title"}</h2>
                <p className="text-gray-500 text-sm">Location: {location}</p>

                <div className="flex items-center justify-between mt-2">
                  <span className="font-semibold">
                    {user?.name || "User Name"}
                  </span>
                  <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                    {difficulty}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mt-2 italic">
                  {description || "Your description will appear here."}
                </p>

                <div className="flex items-center mt-4 text-gray-500">
                  <Heart className="w-5 h-5 mr-1" /> 0
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
