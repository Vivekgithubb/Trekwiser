import { useLogout } from "@/hooks/LogoutHook";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CameraIcon, EyeIcon, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function ProfilePage() {
  const { data: user, isLoading, error } = useCurrentUser();
  const { logout, isLoading: isLoggingout } = useLogout();
  const [desc, setDesc] = useState(user?.description);
  const queryClient = useQueryClient();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
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

  return (
    <div className="max-w-md  mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-blue-100 pt-20 text-center p-6">
        <div className="w-full h-fit text-right">
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
            src="/home0.jpg" // replace with your profile image path
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow "
          />
        </div>

        <h2 className="mt-3 font-semibold text-lg">{user.username}</h2>
        <p className="text-sm text-gray-700 italic">"{user.description}"</p>
      </div>

      {/* Add Post */}
      <div className="px-6 py-4">
        <button className="relative w-full bg-blue-100 hover:bg-blue-200 text-gray-700 font-medium py-2 px-4 rounded-xl shadow-sm transition">
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
          <span className="block text-center">View Saved Treks</span>
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
