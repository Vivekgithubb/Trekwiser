// import { Heart, HeartHandshake, HeartIcon, HeartPulse } from "lucide-react";
// import { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules"; // import modules
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// // Import Swiper styles
// import "swiper/css";
// import { Card, CardContent } from "@/components/ui/card";
// export default function TrekDetailCard({
//   image,
//   title,
//   location,
//   author,
//   difficulty,
//   description,
// }) {
//   // Difficulty colors
//   const difficultyColors = {
//     Easy: "bg-green-600",
//     Moderate: "bg-blue-600",
//     Difficult: "bg-red-600",
//   };
//   // SwiperCore.use([Navigation, Pagination]);
//   const [like, setlike] = useState(false);
//   console.log(image); // Should be an array of image URLs

//   return (
//     <div className="min-w-[310px] mt-2 max-w-[340px] h-[320px] mx-auto rounded-xl shadow-md overflow-hidden   bg-white">
//       {/* <div className="relative">
//         <Swiper
//           spaceBetween={10}
//           slidesPerView={1}
//           pagination={{ clickable: true }}
//           modules={[Navigation, Pagination]} // <--- pass modules here
//         >
//           {image?.map((img, i) => (
//             <SwiperSlide key={i}>
//               <img
//                 src={img}
//                 alt={`${title}-${i}`}
//                 className="w-full h-[170px] object-cover rounded-t-xl"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <div className="absolute top-3 left-3 text-white z-10">
//           <h2 className="text-[20px] font-bold">{title}</h2>
//           <p className="text-xs">Location: {location}</p>
//         </div>
//         <div className="absolute top-3 right-3 z-10">
//           <Heart
//             onClick={() => setlike(!like)}
//             color={like ? "red" : "white"}
//             fill={like ? "red" : "white"}
//           />
//           <h4 className="font-figtree text-[10px] text-white italic">12345</h4>
//         </div>
//       </div>

//       <div className="p-1 ml-2 font-figtree">

//         <div className="flex justify-between items-center mb-2">
//           <p className="text-[15px] font-semibold">{author}</p>
//           <span
//             className={`text-[8px] font-semibold px-2 py-1 rounded-lg text-white ${difficultyColors[difficulty]}`}
//           >
//             {difficulty}
//           </span>
//         </div>

//         <p className="text-[10px] italic font-figtree text-gray-700 leading-relaxed">
//           "{description}""
//         </p>
//       </div> */}
//       <div className="absolute top-3 right-3 z-50">
//         <Heart
//           onClick={() => setlike(!like)}
//           color={like ? "red" : "white"}
//           fill={like ? "red" : "white"}
//         />
//         <h4 className="font-figtree text-[10px] text-white italic">12345</h4>
//       </div>
//       <Card className="overflow-hidden h-[400px] bg-red-200 rounded-2xl shadow-lg">
//         <Swiper
//           spaceBetween={10}
//           slidesPerView={1}
//           pagination={{ clickable: true }}
//           modules={[Navigation, Pagination]}
//           className="h-[120px]"
//         >
//           {image?.map((img, i) => (
//             <SwiperSlide key={i}>
//               <img
//                 src={img}
//                 alt={`${title}-${i}`}
//                 className="w-full h-full object-cover"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <CardContent className="p-4">
//           <h2 className="text-xl font-bold">{title}</h2>
//           <p className="text-gray-500 text-sm">Location: {location}</p>

//           <div className="flex items-center justify-between mt-2">
//             <span className="font-semibold text-black">{author}</span>
//             <span
//               className={`text-[8px] font-semibold px-2 py-1 rounded-lg text-white ${difficultyColors[difficulty]}`}
//             >
//               {difficulty}
//             </span>
//           </div>

//           <p className="text-sm text-gray-700 mt-2 italic">{description}</p>

//           {/* <div className="flex items-center mt-4 text-gray-500">
//             <Heart className="w-5 h-5 mr-1" /> 0
//           </div> */}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { Heart } from "lucide-react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardContent } from "@/components/ui/card";

export default function TrekDetailCard({
  image = [],
  title,
  location,
  author,
  difficulty,
  description,
  avatar,
}) {
  const [like, setLike] = useState(false);
  console.log(avatar);

  // Difficulty colors
  const difficultyColors = {
    Easy: "bg-green-600",
    Moderate: "bg-blue-600",
    Difficult: "bg-red-600",
  };

  return (
    <div className="min-w-[310px] mt-2 max-w-[340px] mx-auto relative">
      {/* Like button overlay */}
      <div className="absolute top-3 right-3 z-50 flex flex-col items-center">
        <Heart
          onClick={() => setLike(!like)}
          color={like ? "red" : "white"}
          fill={like ? "red" : "white"}
          className="w-6 h-6 cursor-pointer"
        />
        <span className="text-white text-xs italic mt-1">12345</span>
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
          <p className="text-sm text-gray-700 mt-2 italic">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
