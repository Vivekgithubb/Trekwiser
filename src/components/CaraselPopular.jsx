import Homecard from "./Homecard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function CaraselPopular({ items }) {
  return (
    <div className="pb-5">
      <Carousel>
        <CarouselContent>
          {items.map((trek, i) => (
            <CarouselItem className="basis-24/26" key={i}>
              <Homecard trek={trek} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
