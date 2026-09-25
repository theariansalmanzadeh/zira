import { renderMarkdownContent } from '@/src/shared/components/content/renderMarkdownContent'
import { renderPlainContent } from '@/src/shared/components/content/renderPlainContent'
import { WORK_MARKDOWN_BLOCKS, WORK_PLAIN_BLOCKS } from './content'

const WorkWithUs = () => {
    return (
        <section className='flex w-full flex-col gap-8 bg-surface-container-lowest py-10 lg:py-6xl' dir='rtl'>
            <h1 className='text-title-lg font-bold text-on-surface'>همکاری با ما</h1>
            {WORK_PLAIN_BLOCKS.map((block) => renderPlainContent(block))}
            {WORK_MARKDOWN_BLOCKS.map((block) => renderMarkdownContent(block))}
        </section>
    )
}

export default WorkWithUs
