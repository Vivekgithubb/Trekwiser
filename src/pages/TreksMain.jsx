import SearchBar from "@/components/SearchBar";
import TreksCard from "@/components/TreksCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TreksMain() {
  const [Treks, setTreks] = useState([]);
  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3000/api/treks");
        setTreks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTreks();
  }, []);
  return (
    <div>
      <div className=" mt-16">
        <SearchBar />
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
          {Treks.map((trek, i) => (
            <TreksCard
              key={trek._id}
              image={trek}
              id={trek}
              // difficulty={difficulty[i % difficulty.length]}
              trek={trek}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
