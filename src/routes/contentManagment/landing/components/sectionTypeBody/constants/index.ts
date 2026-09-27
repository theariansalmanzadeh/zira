import type { LandingSectionStatus } from '../../../types'

export type BannerSlideItem = {
    id: string
    title: string
    subtitle: string
    status: Extract<LandingSectionStatus, 'published' | 'draft'>
    thumbnailClassName: string
}

export type BrandSlideItem = {
    id: string
    title: string
    subtitle: string
    status: Extract<LandingSectionStatus, 'published' | 'draft'>
    thumbnailClassName: string
    description?: string
    fileName?: string
    isPrimary?: boolean
}

export type ProductSlideItem = {
    id: string
    title: string
    category: string
    price: number
    originalPrice?: number
    discountPercent?: number
}

export const BANNER_SLIDE_DUMMY: BannerSlideItem[] = [
    {
        id: 'slide-1',
        title: 'کالکشن بهار ۱۴۰۴',
        subtitle: 'اسلاید ۰۱ · CTA: مشاهده کالکشن',
        status: 'published',
        thumbnailClassName: 'bg-[#D65A5A]',
    },
    {
        id: 'slide-2',
        title: 'حراج میان‌فصل',
        subtitle: 'اسلاید ۰۲ · CTA: خرید ویژه',
        status: 'published',
        thumbnailClassName: 'bg-[#7E60A5]',
    },
    {
        id: 'slide-3',
        title: 'محصولات نوزاد',
        subtitle: 'اسلاید ۰۳ · CTA: مشاهده دسته',
        status: 'draft',
        thumbnailClassName: 'bg-[#3A9668]',
    },
]

export const BRAND_SLIDE_DUMMY: BrandSlideItem[] = [
    {
        id: 'brand-1',
        title: 'زیرا',
        subtitle: 'پوشاک راحتی و لباس زیر · ۴ رویداد تاریخی',
        status: 'published',
        thumbnailClassName: 'bg-[#E15B5B]',
        isPrimary: true,
    },
    {
        id: 'brand-2',
        title: 'ویرا',
        subtitle: 'لباس راحتی مردانه · ۲ رویداد تاریخی',
        status: 'published',
        thumbnailClassName: 'bg-[#7A4E9D]',
    },
    {
        id: 'brand-3',
        title: 'زیرا کیدز',
        subtitle: 'پوشاک کودک و نوزاد · ۱ رویداد تاریخی',
        status: 'draft',
        thumbnailClassName: 'bg-[#3C9A62]',
    },
]

export const PRODUCT_SLIDE_DUMMY: ProductSlideItem[] = [
    {
        id: 'product-1',
        title: 'سوتین اسپرت کراس',
        category: 'لباس زیر > سوتین',
        price: 428000,
    },
    {
        id: 'product-2',
        title: 'شورت نخی کلاسیک',
        category: 'لباس زیر > شورت',
        price: 189000,
    },
    {
        id: 'product-3',
        title: 'تاپ بندی راحتی',
        category: 'لباس راحتی > تاپ',
        price: 256000,
        originalPrice: 301000,
        discountPercent: 15,
    },
    {
        id: 'product-4',
        title: 'ست لباس خواب ساتن',
        category: 'لباس خواب > ست',
        price: 612000,
    },
]
