import ImageCarousel from "@/components/ImageCarasole";
import AccordianTrek from "@/components/ui/AccordianTrek";
import axios from "axios";
import { BookOpenCheck, Calendar1, LandPlot, TimerReset } from "lucide-react";
import { Frown } from "lucide-react";
import {
  Mountain,
  Trees,
  Waves,
  Bird,
  PawPrint,
  Sun,
  Landmark,
  CloudFog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TrekIndiviual() {
  const difficultyColors = {
    Easy: "bg-green-600/20",
    Moderate: "bg-blue-600/20",
    Hard: "bg-red-600/20",
  };
  const difficultyText = {
    Easy: "text-green-600",
    Moderate: "text-blue-600",
    Hard: "text-red-600",
  };
  const [weather, setweather] = useState({});
  const [trek, setTrek] = useState({});
  const KEY = import.meta.env.VITE_WEATHER_API;
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res1 = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/treks/${id}`
        );
        const trekData = res1.data.data.treks;
        setTrek(trekData);

        const location = trekData.location;
        if (!location) {
          console.error("Trek location not available");
          setweather({ message: "Location not available" });
          return;
        }
        const url = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${location}`;
        const res2 = await fetch(url);
        const data2 = await res2.json();

        if (data2.error) {
          setweather({ message: "Oops not available" });
        } else {
          setweather(data2);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchWeather();
  }, [id, KEY]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      {/* Image Carousel */}
      <div className="h-[300px] overflow-hidden fixed top-0 z-5">
        <ImageCarousel />
      </div>

      {/* Stats Cards */}
      <div className="relative z-50 bg-white font-figtree text-[13px] rounded-tl-4xl rounded-tr-4xl">
        {/* Trek Header */}
        <div className="bg-[#43D0FF]/40 mt-[270px] rounded-tl-4xl rounded-tr-4xl p-6 space-y-3 shadow-2xl ">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[20px] font-bold font-logo">{trek.name}</h1>
              <p className="text-gray-600">Location: {trek.location}</p>
            </div>

            <span
              className={`text-[10px] px-3 py-1 rounded-full ${
                difficultyColors[`${trek.difficulty}`]
              } font-figtree font-semibold bottom-1 ${
                difficultyText[`${trek.difficulty}`] || "text-gray-500"
              }`}
            >
              {trek.difficulty}
            </span>
          </div>
          <div className="flex justify-between mt-4 ">
            <div className="flex flex-col items-center bg-white p-3 rounded-2xl shadow ">
              <LandPlot />
              <span className="text-[13px] font-bold mt-2">8.6 km</span>
              <span className="text-gray-500 text-[13px]">Distance</span>
            </div>
            <div className="flex flex-col items-center bg-white p-3 rounded-2xl shadow">
              <TimerReset />
              <span className="text-[13px] font-bold mt-2">22 hr</span>
              <span className="text-gray-500 text-[13px]">Duration</span>
            </div>
            <div className="flex flex-col items-center bg-white p-3 rounded-2xl shadow">
              <Calendar1 />
              <span className="text-[13px] font-bold mt-2">
                June to February
              </span>
              <span className="text-gray-500 text-[13px]">Best Month</span>
            </div>
          </div>
        </div>
        <div className="flex p-2 flex-col w-full bg-white">
          <h1 className="text-[19.5px] ml-3 font-semibold">
            Weather in {trek.location}
          </h1>
          <div className="flex flex-row justify-between items-center gap-1">
            <div className="mt-3 h-[120px] flex flex-col items-center w-fit bg-white p-3 rounded-2xl shadow">
              {weather.current ? (
                <img
                  src={weather.current?.condition?.icon}
                  className="h-[40px]"
                />
              ) : (
                <Frown />
              )}
              <span className="text-[13px] font-bold mt-2">
                {weather.current ? "Condition" : "Oops"}
              </span>
              <span className="text-gray-500 text-[13px] text-center">
                {weather.current
                  ? weather.current?.condition.text
                  : weather.message}
              </span>
            </div>
            <div className="mt-3 h-[130px] w-[120px] relative flex flex-col items-center justify-between bg-white p-3 rounded-2xl shadow">
              <div className="font-semibold text-[23px] relative top-3 text-blue-500">
                {weather?.current?.temp_c}&deg;C
              </div>
              <div className="flex flex-col justify-between items-center">
                <span className="text-[15px] font-bold mt-2">Weather</span>
                <span className="text-gray-500 text-[14px]">Temperature</span>
              </div>
            </div>
            <div className="mt-3 h-[120px] relative flex flex-col items-center justify-between bg-white p-3 rounded-2xl shadow">
              <div className="font-semibold text-[18px] relative top-3 ">
                {weather.current?.feelslike_c}&deg; C
              </div>
              <div className="flex flex-col justify-between items-center">
                <span className="text-[13px] font-bold mt-2">Feels Like</span>
                <span className="text-gray-500 text-[13px]">Temperature</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white  p-6 shadow space-y-3">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-gray-700 text-sm">{trek.description}</p>
        </div>

        {/* Key Attractions */}
        <div className="bg-white  p-6 shadow space-y-3">
          <h2 className="text-xl font-semibold">Key Attractions</h2>
          <ul className="list-disc text-[13px] list-inside text-gray-700 text-sm space-y-1">
            <li className="flex items-center gap-2">
              <Trees className="w-4 h-4 text-green-600" />
              Rolling green hills & Shola forests
            </li>
            <li className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-gray-700" />
              Horse-face peak (Varaha Parvatha)
            </li>
            <li className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-blue-500" />
              Streams & waterfalls (like Kodamboli Falls)
            </li>
            <li className="flex items-center gap-2">
              <Bird className="w-4 h-4 text-yellow-500" />
              Rich flora & birdlife
            </li>
            <li className="flex items-center gap-2">
              <PawPrint className="w-4 h-4 text-brown-600" />
              Wildlife sightings (deer, gaur, peacocks)
            </li>
            <li className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-orange-500" />
              Panoramic summit views
            </li>
            <li className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-gray-600" />
              Old mining ruins
            </li>
            <li className="flex items-center gap-2">
              <CloudFog className="w-4 h-4 text-blue-400" />
              Misty, cool mountain climate
            </li>
          </ul>
        </div>

        {/* Trek Link */}
        <div className="bg-white flex flex-row justify-start gap-3 items-center p-6 shadow text-center">
          <BookOpenCheck className="text-orange-500" />
          <a
            href="https://karnatakatourism.gov.in/"
            target="_blank"
            className="text-blue-500 font-medium hover:underline"
          >
            Book Your Trek at Karnataka Tourism
          </a>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white  p-6 shadow space-y-3">
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          <AccordianTrek />
        </div>
      </div>
    </div>
  );
}
