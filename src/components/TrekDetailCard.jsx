import { Heart, HeartHandshake, HeartIcon, HeartPulse } from "lucide-react";
import { useState } from "react";

export default function TrekDetailCard({
  image = "/home2.jpg",
  title = "KUDREMUKHA",
  location = "Kudremukha",
  author = "Chaitanya Kamath",
  difficulty = "MEDIUM",
  description = `“Kudremukha is hands down one of the most breathtaking treks in Karnataka. 
  The rolling green hills, endless grasslands, and mist-covered peaks truly make you feel like you’re walking through a painting. 
  The trail itself is long but manageable if you start early — about 9–10 hours to complete. 
  The best part is the constant change in scenery: dense shola forests, clear streams, and the iconic horse-face peak view at the summit.”`,
}) {
  // Difficulty colors
  const difficultyColors = {
    EASY: "bg-green-600",
    MEDIUM: "bg-blue-600",
    HARD: "bg-red-600",
  };

  const [like, setlike] = useState(false);

  return (
    <div className="min-w-[310px] mt-2 max-w-[340px] h-[290px] mx-auto rounded-xl shadow-md overflow-hidden border border-gray-400 bg-white">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[150px] object-cover rounded-t-xl"
        />
        <div className="absolute top-3 left-3 text-white">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-xs">Location: {location}</p>
        </div>
        <div className="absolute top-3 right-3">
          <Heart
            onClick={() => setlike(!like)}
            color={like ? "red" : "white"}
            fill={like ? "red" : "white"}
          />
          <h4 className="font-figtree text-[10px] text-white italic">12345</h4>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-1 font-figtree">
        {/* Author + Difficulty */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-[12px] font-semibold">{author}</p>
          <span
            className={`text-[6px] font-semibold px-2 py-1 rounded-lg text-white ${difficultyColors[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-[9px] italic font-figtree text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
