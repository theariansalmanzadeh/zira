import type { EditSectionStatus } from '../components/EditSectionView'

export type WorkWithUsSectionItem = {
    id: string
    title: string
    body: string
    page_display?: string
    visible: boolean
    status: EditSectionStatus
    isNew?: boolean
}

export const WORK_WITH_US_SECTIONS: WorkWithUsSectionItem[] = [
    {
        id: 'coop-intro',
        title: 'معرفی همکاری',
        body: 'فرصت همکاری با زیرا مارکت برای عمده‌فروشان و فروشگاه‌داران با شرایط ویژه و پشتیبانی اختصاصی.',
        visible: true,
        status: 'published',
    },
    {
        id: 'coop-steps',
        title: 'مراحل همکاری',
        body: '۱. ثبت درخواست ۲. بررسی پروانه کسب ۳. تایید و تخصیص سطح اعتبار ۴. شروع سفارش‌گذاری.',
        visible: true,
        status: 'published',
    },
    {
        id: 'coop-terms',
        title: 'شرایط همکاری',
        body: 'داشتن پروانه کسب معتبر و حداقل یک سال سابقه فعالیت در حوزه پوشاک.',
        visible: true,
        status: 'draft',
    },
    {
        id: 'wholesale-rules',
        title: 'قوانین عمده‌فروشی',
        body: 'قیمت‌گذاری پلکانی بر اساس حجم سفارش و سطح همکاری مشتری.',
        visible: true,
        status: 'published',
    },
    {
        id: 'settlement',
        title: 'شرایط تسویه حساب',
        body: 'امکان تسویه نقدی، چکی و اعتباری بر اساس سطح خوش‌حسابی مشتری.',
        visible: true,
        status: 'published',
    },
    {
        id: 'min-order',
        title: 'حداقل سفارش',
        body: 'حداقل مبلغ سفارش برای عمده‌فروشان ۵ میلیون تومان است.',
        visible: true,
        status: 'draft',
    },
]
