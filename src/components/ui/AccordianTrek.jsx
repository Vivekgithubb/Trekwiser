import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordianTrek({ question }) {
  return (
    <>
      <Accordion type="single" collapsible className="w-full text-[12px]">
        {question?.map((ques, i) => (
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger>{ques.question}</AccordionTrigger>
            <AccordionContent>{ques.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
