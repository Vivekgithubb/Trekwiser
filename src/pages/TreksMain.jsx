import SearchBar from "@/components/SearchBar";
import TreksCard from "@/components/TreksCard";

export default function treksMain() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const difficulty = ["Easy", "Medium", "Hard"];
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
          {list.map((el, i) => (
            <TreksCard
              key={el}
              image={el}
              id={el}
              difficulty={difficulty[i % difficulty.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
