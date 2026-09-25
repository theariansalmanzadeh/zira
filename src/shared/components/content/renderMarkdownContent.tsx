import ReactMarkdown from 'react-markdown'

export type MarkdownContentBlock = {
    id: string
    title: string
    body: string
}

export function renderMarkdownContent(block: MarkdownContentBlock) {
    return (
        <article key={block.id} className='flex flex-col gap-3'>
            <h2 className='text-title-md font-bold text-on-surface'>{block.title}</h2>
            <div className='flex flex-col gap-3 text-body-md leading-8 text-on-surface-variant [&_a]:text-primary [&_a]:underline [&_img]:h-56 [&_img]:w-full [&_img]:rounded-card-lg [&_img]:object-cover [&_ol]:list-decimal [&_ol]:ps-5 [&_ul]:list-disc [&_ul]:ps-5'>
                <ReactMarkdown>{block.body}</ReactMarkdown>
            </div>
        </article>
    )
}
