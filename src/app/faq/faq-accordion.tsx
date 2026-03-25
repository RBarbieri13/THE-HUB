"use client";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/data/faq";

export function FAQAccordion() {
  return (
    <Accordion>
      {FAQ_ITEMS.map((item) => (
        <AccordionItem key={item.question} title={item.question}>
          <p className="text-text-body">{item.answer}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
