import type { EditSectionStatus } from '../components/EditSection'

export type AboutSectionItem = {
    id: string
    title: string
    body: string
    visible: boolean
    status: EditSectionStatus
}

export const ABOUT_US_SECTIONS: AboutSectionItem[] = [
    {
        id: 'brand-intro',
        title: 'معرفی برند',
        body: 'زیرا مارکت، برندی پیشرو در تولید پوشاک راحتی و زیرپوش با تمرکز بر کیفیت پارچه و دوام محصول.',
        visible: true,
        status: 'published',
    },
    {
        id: 'about-company',
        title: 'درباره شرکت',
        body: 'شرکت زیرا در سال ۱۳۹۲ تاسیس شد و امروز یکی از بزرگ‌ترین تامین‌کنندگان پوشاک راحتی عمده در کشور است.',
        visible: true,
        status: 'published',
    },
    {
        id: 'history',
        title: 'سابقه و افتخارات',
        body: 'بیش از یک دهه فعالیت، دریافت استاندارد ملی نساجی و همکاری با بیش از ۱٬۰۰۰ فروشگاه.',
        visible: true,
        status: 'published',
    },
    {
        id: 'products',
        title: 'محصولات',
        body: 'دسته‌بندی محصولات شامل لباس خواب، زیرپوش، لباس راحتی و پوشاک منزل برای تمام رده‌های سنی.',
        visible: true,
        status: 'draft',
    },
    {
        id: 'partners',
        title: 'همکاران',
        body: 'شبکه گسترده‌ای از عمده‌فروشان و فروشگاه‌های زنجیره‌ای در سراسر کشور.',
        visible: true,
        status: 'published',
    },
]
