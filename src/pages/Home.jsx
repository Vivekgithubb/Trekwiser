import FlowingMenu from "../components/FlowingMenu";
import Button from "../components/Button";
import home1 from "/home0.jpg";
import RollingGallery from "../components/RollingGallery";
// import CaraselCategory from "@/components/CaraselCategory";

import CaraselPopular from "@/components/CaraselPopular";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const demoItems = [
    {
      link: "/treks",
      text: "Best Beginner trek",
      image: "/home1.jpg",
    },
    {
      link: "#",
      text: "Top 5 Shortest treks",
      image: "/home1.jpg",
    },
    {
      link: "#",
      text: "Most challenging treks",
      image: "/home1.jpg",
    },
    {
      link: "#",
      text: "Top 5 scenic treks",
      image: "/home1.jpg",
    },
  ];
  const [popularTreks, setPopularTreks] = useState([]);
  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3000/api/treks/popular");
        setPopularTreks(res.data.data.treks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTreks();
  }, []);
  // console.log(popularTreks);
  return (
    <div>
      <div className=" w-full h-full ">
        <div className="relative w-full h-screen">
          <img
            src={home1}
            className="absolute inset-0 w-full h-[100vh] object-cover [mask-image:linear-gradient(to_bottom,black_74%,transparent_90%)]
             [mask-repeat:no-repeat] [mask-size:100%_100%]"
          />
          <div className="relative top-26">
            <div className="text-center font-title text-3xl leading-[33px]">
              <h1>Discover Treks</h1>
              <h1>Join Tribes</h1>
              <h1>Live the Journey</h1>
            </div>
            <div className="flex flex-row gap-6 justify-center items-center mt-15">
              <Button text="Exlpore treks" to="treks" arrow="yes" />
              <Button text="View Community" to="commmunity" arrow="no" />
            </div>
            <div className="text-center flex flex-row justify-center items-center font-light mt-10 font-figtree text-zinc-100 ">
              <div className="w-fit">
                <h1 className="text-shadow-xl/10 p-2 ">
                  Discover breathtaking trails, connect with <br />
                  fellow adventurers, and create unforgettable <br />
                  memories in nature's playground.
                </h1>
              </div>
            </div>
            <div className="text-white font-logo mt-19 ml-3 mr-3  h-full">
              <h1 className="mb-2">Popular Treks</h1>
              <div className=" h-full ">
                <CaraselPopular items={popularTreks} />
              </div>
            </div>
            <div className="flex flex-col bg-white shadow-blue-300 shadow-md/30">
              <h1 className="font-logo ml-3 text-zinc-700 ">
                Some of the Most Famous Places
              </h1>
              <RollingGallery autoplay={true} pauseOnHover={true} />
            </div>

            <div className="mt-5  bg-white mb-5">
              <h1 className="font-logo pl-4 text-zinc-700">
                Frequently searched categories
              </h1>
              <div className=" pl-3 flex ">
                {/* <CaraselCategory />
                 */}

                <div className="h-[180px] relative bg-black/10 backdrop-blur-sm w-[95%] rounded-xl mt-4 mb-10">
                  <FlowingMenu items={demoItems} />
                </div>
              </div>
              <footer className="h-[100px] bg-blue-300/40 text-center flex flex-col justify-center items-center">
                Thanks for Visiting, Made with Love ❤️ by
                <br /> Chaithanya and Vivek
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
