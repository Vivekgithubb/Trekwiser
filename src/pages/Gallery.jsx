import GradualBlur from "@/components/GradualBlur";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  // Example trek images (from public folder)

  const [Treks, setTreks] = useState([]);
  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/treks/gallery`
        );
        setTreks(res.data.data.images);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTreks();
  }, []);
  return (
    <div className="h-screen bg-white mt-16 ">
      <h1 className="text-3xl font-bold text-center mb-3 font-logo">
        Trek Gallery
      </h1>

      <section
        style={{
          position: "relative",
          height: 700,
          minWidth: 340,
          //   width: 320,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            overflowY: "auto",
            padding: "",
          }}
        >
          <div
            className="
          grid 
          gap-4 
          grid-cols-2
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-6
          auto-rows-[150px] 
        "
          >
            {Treks.map((img, index) => (
              <div
                key={index}
                className={`
              relative overflow-hidden rounded-lg bg-white shadow-md
              ${index % 5 === 0 ? "row-span-2 col-span-2" : ""}
              ${index % 7 === 0 ? "col-span-2" : ""}
            `}
              >
                <img
                  src={img}
                  alt={`Trek ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>

        <GradualBlur
          target="parent"
          position="bottom"
          height="13rem"
          strength={1}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </section>
    </div>
  );
}
