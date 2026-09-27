'use client'

import ReactMarkdown from 'react-markdown'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/src/shared/components/ui/Accordion'
import { ABOUT_ITEMS } from './content'

const AboutUs = () => {
    return (
        <section
            className="flex w-full flex-col gap-8 bg-surface-container-lowest py-10 lg:py-6xl"
            dir="rtl"
        >
            <h1 className="text-title-lg font-bold text-on-surface">
                درباره ما
            </h1>
            <div className="flex w-full flex-wrap">
                {ABOUT_ITEMS.map((item) => (
                    <Accordion
                        key={item.id}
                        type="single"
                        collapsible
                        className="w-full sm:w-1/2"
                    >
                        <AccordionItem
                            value={item.id}
                            className="border-b border-outline-variant px-4"
                        >
                            <AccordionTrigger className="text-right text-on-surface">
                                {item.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-56 w-full rounded-card-lg object-cover"
                                />
                                <div className="mt-3 flex flex-col gap-3 text-body-md leading-8 text-on-surface-variant [&_ol]:list-decimal [&_ol]:ps-5 [&_ul]:list-disc [&_ul]:ps-5">
                                    <ReactMarkdown>
                                        {item.description}
                                    </ReactMarkdown>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </section>
    )
}

export default AboutUs
