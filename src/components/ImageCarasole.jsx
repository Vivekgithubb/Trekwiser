// Import React & Swiper components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper modules individually
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = ["/home1.jpg", "/home2.jpg", "/home7.jpg"];

export default function ImageCarousel() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation // prev/next buttons
        // pagination={{ clickable: true }} // dots
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true} // infinite loop
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`slide ${index}`}
              className="w-full h-[300px]  object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
