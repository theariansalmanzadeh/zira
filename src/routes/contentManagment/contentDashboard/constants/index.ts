import type { IconLabel } from '@/src/shared/types/icon'

export type ContentSummaryCard = {
    id: string
    title: string
    value: number
    suffix: string
    icon: IconLabel
    iconContainerClassName: string
    iconClassName: string
}

export const CONTENT_SUMMARY_CARDS: ContentSummaryCard[] = [
    {
        id: 'published-pages',
        title: 'صفحات منتشرشده',
        value: 6,
        suffix: 'از ۸',
        icon: 'description400Linear',
        iconContainerClassName: 'rounded-card-sm bg-success-container p-1.5',
        iconClassName: 'size-6! text-success',
    },
    {
        id: 'home-blocks',
        title: 'بلوک صفحه اصلی',
        value: 9,
        suffix: 'بلوک',
        icon: 'dashboard400Linear',
        iconContainerClassName: 'rounded-card-sm bg-primary-container p-1.5',
        iconClassName: 'size-6! text-primary',
    },
    {
        id: 'blog-posts',
        title: 'مقالات وبلاگ',
        value: 6,
        suffix: 'مقاله',
        icon: 'news400Linear',
        iconContainerClassName: 'rounded-card-sm bg-info-container p-1.5',
        iconClassName: 'size-6! text-info',
    },
    {
        id: 'faqs',
        title: 'سوالات متداول',
        value: 6,
        suffix: 'سوال',
        icon: 'help400Linear',
        iconContainerClassName: 'rounded-card-sm bg-[#EDE7F6] p-1.5',
        iconClassName: 'size-6! text-[#7B61A8]',
    },
]

export type ContentActivityItem = {
    id: string
    title: string
    by: string
    time: string
    dotContainerClassName: string
    dotClassName: string
}

export const CONTENT_RECENT_ACTIVITIES: ContentActivityItem[] = [
    {
        id: 'activity-1',
        title: 'بلوک «فروش‌های ویژه» ویرایش شد',
        by: 'نگار سلیمی',
        time: '۳۰ دقیقه پیش',
        dotContainerClassName: 'bg-warning-container text-warning',
        dotClassName: 'bg-warning',
    },
    {
        id: 'activity-2',
        title: 'مقاله «راهنمای انتخاب سایز سوتین» منتشر شد',
        by: 'تیم محتوا',
        time: '۲ ساعت پیش',
        dotContainerClassName: 'bg-success-container text-success',
        dotClassName: 'bg-success',
    },
    {
        id: 'activity-3',
        title: 'سوال جدید در گروه «پارچه و مراقبت» افزوده شد',
        by: 'نگار سلیمی',
        time: 'دیروز',
        dotContainerClassName: 'bg-[#EDE7F6] text-[#7B61A8]',
        dotClassName: 'bg-[#7B61A8]',
    },
    {
        id: 'activity-4',
        title: 'گواهی استاندارد نساجی به‌روزرسانی شد',
        by: 'واحد کیفیت',
        time: '۳ روز پیش',
        dotContainerClassName: 'bg-info-container text-info',
        dotClassName: 'bg-info',
    },
    {
        id: 'activity-5',
        title: 'اطلاعات تماس فروشگاه ویرایش شد',
        by: 'نگار سلیمی',
        time: 'هفته گذشته',
        dotContainerClassName: 'bg-primary-container text-primary',
        dotClassName: 'bg-primary',
    },
]
