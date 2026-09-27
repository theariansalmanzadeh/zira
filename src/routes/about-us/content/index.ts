export type AboutItem = {
    id: string
    title: string
    image: string
    description: string
}

export const ABOUT_ITEMS: AboutItem[] = [
    {
        id: 'brand-intro',
        title: 'معرفی برند',
        image: '/images/hero.jpg',
        description:
            'زیرا مارکت، برندی پیشرو در تولید پوشاک راحتی و زیرپوش با تمرکز بر کیفیت پارچه و دوام محصول.',
    },
    {
        id: 'about-company',
        title: 'درباره شرکت',
        image: '/images/banner.jpg',
        description:
            'شرکت زیرا در سال ۱۳۹۲ تاسیس شد و امروز یکی از بزرگ‌ترین تامین‌کنندگان پوشاک راحتی عمده در کشور است.',
    },
    {
        id: 'history',
        title: 'سابقه و افتخارات',
        image: '/images/blog1.jpg',
        description: `بیش از یک دهه فعالیت، دریافت استاندارد ملی نساجی و همکاری با بیش از ۱٬۰۰۰ فروشگاه.

- استاندارد ملی نساجی
- شبکه توزیع سراسری
- تمرکز بر دوام پارچه`,
    },
]
