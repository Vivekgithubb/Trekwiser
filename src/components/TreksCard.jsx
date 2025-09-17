// import img1 from "/home1.jpg";

import { Link } from "react-router";

export default function TreksCard({ difficulty, image, id }) {
  const difficultyColors = {
    Easy: "bg-green-600/20",
    Medium: "bg-blue-600/20",
    Hard: "bg-red-600/20",
  };
  const difficultyText = {
    Easy: "text-green-600",
    Medium: "text-blue-600",
    Hard: "text-red-600",
  };
  return (
    <div className=" mb-2 w-full h-[140px] border border-gray-200 rounded-lg grid grid-cols-[40%_60%]">
      {/* Left: Image */}
      <div className="flex justify-center items-center mt-1 h-[130px] overflow-hidden">
        <img
          src={`/home${image}.jpg`}
          className="rounded-lg object-cover w-full h-full "
        />
      </div>

      {/* Right: Trek Info */}
      <div className="flex flex-col pr-3 ml-2">
        {/* Title & Level */}
        <div className="flex justify-between items-center relative">
          <div className="flex flex-col items-start">
            <h2 className="font-bold text-lg font-logo text-gray-900">
              KUDREMUKHA
            </h2>
            <p className="text-[9px] font-semibold">Location: Kudremukha</p>
          </div>

          <span
            className={`relative text-[8px] flex flex-row justify-center items-center ${
              difficultyColors[difficulty]
            } font-figtree font-semibold bottom-1 ${
              difficultyText[difficulty] || "text-gray-500"
            } rounded-2xl h-[15px] px-3 text-white1 `}
          >
            {difficulty}
          </span>
        </div>

        {/* Details */}
        <div className="text-[10px] font-figtree font-semibold flex flex-col items-start  text-gray-700 mt-1 space-y-1">
          <p>Length: 21 km</p>
          <p>Height: 3,000 m</p>
          <p>Open From: 10 - 4</p>
        </div>

        {/* Button */}
        <Link
          //   to={`treks/${id}`}
          to="/treks/testVal"
          className="mt-3 flex flex-row justify-center items-center h-[20px] bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-full py-2"
        >
          Get More Info.
        </Link>
      </div>
    </div>
  );
}
