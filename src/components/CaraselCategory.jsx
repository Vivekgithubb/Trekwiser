import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Categories from "@/components/Categories";
export default function CaraselCategory() {
  return (
    <div>
      {" "}
      <Carousel
        opts={{
          align: "start",
          loop: false,
          skipSnaps: true, // disables snapping
          containScroll: false,
          draggable: true,
        }}
      >
        <CarouselContent>
          <CarouselItem className="basis-2/5 ">
            <Categories />
          </CarouselItem>
          <CarouselItem className="basis-2/5 ">
            <Categories />
          </CarouselItem>
          <CarouselItem className="basis-2/5 ">
            <Categories />
          </CarouselItem>
          <CarouselItem className="basis-2/5 ">
            <Categories />
          </CarouselItem>
          <CarouselItem className="basis-2/5 ">
            <Categories />
          </CarouselItem>
          <CarouselItem className="basis-2/5 ">
            <Categories />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
