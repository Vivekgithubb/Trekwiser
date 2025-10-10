import { Heart } from "lucide-react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardContent } from "@/components/ui/card";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function TrekDetailCard({
  id,
  image = [],
  title,
  location,
  author,
  difficulty,
  description,
  avatar,
  likes,
  isliked,
}) {
  // Difficulty colors
  const difficultyColors = {
    Easy: "bg-green-600",
    Moderate: "bg-blue-600",
    Difficult: "bg-red-600",
  };

  const [liked, setLiked] = useState(isliked);
  const [Likes, setLikes] = useState(likes);

  const handleLike = async () => {
    const newLike = !liked;

    // Optimistic update
    setLiked(newLike);
    setLikes((prevLikes) => (newLike ? prevLikes + 1 : prevLikes - 1));

    const url = newLike
      ? `${import.meta.env.VITE_API_URL}/api/community/like/${id}`
      : `${import.meta.env.VITE_API_URL}/api/community/unlike/${id}`;

    try {
      const { data } = await axios.post(url, {}, { withCredentials: true });
      console.log("✅ Response data:", data);
      console.log("🟢 Like operation successful");
      setLiked(data.likesCount);
      setLiked(data.liked);
    } catch (error) {
      console.error("❌ Error in like operation:", error);
      console.error("❌ Error message:", error.message);

      // Revert on error
      setLiked(!newLike);
      setLikes((prevLikes) => (newLike ? prevLikes - 1 : prevLikes + 1));
    }
  };

  return (
    <div className="min-w-[310px] mt-2 max-w-[340px] mx-auto relative">
      {/* Like button overlay */}
      <div className="absolute top-3 right-3 z-50 flex flex-col items-center">
        <button onClick={handleLike}>
          <Heart
            color={liked ? "red" : "white"}
            fill={liked ? "red" : "white"}
            className="w-6 h-6 cursor-pointer"
          />
        </button>

        <span className="text-white text-xs italic mt-1">{Likes}</span>
      </div>

      <Card className="overflow-hidden my-4 rounded-2xl shadow-lg font-figtree">
        <div className="relative">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="h-[220px]" // set height for visible slides
          >
            {image.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`${title}-${i}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Optional overlay title/location on image */}
          <div className="absolute bottom-3 left-3 z-10 text-white">
            <h2 className="text-lg font-bold drop-shadow-lg">{title}</h2>
            <p className="text-xs drop-shadow-md">Location: {location}</p>
          </div>
        </div>

        {/* Card content */}
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-row gap-2 justify-center items-center">
              <img
                src={avatar}
                className="h-[30px] w-[30px] object-cover rounded-4xl"
              />
              <span className="font-semibold text-[16px] text-black">
                {author}
              </span>
            </div>

            <span
              className={`text-[8px] font-semibold px-2 py-1 rounded-lg text-white ${difficultyColors[difficulty]}`}
            >
              {difficulty}
            </span>
          </div>
          <p className="text-sm text-gray-700 mt-2 italic font-light">
            "{description}"
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
