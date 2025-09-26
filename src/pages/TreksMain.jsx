import SearchBar from "@/components/SearchBar";
import TreksCard from "@/components/TreksCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TreksMain() {
  const [Treks, setTreks] = useState([]);
  const [filteredTreks, setfilteredTreks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLevel, setActiveLevel] = useState("All");
  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/treks`
        );
        setTreks(res.data);
        setfilteredTreks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTreks();
  }, []);

  const onSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    CombineFilters(searchTerm, activeLevel);
  };

  const handleFilter = (level) => {
    setActiveLevel(level);
    CombineFilters(searchTerm, level);
  };

  const CombineFilters = (searchTerm, activeLevel) => {
    let temp = [...Treks];
    if (activeLevel != "All") {
      temp = temp.filter((trek) => trek.difficulty === activeLevel);
    }

    if (searchTerm) {
      temp = temp.filter((trek) =>
        trek.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setfilteredTreks(temp);
  };

  return (
    <div>
      <div className=" mt-16">
        <SearchBar
          trek={Treks}
          onSearch={onSearch}
          filterLevel={handleFilter}
        />
      </div>
      <div className="w-full text-center mt-3 ">
        <h1 className="font-title text-xl font-light">
          your treks, simplified.
        </h1>
        <h3 className="text-[12px]">
          From beginner-friendly trails to daring climbs, find the trek that’s
          waiting for you.
        </h3>
        <div className="flex flex-col w-full justify-center items-center mt-10">
          {filteredTreks.length > 0 ? (
            filteredTreks.map((trek) => (
              <TreksCard key={trek._id} image={trek} id={trek} trek={trek} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No treks found</p>
          )}
        </div>
      </div>
    </div>
  );
}
