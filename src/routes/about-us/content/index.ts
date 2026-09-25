import type { MarkdownContentBlock } from '@/src/shared/components/content/renderMarkdownContent'
import type { PlainContentBlock } from '@/src/shared/components/content/renderPlainContent'

export const ABOUT_PLAIN_BLOCKS: PlainContentBlock[] = [
    {
        id: 'brand-intro',
        title: 'معرفی برند',
        type: 'text',
        body: 'زیرا مارکت، برندی پیشرو در تولید پوشاک راحتی و زیرپوش با تمرکز بر کیفیت پارچه و دوام محصول.',
    },
    {
        id: 'brand-image',
        title: 'فضای برند',
        type: 'image',
        body: '/images/hero.jpg',
    },
    {
        id: 'about-company',
        title: 'درباره شرکت',
        type: 'text',
        body: 'شرکت زیرا در سال ۱۳۹۲ تاسیس شد و امروز یکی از بزرگ‌ترین تامین‌کنندگان پوشاک راحتی عمده در کشور است.',
    },
]

export const ABOUT_MARKDOWN_BLOCKS: MarkdownContentBlock[] = [
    {
        id: 'history',
        title: 'سابقه و افتخارات',
        body: `بیش از یک دهه فعالیت، دریافت استاندارد ملی نساجی و همکاری با بیش از ۱٬۰۰۰ فروشگاه.

- استاندارد ملی نساجی
- شبکه توزیع سراسری
- تمرکز بر دوام پارچه`,
    },
]
