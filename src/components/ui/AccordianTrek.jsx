import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordianTrek() {
  return (
    <>
      {" "}
      <Accordion type="single" collapsible className="w-full text-[12px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>Where is Kudremukha located?</AccordionTrigger>
          <AccordionContent>
            Kudremukha is located in the Chikkamagaluru district of Karnataka,
            India.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Why is it called Kudremukha?</AccordionTrigger>
          <AccordionContent>
            The name "Kudremukha" means "horse-face" in Kannada, inspired by the
            shape of its main peak.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            How difficult is the Kudremukha trek?
          </AccordionTrigger>
          <AccordionContent>
            It is considered a moderately difficult trek, suitable for fit
            beginners and experienced trekkers alike.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>What is the trek duration?</AccordionTrigger>
          <AccordionContent>
            The trek usually takes around 8–9 hours to complete (approximately
            18 km round trip).
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Best time to do Kudremukha trek?</AccordionTrigger>
          <AccordionContent>
            The best time is between October and February, when the weather is
            cool and pleasant.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Is night trekking allowed?</AccordionTrigger>
          <AccordionContent>
            No, night trekking is not allowed due to forest restrictions and
            safety regulations.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
