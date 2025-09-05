import { Link, useNavigate } from "react-router";
import { HiMiniArrowLongRight } from "react-icons/hi2";

export default function Button({ text, to, arrow }) {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(`/${to}`)}
        className=" bg-white/50 backdrop-blur-md rounded-xs h-[40px] p-3 flex flex-row justify-center items-center gap-2 font-figtree text-[10px]"
      >
        {text}
        {arrow === "yes" ? <HiMiniArrowLongRight size={20} color="grey" /> : ""}
      </button>
    </div>
  );
}
