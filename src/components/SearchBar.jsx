import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ trek, onSearch, filterLevel }) {
  const [active, setActive] = useState("All");

  const levels = ["All", "Easy", "Moderate", "Difficult"];
  const [search, setSearch] = useState("");
  const [suggestion, setsuggestion] = useState([]);
  const handlechange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const matched = trek
        .filter((trek) => trek.name.toLowerCase().includes(value.toLowerCase()))
        .splice(0, 5);
      setsuggestion(matched);
    } else {
      setsuggestion([]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(search);
  };

  const handleFilter = (level) => {
    if (level) filterLevel(level);
  };

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <div className=" h-[80px] bg-[#1186f4f8] flex items-center px-4 font-figtree">
        {/* Left: Levels */}
        <div className="flex flex-col gap-3 w-full">
          {" "}
          <div className="flex gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => {
                  setActive(level);
                  handleFilter(level);
                }}
                className={`w-[66px] rounded-[6px] text-[13px] font-medium transition 
              ${
                active === level
                  ? "bg-[#69daff] text-white border-green-600"
                  : "bg-[#d1dbf0] text-blue-600 font-bold border-gray-300 hover:bg-gray-100"
              }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="flex flex-row justify-between items-center w-[100%]">
            <div className="relative ">
              <FiSearch className="absolute left-2 top-1/2 text-white -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search your favourite trek"
                onChange={(e) => {
                  handlechange(e);
                  onSearch(e.target.value);
                }}
                className="pl-8 pr-3 py-1 border-1 border-white/50 text-white rounded-md text-[12px] focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
              {suggestion.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border mt-1 rounded shadow-md z-10">
                  {suggestion.map((trek) => (
                    <li
                      key={trek._id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearch(trek.name);
                        setsuggestion([]);
                        console.log(trek.name);
                        if (onSearch) onSearch(trek.name);
                      }}
                    >
                      {trek.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="">
              <span className="text-sm text-white font-logo">
                Filter: Range
              </span>
            </div>
          </div>
        </div>

        {/* Right: Filter + Search */}
      </div>
    </form>
  );
}
