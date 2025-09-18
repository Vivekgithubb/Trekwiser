import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const AddPost = ({ user }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [images, setImages] = useState([]);

  // Handle multiple image upload
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare form data
    const postData = new FormData();
    postData.append("title", title);
    postData.append("location", location);
    postData.append("description", description);
    postData.append("difficulty", difficulty);
    postData.append("userId", user.id); // userId comes from backend auth

    images.forEach((img) => {
      postData.append("images", img);
    });

    // Send to backend
    fetch("/api/posts", {
      method: "POST",
      body: postData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Post created:", data);
      });
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
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
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

          <Button type="submit" className="w-full mt-4">
            Post
          </Button>
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
