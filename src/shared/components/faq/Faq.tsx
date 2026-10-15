"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@shared/components/ui/Accordion";
import type { PublicFaqItemOut } from "@/src/api/types/public/cms";
import { FAQ_ITEMS } from "./content";

type FaqProps = {
    items?: PublicFaqItemOut[];
};

const Faq = ({ items }: FaqProps) => {
    const faqItems =
        items ??
        FAQ_ITEMS.map((item, index) => ({
            id: `item-${index}`,
            question: item.question,
            answer: item.answer,
        }));

    return (
        <div className="flex flex-col md:flex-row gap-4xl w-full justify-between py-10 lg:py-6xl bg-surface-container-lowest">
            <h2 className="text-on-surface font-bold text-title-lg whitespace-nowrap basis-1/2">
                سوال‌های پرتکرار
            </h2>
            <Accordion
                type="single"
                collapsible
                defaultValue={faqItems[0]?.id}
                className="w-full basis-1/2"
            >
                {faqItems.map((item) => (
                    <AccordionItem
                        key={item.id}
                        value={item.id}
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
