import Loading from "@/components/Loading";
import LoginPlease from "@/components/LoginPlease";
import { useLogout } from "@/hooks/LogoutHook";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CameraIcon, EyeIcon, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

export default function ProfilePage() {
  const { data: user, isLoading, error } = useCurrentUser();
  const { logout, isLoading: isLoggingout } = useLogout();
  const [uploading, setuploading] = useState(false);
  const [progress, setprogress] = useState(0);
  const [desc, setDesc] = useState(user?.description);

  const [file, setfile] = useState(null);
  const [preview, setpreview] = useState(null);

  const queryClient = useQueryClient();

  if (isLoading) return <Loading />;
  if (error) return <LoginPlease />;

  console.log(user);
  console.log(desc);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/changeDesc`,
      { desc, id: user._id },
      { withCredentials: true }
    );
    queryClient.invalidateQueries(["currentUser"]);
    console.log(desc);
  };
  const handleChange = (e) => {
    setfile(e.target.files[0]);
    setpreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    if (!file) return;
    // setprogress(0);
    setuploading(true);
    const { data: signatureData } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/users/cloudinary-signature`,
      { withCredentials: true }
    );
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signatureData.api_key);
    formData.append("timestamp", signatureData.timestamp);
    formData.append("signature", signatureData.signature);
    formData.append("folder", "profile-pics");

    try {
      //upload directly to cloud
      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setprogress(percentCompleted);
          },
        }
      );
      // 3. Save Cloudinary URL in your DB
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/save-avatar`,
        {
          url: cloudRes.data.secure_url,
          public_id: cloudRes.data.public_id,
        },
        { withCredentials: true }
      );
      setfile(null);
      setpreview(null);
      toast.success("Updated profile");
      queryClient.invalidateQueries(["currentUser"]);
    } catch (err) {
      console.log(err);
    } finally {
      setprogress(0);
      setuploading(false);
    }
  };

  return (
    <div className="max-w-md  mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-blue-100 pt-20 text-center p-6">
        <div className="w-full h-fit flex flex-row justify-between">
          <button
            className="bg-red-600 font-figtree px-2 py-1 text-xs text-white rounded-2xl"
            onClick={() => logout()}
            disabled={isLoggingout}
          >
            Logout
          </button>
        </div>
        <div>
          <img
            src={user.avatar.url} // replace with your profile image path
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-4 object-cover border-white shadow "
          />
        </div>

        <h2 className="mt-3 font-semibold text-3xl">{user.username}</h2>
        <p className="text-sm mt-2 text-gray-700 italic">
          "{user.description}"
        </p>
      </div>

      {/* Add Post */}
      <div className="px-6 py-4">
        <input
          className="hidden bg-blue-200 mb-3 w-full py-2 text-center font-figtree text-zinc-800 rounded-2xl"
          // value="Change Profile Pic"
          type="file"
          accept="image/*"
          id="profile-pic"
          onChange={handleChange}
        />
        <label
          htmlFor="profile-pic"
          className="cursor-pointer relative w-full bg-blue-200 mb-3  hover:bg-blue-400 text-zinc-800 font-medium py-2 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition"
        >
          {/* <CameraIcon className="w-5 h-5" /> */}
          <span>Change profile picture</span>
        </label>
        {preview && (
          <div className="mt-3 flex flex-col items-center">
            <img
              src={preview}
              alt="preview"
              className={`w-24 h-24 rounded-full shadow ${
                uploading ? "opacity-50" : ""
              }`}
            />
            {!uploading && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-4 mb-4 bg-zinc-800 text-white px-4 py-1 rounded-lg hover:bg-green-600"
              >
                {uploading ? "Uploading" : "Upload now"}
              </button>
            )}
            {uploading && (
              <div className="w-full bg-gray-200 rounded mt-2 h-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-3 rounded"
                  style={{ width: `${progress}%`, transition: "width 2.8s" }}
                ></div>
              </div>
            )}
            {uploading && (
              <div className="spinner mt-2 mb-4">
                <svg
                  className="animate-spin h-5 w-5 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        )}
        <button className="relative w-full bg-blue-300 hover:bg-blue-200 text-gray-700 font-medium py-2 px-4 rounded-xl shadow-sm transition">
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <CameraIcon className="w-5 h-5" />
          </span>
          <Link
            to={`/profile/addpost/${user._id}`}
            className="block text-center"
          >
            Add Post
          </Link>
        </button>
        <button className="relative w-full bg-blue-400 hover:bg-blue-200 mt-3 text-white font-medium py-2 px-4 rounded-xl shadow-sm transition">
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <EyeIcon className="w-5 h-5" />
          </span>
          <span className="block text-center">View posts</span>
        </button>
      </div>

      {/* Form */}

      <div className="px-6 pb-6">
        <h3 className="text-[17px] italic text-gray-500 mb-3">
          Personal details
        </h3>
        <form
          className="space-y-3 font-figtree text-[12px] font-light"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            disabled
            value={user.email}
            className="w-full p-2 rounded-md text-gray-600 bg-zinc-200 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone number"
            disabled
            value={user.phonenumber}
            className="w-full p-2 rounded-md text-gray-600 bg-zinc-200 focus:outline-none"
          />
          <input
            type="text"
            placeholder="City"
            disabled
            value={user.city}
            className="w-full p-2 rounded-md text-gray-600 bg-zinc-200 focus:outline-none"
          />
          <textarea
            placeholder="Description"
            rows="4"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 rounded-md bg-blue-100 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md shadow transition"
          >
            Change Description
          </button>
        </form>
      </div>
    </div>
  );
}
