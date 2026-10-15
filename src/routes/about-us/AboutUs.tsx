'use client'

import ReactMarkdown from 'react-markdown'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/src/shared/components/ui/Accordion'
import { PublicPageSectionOut } from '@/src/api/types/public/cms'

const AboutUs = ({ sections }: { sections: PublicPageSectionOut[] }) => {
    console.log(sections)
    const items = sections.map((section) => ({
        id: section.id,
        title: section.title,
        description: section.body,
    }))

    return (
        <section
            className="flex w-full flex-col gap-8 bg-surface-container-lowest py-10 sm:py-6xl"
            dir="rtl"
        >
            <h1 className="text-title-lg font-bold text-on-surface">
                درباره ما
            </h1>
            <div className="flex flex-col gap-4 lg:flex-row w-full flex-wrap">
                {items.map((item) => (
                    <Accordion
                        key={item.id}
                        type="single"
                        collapsible
                        className="w-full sm:w-2/3"
                    >
                        <AccordionItem
                            value={item.id}
                            className="border-b border-outline-variant px-4"
                        >
                            <AccordionTrigger className="text-right text-on-surface">
                                {item.title}
                            </AccordionTrigger>
                            <AccordionContent className='py-4'>
                                {/* <Image
                                    width={1000}
                                    height={1000}
                                    src={item.image}
                                    alt={item.title}
                                    className="h-auto w-full rounded-card-lg object-cover"
                                /> */}
                                <div className="mt-4 flex flex-col gap-3 text-body-md leading-8 text-on-surface [&_ol]:list-decimal [&_ol]:ps-5 [&_ul]:list-disc [&_ul]:ps-5">
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
