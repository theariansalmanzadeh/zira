import { renderMarkdownContent } from '@/src/shared/components/content/renderMarkdownContent'
import { renderPlainContent } from '@/src/shared/components/content/renderPlainContent'
import { ABOUT_MARKDOWN_BLOCKS, ABOUT_PLAIN_BLOCKS } from './content'

const AboutUs = () => {
    return (
        <section className='flex w-full flex-col gap-8 bg-surface-container-lowest py-10 lg:py-6xl' dir='rtl'>
            <h1 className='text-title-lg font-bold text-on-surface'>درباره ما</h1>
            {/* {ABOUT_PLAIN_BLOCKS.map((block) => renderPlainContent(block))} */}
            {ABOUT_MARKDOWN_BLOCKS.map((block) => renderMarkdownContent(block))}
        </section>
    )
}

export default AboutUs
