import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type PackVisibility = 'public' | 'customer-group' | 'hidden'

export type PackListItem = {
    id: string
    name: string
    itemCode: string
    itemName: string
    brand: string
    model: string
    variety: string
    packCount: string
    price: string
    available: string
    visibility: PackVisibility
}

export const PACK_VISIBILITY_LABEL: Record<PackVisibility, string> = {
    public: 'نمایش عمومی',
    'customer-group': 'گروه مشتریان',
    hidden: 'عدم نمایش',
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'item', header_label: 'آیتم', isChecked: true },
    { id: 'brandModel', header_label: 'برند / مدل', isChecked: true },
    { id: 'variety', header_label: 'الگوی تنوع', isChecked: true },
    { id: 'packCount', header_label: 'کالا در پک', isChecked: true },
    { id: 'price', header_label: 'قیمت آیتم', isChecked: true },
    { id: 'available', header_label: 'قابل عرضه', isChecked: true },
    { id: 'visibility', header_label: 'وضعیت نمایش', isChecked: true },
]

export const PACKS_LIST_DUMMY: PackListItem[] = [
    {
        id: 'pack-1',
        name: 'پک ۶ عددی شورت زنانه',
        itemCode: 'IT-2001',
        itemName: 'شورت زنانه',
        brand: 'لمیس',
        model: 'زر',
        variety: 'رنگ ثابت — چند سایز',
        packCount: '۶ عدد',
        price: '۴۵۲,۰۰۰ ت',
        available: '۰ عدد',
        visibility: 'public',
    },
    {
        id: 'pack-2',
        name: 'پک ۴ عددی ست خواب',
        itemCode: 'IT-1844',
        itemName: 'ست لباس خواب',
        brand: 'ویکتوریا',
        model: 'ساتن',
        variety: 'چند رنگ — سایز ثابت',
        packCount: '۴ عدد',
        price: '۸۹۰,۰۰۰ ت',
        available: '۱۲ عدد',
        visibility: 'customer-group',
    },
    {
        id: 'pack-3',
        name: 'پک ۳ عددی تاپ ورزشی',
        itemCode: 'IT-9902',
        itemName: 'تاپ ورزشی',
        brand: 'نیکس',
        model: 'اسپرت',
        variety: 'رنگ ثابت — یک سایز',
        packCount: '۳ عدد',
        price: '۳۱۰,۰۰۰ ت',
        available: '۰ عدد',
        visibility: 'hidden',
    },
]
