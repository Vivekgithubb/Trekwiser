import { Link, useNavigate } from "react-router";
import { HiMiniArrowLongRight } from "react-icons/hi2";

export default function Button({ text, to, arrow, back, margin }) {
  const navigate = useNavigate();
  const bgColors = {
    blue: "bg-blue-500/50",
    red: "bg-red-500/50",
    green: "bg-green-500/50",
  };

  const margins = { right: "2", left: "2", top: "2", bottom: "2" };

  return (
    <div>
      <button
        onClick={() => navigate(`/${to}`)}
        className={`${back ? bgColors[back] : " bg-white/50"} ${
          margin ? margins[margin] : "mr-0"
        } backdrop-blur-md rounded-xs h-[40px] p-3 flex flex-row justify-center items-center gap-2 font-figtree text-[10px]`}
      >
        {text}
        {arrow === "yes" ? <HiMiniArrowLongRight size={20} color="grey" /> : ""}
      </button>
    </div>
  );
}
