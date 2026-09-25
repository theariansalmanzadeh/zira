export type PlainContentBlock = {
    id: string
    title: string
    type: 'text' | 'image'
    body: string
}

export function renderPlainContent(block: PlainContentBlock) {
    return (
        <article key={block.id} className='flex flex-col gap-3'>
            <h2 className='text-title-md font-bold text-on-surface'>{block.title}</h2>
            {block.type === 'image' ? (
                <img
                    src={block.body}
                    alt={block.title}
                    className='h-56 w-full rounded-card-lg object-cover'
                />
            ) : (
                <p className='text-body-md leading-8 text-on-surface-variant'>{block.body}</p>
            )}
        </article>
    )
}
