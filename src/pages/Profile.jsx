import { CameraIcon, Plus } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-md  mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-blue-100 pt-20 text-center p-6">
        <img
          src="/home0.jpg" // replace with your profile image path
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow"
        />
        <h2 className="mt-3 font-semibold text-lg">D Vivek Pai</h2>
        <p className="text-sm text-gray-700 italic">
          "Live life young, Live life free.
          <br />
          Wander around and make it count"
        </p>
      </div>

      {/* Add Post */}
      <div className="px-6 py-4">
        <button className="relative w-full bg-blue-100 hover:bg-blue-200 text-gray-700 font-medium py-2 px-4 rounded-xl shadow-sm transition">
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <CameraIcon className="w-5 h-5" />
          </span>
          <span className="block text-center">Add Post</span>
        </button>
      </div>

      {/* Form */}
      <div className="px-6 pb-6">
        <h3 className="text-[17px] italic text-gray-500 mb-3">
          Personal details
        </h3>
        <form className="space-y-3 font-figtree text-[12px] font-light">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 rounded-md bg-blue-100 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 rounded-md bg-blue-100 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded-md bg-blue-100 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone number"
            className="w-full p-2 rounded-md bg-blue-100 focus:outline-none"
          />
          <input
            type="text"
            placeholder="City"
            className="w-full p-2 rounded-md bg-blue-100 focus:outline-none"
          />
          <textarea
            placeholder="Description"
            rows="4"
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
