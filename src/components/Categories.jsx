import { Eye } from "lucide-react";
import home1 from "/home2.jpg";
export default function Categories() {
  return (
    <div className="mt-3 mb-3">
      <div
        className="bg-white  p-2  w-fit rounded-lg  text-center"
        style={{ boxShadow: "1px 2px 15px rgba(59,130,246,0.4)" }}
      >
        <h1 className="font-logo text-zinc-600 text-[13px] mb-1">
          Top 5 Scenic Treks
        </h1>
        <div className="flex  flex-col justify-center items-center gap-2">
          <Eye />
          <img
            src={home1}
            className="w-full h-[80px] object-cover  rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
