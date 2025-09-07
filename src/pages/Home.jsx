import Button from "../components/Button";
import Homecard from "../components/Homecard";
import home1 from "/home0.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function Home() {
  return (
    <div className=" w-full h-full">
      <div className="relative w-full h-full">
        <img
          src={home1}
          className="absolute inset-0 w-full h-[90vh] ob]ect-cover"
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
          <div className="text-white font-logo mt-15 ml-3 mr-3 h-full">
            <h1 className="mb-2">Popular Treks</h1>
            {/* <Homecard />*/}
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <Homecard />
                </CarouselItem>
                <CarouselItem>
                  <Homecard />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
