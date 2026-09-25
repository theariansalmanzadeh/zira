import { IconLabel } from '@/src/shared/types/icon'
import type { SubSidebarSection } from '@/src/shared/components/sidebar/content/types'

export const CONTENT_SUB_SIDEBAR_SECTIONS: readonly SubSidebarSection[] = [
    {
        title: 'نمای کلی',
        links: [
            { label: 'داشبورد محتوا', href: '/admin/content-managment?sub=dashboard' },
        ],
    },
    {
        title: 'صفحات فروشگاه',
        links: [
            { label: 'صفحه اصلی', href: '/admin/content-managment?sub=home' },
            { label: 'درباره ما', href: '/admin/content-managment?sub=about' },
            { label: 'همکاری با ما', href: '/admin/content-managment?sub=work-with-us' },
        ],
    },
    {
        title: 'محتوای پویا',
        links: [
            { label: 'سوالات متداول', href: '/admin/content-managment?sub=faq' },
            { label: 'وبلاگ', href: '/admin/content-managment?sub=blog' },
        ],
    },
    {
        title: 'ارتباط و اسناد',
        links: [
            { label: 'تماس با ما', href: '/admin/content-managment?sub=contact' },
            { label: 'گواهی‌ها', href: '/admin/content-managment/liecense' },
        ],
    },
]

export const CONTENT_SUB_PARAMS = [
    'dashboard',
    'home',
    'about',
    'work-with-us',
    'faq',
    'blog',
    'blog-add',
    'blog-edit',
    'contact',
    'certificates',
    'liecense',
    'liecense-new',
    'liecense-details',
] as const

export type ContentSubParam = (typeof CONTENT_SUB_PARAMS)[number]

export type HeadingButton = {
    label: string
    icon?: IconLabel
    href?: string
    action?: () => void
    actionKey?:
        | 'add-faq'
        | 'export-excel'
        | 'preview'
        | 'publish'
        | 'edit-liecense'
        | 'download-liecense'
    variant: 'primary' | 'default' | 'outline'
}

export type SectionHeading = {
    title: string
    subtitle?: string
    buttons?: HeadingButton[]
}

export const sectionToHeading: Record<ContentSubParam, SectionHeading> = {
    dashboard: {
        title: 'داشبورد محتوا',
        subtitle: 'مدیریت محتوای فروشگاه و پورتال عمده‌فروشی زیرا مارکت',
    },
    home: {
        title: 'صفحه اصلی فروشگاه',
        subtitle: 'بلوک‌های صفحه نخست را ویرایش، مرتب و منتشر کنید – ۹ بلوک',
        buttons: [
            {
                label: 'پیش‌نمایش',
                icon: 'visibility400Linear',
                actionKey: 'preview',
                variant: 'outline',
            },
            {
                label: 'انتشار تغییرات',
                icon: 'arrowUpward400Linear',
                actionKey: 'publish',
                variant: 'primary',
            },
        ],
    },
    about: {
        title: 'درباره ما',
        subtitle: 'بخش‌های صفحه «درباره ما» را ویرایش و منتشر کنید',
        buttons: [
            {
                label: 'انتشار تغییرات',
                icon: 'arrowUpward400Linear',
                actionKey: 'publish',
                variant: 'primary',
            },
        ],
    },
    'work-with-us': {
        title: 'همکاری با ما',
        subtitle: 'شرایط، مراحل و قوانین همکاری عمده‌فروشی',
        buttons: [
            {
                label: 'انتشار تغییرات',
                icon: 'arrowUpward400Linear',
                actionKey: 'publish',
                variant: 'primary',
            },
        ],
    },
    faq: {
        title: 'سوالات متداول',
        subtitle: 'مدیریت پرسش و پاسخ‌های فروشگاه – ۶ سوال',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'fileCheck400Linear',
                actionKey: 'export-excel',
                variant: 'outline',
            },
            {
                label: 'ثبت سوال جدید',
                icon: 'addSm400Broken',
                actionKey: 'add-faq',
                variant: 'primary',
            },
        ],
    },
    blog: {
        title: 'وبلاگ',
        subtitle: 'مدیریت مقالات و محتوای آموزشی فروشگاه — ۶ مقاله',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'fileCheck400Linear',
                actionKey: 'export-excel',
                variant: 'outline',
            },
            {
                label: 'افزودن مقاله',
                icon: 'addSm400Broken',
                href: '/admin/content-managment/blog/add',
                variant: 'primary',
            },
        ],
    },
    'blog-add': {
        title: 'افزودن مقاله جدید',
        subtitle: 'فیلدهای ستاره‌دار الزامی هستند',
    },
    'blog-edit': {
        title: 'ویرایش مقاله',
        subtitle: 'فیلدهای ستاره‌دار الزامی هستند',
    },
    contact: {
        title: 'تماس با ما',
        subtitle: 'اطلاعات تماس فروشگاه — در فوتر و صفحه تماس عمومی نمایش داده می‌شود',
    },
    certificates: {
        title: 'گواهی‌ها و مجوزها',
        subtitle: 'مدیریت گواهی‌ها، مجوزها و استانداردهای فروشگاه',
    },
    liecense: {
        title: 'گواهی‌ها و مجوزها',
        subtitle: 'مدیریت گواهی‌ها، مجوزها و استانداردهای فروشگاه',
        buttons: [
            {
                label: 'بارگذاری سند',
                icon: 'upload300Linear',
                href: '/admin/content-managment/liecense/new',
                variant: 'primary',
            },
            {
                label: 'اضافه کردن گواهی',
                icon: 'addSm400Linear',
                href: '/admin/content-managment/liecense/new',
                variant: 'outline',
            },
        ],
    },
    'liecense-new': {
        title: 'بارگذاری گواهی جدید',
        subtitle: 'فیلدهای ستاره‌دار الزامی هستند',
    },
    'liecense-details': {
        title: 'جزئیات سند',
        subtitle: 'اطلاعات صدور و فایل مجوز',
        buttons: [
            {
                label: 'ویرایش',
                icon: 'editSquare400Linear',
                actionKey: 'edit-liecense',
                variant: 'primary',
            },
            {
                label: 'دانلود',
                icon: 'download400Linear',
                actionKey: 'download-liecense',
                variant: 'outline',
            },
        ],
    },
}

export const getContentSectionKey = (sub: string): ContentSubParam =>
    CONTENT_SUB_PARAMS.includes(sub as ContentSubParam)
        ? (sub as ContentSubParam)
        : 'dashboard'

export const getContentSectionKeyFromPath = (
    pathname: string,
    searchParams: Pick<URLSearchParams, 'get'>
): ContentSubParam | null => {
    if (pathname.startsWith('/admin/content-managment/liecense/new')) {
        return 'liecense-new'
    }
    if (/^\/admin\/content-managment\/liecense\/[^/]+\/?$/.test(pathname)) {
        return 'liecense-details'
    }
    if (
        pathname === '/admin/content-managment/liecense' ||
        pathname === '/admin/content-managment/liecense/'
    ) {
        return 'liecense'
    }
    if (pathname.startsWith('/admin/content-managment/blog/edit')) {
        return 'blog-edit'
    }
    if (pathname.startsWith('/admin/content-managment/blog/add')) {
        return 'blog-add'
    }

    const sub = searchParams.get('sub')
    if (!sub) return 'dashboard'

    return CONTENT_SUB_PARAMS.includes(sub as ContentSubParam)
        ? (sub as ContentSubParam)
        : 'dashboard'
}
