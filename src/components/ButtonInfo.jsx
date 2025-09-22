import { Link, useNavigate } from "react-router";
import { HiMiniArrowLongRight } from "react-icons/hi2";

export default function Button({ text, to, arrow, back, difficulty }) {
  const navigate = useNavigate();
  const bgColors = {
    blue: "bg-blue-600/90",
    red: "bg-red-600/80",
    green: "bg-green-600/80",
  };
  const difficult = {
    Easy: " bg-green-100 text-green-600",
    Moderate: " bg-blue-100 text-blue-600",
    Difficult: " bg-red-100 text-red-600",
  };
  if (difficulty) {
    return (
      <div>
        <button
          onClick={() => navigate(`/${to}`)}
          className={`${difficult[difficulty]}  backdrop-blur-md rounded-3xl h-[9px] p-[6px] flex flex-row justify-center items-center gap-2 font-figtree text-[7px]`}
        >
          {text}
          {arrow === "yes" ? (
            <HiMiniArrowLongRight size={20} color="grey" />
          ) : (
            ""
          )}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(`/${to}`)}
        className={`${
          back ? bgColors[back] : " bg-white/50"
        } text-white backdrop-blur-md h-[18px] w-full mb-2 p-2 flex flex-row justify-center items-center gap-2 font-figtree text-[10px] rounded-3xl `}
      >
        {text}
        {arrow === "yes" ? <HiMiniArrowLongRight size={20} color="grey" /> : ""}
      </button>
    </div>
  );
}
