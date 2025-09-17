import SearchBar from "@/components/SearchBar";
import TrekDetailCard from "@/components/TrekDetailCard";

export default function Community() {
  const image = "/home3.jpg";
  const title = "Mandalpatti";
  const location = "Chikmaglore";
  const author = "Vivek";
  const difficulty = "HARD";
  const description = `“Kudremukha is hands down one of the most breathtaking treks in Karnataka. 
  The rolling green hills, endless grasslands, and mist-covered peaks truly make you feel like you’re walking through a painting. 
  The trail itself is long but manageable if you start early — about 9–10 hours to complete. 
  The best part is the constant change in scenery: dense shola forests, clear streams, and the iconic horse-face peak view at the summit.”`;

  return (
    <div>
      <div className="mt-15">
        <SearchBar />
        <TrekDetailCard />
        <TrekDetailCard
          image={image}
          location={location}
          title={title}
          author={author}
          difficulty={difficulty}
          description={description}
        />
        <TrekDetailCard />
        <TrekDetailCard />
        <TrekDetailCard />
        <TrekDetailCard />
        <TrekDetailCard />
        <TrekDetailCard />
        <TrekDetailCard />
        <TrekDetailCard />
      </div>
    </div>
  );
}
