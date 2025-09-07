import Button from "./Button";
import home1 from "/home2.jpg";

export default function Homecard() {
  return (
    <div className="bg-white h-[190px] rounded-lg overflow-hidden shadow-md mr-2">
      {/* Title */}
      <div className="font-logo text-zinc-800 ml-3 pt-2">Kudremukha</div>

      {/* Grid Container */}
      <div className="grid grid-cols-[40%_60%] h-[140px] w-full text-zinc-800 mb-2">
        {/* Image Section */}
        <div className="w-full h-full">
          <img
            src={home1}
            className="w-full h-[150px] object-cover pl-1 rounded-2xl"
          />
        </div>

        {/* Content Section */}
        <div className="w-[200px] h-full  flex flex-col items-start pl-2 justify-start">
          <div className="flex flex-row justify-between">
            About
            <Button back="blue" text="get more info" />
          </div>
          <div className="text-[9px] font-figtree">
            Kudremukh Trek, located in the Chikmagalur district of Karnataka, is
            one of the most beautiful and popular treks in South India. Spread
            across the Western Ghats, it is about 20 km long and usually takes a
            full day to complete. The trail passes through dense forests,
            flowing streams, waterfalls, and vast rolling grasslands, offering
            breathtaking views of the surrounding valleys and peaks.
          </div>
        </div>
      </div>
    </div>
  );
}
