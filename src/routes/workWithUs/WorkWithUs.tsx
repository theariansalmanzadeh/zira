import ReactMarkdown from 'react-markdown'
import type { PublicPageSectionOut } from '@/src/api/types/public/cms'

type WorkWithUsProps = {
    sections: PublicPageSectionOut[]
}

const WorkWithUs = ({ sections }: WorkWithUsProps) => {
    return (
        <section className="flex w-full flex-col gap-8 bg-surface-container-lowest py-10 lg:py-6xl" dir="rtl">
            <h1 className="text-title-lg font-bold text-on-surface">همکاری با ما</h1>
            {sections.map((section) => (
                <article key={section.id} className="flex flex-col gap-3">
                    <h2 className="text-title-md font-bold text-on-surface">
                        {section.title}
                    </h2>
                    <div className="flex flex-col gap-3 text-body-md leading-8 text-on-surface [&_a]:text-primary [&_a]:underline [&_ol]:list-decimal [&_ol]:ps-5 [&_ul]:list-disc [&_ul]:ps-5">
                        <ReactMarkdown>{section.body}</ReactMarkdown>
                    </div>
                </article>
            ))}
        </section>
    )
}

export default WorkWithUs
