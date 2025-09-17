import Homecard from "./Homecard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function CaraselPopular() {
  return (
    <div className="pb-5">
      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-24/26">
            <Homecard />
          </CarouselItem>
          <CarouselItem className="basis-24/26">
            <Homecard />
          </CarouselItem>
          <CarouselItem className="basis-24/26">
            <Homecard />
          </CarouselItem>
          <CarouselItem className="basis-24/26">
            <Homecard />
          </CarouselItem>
          <CarouselItem className="basis-24/26">
            <Homecard />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
