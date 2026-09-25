import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'

export const OPEN_ADD_FAQ_EVENT = 'content-managment:open-add-faq'
export const UPSERT_FAQ_EVENT = 'content-managment:upsert-faq'

export type FaqCategoryId =
    | 'all'
    | 'material'
    | 'sizes'
    | 'models'
    | 'fabric'

export type FaqCategoryKey = Exclude<FaqCategoryId, 'all'>

export type FaqRowData = {
    id: string
    question: string
    answer: string
    category: string
    createdAt: string
    visible: boolean
}

export const FAQ_CATEGORY_LABELS: Record<FaqCategoryKey, string> = {
    material: 'جنس محصولات',
    sizes: 'اندازه‌ها و سایزها',
    models: 'تفاوت مدل‌ها',
    fabric: 'پارچه و مراقبت',
}

export const FAQ_CATEGORY_PILL: Record<
    FaqCategoryKey,
    { text: string; variant: VariantProps<typeof PillVariants>['variant'] }
> = {
    material: { text: FAQ_CATEGORY_LABELS.material, variant: 'error' },
    sizes: { text: FAQ_CATEGORY_LABELS.sizes, variant: 'info' },
    models: { text: FAQ_CATEGORY_LABELS.models, variant: 'tonal' },
    fabric: { text: FAQ_CATEGORY_LABELS.fabric, variant: 'success' },
}

export const getFaqCategoryPill = (category: string) =>
    FAQ_CATEGORY_PILL[category as FaqCategoryKey] ?? {
        text: category,
        variant: 'tonal' as const,
    }

export const FAQ_TOGGLE_BUTTON_VALUE = [
    { label: 'همه', value: 'all' },
    { label: 'جنس محصولات', value: 'material' },
    { label: 'اندازه‌ها و سایزها', value: 'sizes' },
    { label: 'تفاوت مدل‌ها', value: 'models' },
    { label: 'پارچه و مراقبت', value: 'fabric' },
] as const

export const FAQ_DUMMY: FaqRowData[] = [
    {
        id: '1',
        question: 'جنس محصولات زیرا از چه پارچه‌هایی است؟',
        answer:
            'بیشتر محصولات از پنبه، مودال و ویسکوز با کیفیت درجه یک تولید می‌شوند که نرمی و دوام بالایی دارند.',
        category: 'material',
        createdAt: '2025-12-01T00:00:00.000Z',
        visible: true,
    },
    {
        id: '2',
        question: 'جدول سایزبندی محصولات کجاست؟',
        answer:
            'در هر صفحه محصول جدول سایز اختصاصی قرار دارد؛ همچنین راهنمای کلی سایز در بخش وبلاگ موجود است.',
        category: 'sizes',
        createdAt: '2025-11-25T00:00:00.000Z',
        visible: true,
    },
    {
        id: '3',
        question: 'تفاوت مدل‌های سوتین بدون فنر و فنردار چیست؟',
        answer:
            'مدل بدون فنر راحتی بیشتری برای استفاده روزانه دارد و مدل فنردار فرم‌دهی بهتری ارائه می‌دهد.',
        category: 'models',
        createdAt: '2025-11-19T00:00:00.000Z',
        visible: true,
    },
    {
        id: '4',
        question: 'نحوه مراقبت و شست‌وشوی محصولات چگونه است؟',
        answer:
            'شست‌وشو با آب سرد، پرهیز از خشک‌کن داغ و اتوی ملایم برای حفظ کیفیت پارچه توصیه می‌شود.',
        category: 'fabric',
        createdAt: '2025-11-11T00:00:00.000Z',
        visible: true,
    },
    {
        id: '5',
        question: 'آیا امکان سفارش عمده با تخفیف وجود دارد؟',
        answer:
            'بله، عمده‌فروشان پس از تایید پروانه کسب از قیمت‌گذاری پلکانی و تخفیف ویژه بهره‌مند می‌شوند.',
        category: 'material',
        createdAt: '2025-11-03T00:00:00.000Z',
        visible: true,
    },
    {
        id: '6',
        question: 'پارچه محصولات ضدحساسیت است؟',
        answer:
            'محصولات خط پنبه‌ای ما با رنگ‌های استاندارد و بدون مواد حساسیت‌زا تولید می‌شوند.',
        category: 'fabric',
        createdAt: '2025-10-23T00:00:00.000Z',
        visible: true,
    },
]

export const filterFaqs = (
    items: FaqRowData[],
    category: FaqCategoryId | string
) => {
    if (!category || category === 'all') return items
    return items.filter((item) => item.category === category)
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'index', header_label: 'ردیف', isChecked: true, className: 'w-[72px]' },
    { id: 'question', header_label: 'سوال', isChecked: true },
    {
        id: 'category',
        header_label: 'گروه مرتبط',
        isChecked: true,
        className: 'w-[180px]',
    },
    {
        id: 'createdAt',
        header_label: 'تاریخ ایجاد',
        isChecked: true,
        className: 'w-[120px]',
    },
    {
        id: 'visible',
        header_label: 'نمایش',
        isChecked: true,
        className: 'w-[100px]',
    },
    {
        id: 'actions',
        header_label: 'عملیات',
        isChecked: true,
        className: 'w-[1%]',
    },
]
