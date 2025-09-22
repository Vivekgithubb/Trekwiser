import ButtonInfo from "./ButtonInfo";

import home1 from "/home2.jpg";
import { MoveRight } from "lucide-react";

export default function Homecard({ trek }) {
  return (
    <div
      className=" h-[220px] bg-white/50 pr-3 rounded-tl-lg rounded-tr-lg mr-2 "
      // style={{ boxShadow: "0px 2px 15px rgba(59,130,246,0.4)" }}
    >
      {/* Title */}
      <div className="flex flex-row items-end gap-1">
        <div className="font-logo text-zinc-800 ml-3 pt-2">{trek.name}</div>
        <div className="mb-1">
          <ButtonInfo text={trek.difficulty} difficulty={trek.difficulty} />
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-[40%_60%] h-[140px] w-full text-zinc-800 mb-2">
        {/* Image Section */}
        <div className="w-full h-full">
          <img
            src={home1}
            className="w-full h-[160px] object-cover pl-1 rounded-lg "
          />
        </div>

        {/* Content Section */}
        <div className="w-[200px] h-full  flex flex-col items-start pl-[5px] justify-start">
          <div className="flex flex-row justify-between items-center w-full pr-2">
            <h1 className="text-[12px]">About</h1>
          </div>
          <div className="text-[8.5px] *:h-full mr-5 font-figtree flex flex-row justify-center items-center">
            <p>
              {" "}
              {/* Kudremukh Trek, located in the Chikmagalur district of Karnataka,
              is one of the most beautiful and popular treks in South India.
              Spread across the Western Ghats, it is about 20 km long and
              usually takes a full day to complete. The trail passes through
              dense forests, flowing streams, waterfalls, and vast rolling
              grasslands, offering breathtaking views of the surrounding valleys
              and peaks. */}
              {trek.description}
            </p>
          </div>
          <div className=" w-[165px] mt-2">
            <ButtonInfo back="blue" text="Get more info" />
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-t from-white to-transparent" /> */}
    </div>
  );
}
