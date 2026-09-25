import { WORK_WITH_US_SECTIONS } from '@/src/routes/contentManagment/workWithUs/constants'
import type { MarkdownContentBlock } from '@/src/shared/components/content/renderMarkdownContent'
import type { PlainContentBlock } from '@/src/shared/components/content/renderPlainContent'

const steps = WORK_WITH_US_SECTIONS.find((section) => section.id === 'coop-steps')

export const WORK_PLAIN_BLOCKS: PlainContentBlock[] = [
    ...WORK_WITH_US_SECTIONS.filter((section) => section.id !== 'coop-steps').map((section) => ({
        id: section.id,
        title: section.title,
        type: 'text' as const,
        body: section.body,
    })),
    {
        id: 'coop-image',
        title: 'همکاری با زیرا مارکت',
        type: 'image',
        body: '/images/hero.jpg',
    },
]

export const WORK_MARKDOWN_BLOCKS: MarkdownContentBlock[] = [
    {
        id: steps?.id ?? 'coop-steps',
        title: steps?.title ?? 'مراحل همکاری',
        body: `1. ثبت درخواست
2. بررسی پروانه کسب
3. تایید و تخصیص سطح اعتبار
4. شروع سفارش‌گذاری`,
    },
]
