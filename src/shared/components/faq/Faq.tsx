"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@shared/components/ui/Accordion";
import { FAQ_ITEMS } from "./content";

const Faq = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4xl w-full justify-between py-10 lg:py-6xl bg-surface-container-lowest">
            <h2 className="text-on-surface font-bold text-title-lg whitespace-nowrap basis-1/2">
                سوال‌های پرتکرار
            </h2>
            <Accordion
                type="single"
                collapsible
                defaultValue="item-0"
                className="w-full basis-1/2"
            >
                {FAQ_ITEMS.map((item, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b border-outline-variant"
                    >
                        <AccordionTrigger className="text-on-surface text-right">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-on-surface-variant! text-body-lg">
                                {item.answer}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default Faq;
