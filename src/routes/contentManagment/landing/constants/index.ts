import type { IconLabel } from '@/src/shared/types/icon'
import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'
import {
    LANDING_SECTION_TYPE,
    type LandingSectionItem,
    type LandingSectionStatus,
    type LandingSectionType,
} from '../types'

export type {
    LandingSectionItem,
    LandingSectionStatus,
    LandingSectionType,
} from '../types'
export { LANDING_SECTION_TYPE } from '../types'

export const LANDING_STATUS_META: Record<
    LandingSectionStatus,
    {
        label: string
        pillVariant: VariantProps<typeof PillVariants>['variant']
        dotClassName: string
    }
> = {
    published: {
        label: 'منتشر شده',
        pillVariant: 'success',
        dotClassName: 'bg-success',
    },
    draft: {
        label: 'پیش‌نویس',
        pillVariant: 'warning',
        dotClassName: 'bg-warning',
    },
    hidden: {
        label: 'مخفی',
        pillVariant: 'tonal',
        dotClassName: 'bg-outline',
    },
}

export const LANDING_TYPE_STYLES: Record<
    LandingSectionType,
    { icon: IconLabel; iconBg: string; iconClassName: string }
> = {
    [LANDING_SECTION_TYPE.BANNER]: {
        icon: 'layers400Linear',
        iconBg: 'bg-warning-container',
        iconClassName: 'size-5! text-on-warning-container',
    },
    [LANDING_SECTION_TYPE.PRODUCT_SLIDE]: {
        icon: 'product400Linear',
        iconBg: 'bg-info-container',
        iconClassName: 'size-5! text-info',
    },
    [LANDING_SECTION_TYPE.BANNER_SLIDE]: {
        icon: 'dashboard400Linear',
        iconBg: 'bg-primary-container',
        iconClassName: 'size-5! text-primary',
    },
    [LANDING_SECTION_TYPE.BRANDS]: {
        icon: 'news400Linear',
        iconBg: 'bg-primary-container',
        iconClassName: 'size-5! text-primary',
    },
    [LANDING_SECTION_TYPE.FAQ]: {
        icon: 'help400Linear',
        iconBg: 'bg-info-container',
        iconClassName: 'size-5! text-info',
    },
}

export const LANDING_SECTIONS: LandingSectionItem[] = [
    {
        id: 'slideshow',
        title: 'اسلایدشو',
        status: 'draft',
        type: LANDING_SECTION_TYPE.BANNER_SLIDE,
        countLabel: '۳ بنر',
        actionLabel: 'بارگذاری تصویر',
        updatedAt: '۲ ساعت پیش',
    },
    {
        id: 'main-banners',
        title: 'بنرهای اصلی',
        status: 'published',
        type: LANDING_SECTION_TYPE.BANNER,
        countLabel: '۳ بنر',
        actionLabel: 'بارگذاری تصویر',
        updatedAt: 'دیروز',
    },
    {
        id: 'new-products',
        title: 'کالاهای جدید',
        status: 'published',
        type: LANDING_SECTION_TYPE.PRODUCT_SLIDE,
        countLabel: '۸ کالا',
        actionLabel: 'انتخاب کالا',
        updatedAt: 'دیروز',
    },
    {
        id: 'best-sellers',
        title: 'کالای پرفروش',
        status: 'published',
        type: LANDING_SECTION_TYPE.PRODUCT_SLIDE,
        countLabel: '۶ کالا',
        actionLabel: 'انتخاب کالا',
        updatedAt: '۳ روز پیش',
    },
    {
        id: 'brand-intro',
        title: 'معرفی برند',
        status: 'published',
        type: LANDING_SECTION_TYPE.BRANDS,
        countLabel: 'متن + CTA',
        actionLabel: 'ویرایش متن',
        updatedAt: 'هفته گذشته',
    },
    {
        id: 'production',
        title: 'فرآیند تولید',
        status: 'draft',
        type: LANDING_SECTION_TYPE.BRANDS,
        countLabel: 'متن',
        actionLabel: 'ویرایش متن',
        updatedAt: '۱ ساعت پیش',
    },
    {
        id: 'collection',
        title: 'معرفی کالکشن',
        status: 'published',
        type: LANDING_SECTION_TYPE.PRODUCT_SLIDE,
        countLabel: '۱۲ کالا',
        actionLabel: 'انتخاب کالا',
        updatedAt: '۴ روز پیش',
    },
    {
        id: 'specials',
        title: 'فروش‌های ویژه',
        status: 'published',
        type: LANDING_SECTION_TYPE.PRODUCT_SLIDE,
        countLabel: '۵ کالا',
        actionLabel: 'انتخاب کالا',
        updatedAt: '۳۰ دقیقه پیش',
    },
    {
        id: 'faq',
        title: 'سوالات متداول',
        status: 'published',
        type: LANDING_SECTION_TYPE.FAQ,
        countLabel: '۶ سوال',
        actionLabel: 'ویرایش سوالات',
        updatedAt: '۲ روز پیش',
    },
    {
        id: 'promo',
        title: 'پیام تبلیغاتی',
        status: 'hidden',
        type: LANDING_SECTION_TYPE.BANNER,
        countLabel: 'بنر متنی',
        actionLabel: 'ویرایش متن',
        updatedAt: '۲ هفته پیش',
    },
]

export const LANDING_INFO_TEXT =
    'ترتیب بلوک‌ها همان ترتیب نمایش در صفحه اصلی فروشگاه است. تغییرات تا زمان «انتشار» در حالت پیش‌نویس باقی می‌مانند.'

export const getLandingStatusCounts = (sections: LandingSectionItem[]) => ({
    published: sections.filter((section) => section.status === 'published')
        .length,
    draft: sections.filter((section) => section.status === 'draft').length,
    hidden: sections.filter((section) => section.status === 'hidden').length,
})
