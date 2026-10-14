import type { IconLabel } from '@/src/shared/types/icon'

export type AddProductItem = {
    id: string
    productName: string
    imgUrl?: string
    sku: string
    brand: string
    category: string
    colorLabel?: string
    colorHex?: string
    stock: string
    status: 'active' | 'diactive' | 'pending'
    quantity?: number
}

export type AddProductModalData = {
    selectedIds?: string[]
    hasQuantity?: boolean
    quantities?: Record<string, number>
    onConfirm?: (products: AddProductItem[]) => void
    onSubmit?: (products: AddProductItem[]) => void
    addProduct?: (product: AddProductItem) => void
    removeProduct?: (id: string) => void
}

export type AdvancedSearchValues = {
    mainCategory: string
    subCategory: string
    turnover: string
    size: string
    color: string
    model: string
    query: string
}

export const ADD_PRODUCT_DUMMY: AddProductItem[] = [
    {
        id: '1',
        productName: 'بادی گیپور',
        imgUrl: '/images/product1.jpg',
        sku: '۷۶۲۳-۷۳۵۲',
        brand: 'Lorenzo',
        category: 'لباس زیر زنانه',
        colorLabel: 'مشکی',
        colorHex: '#1A1A1A',
        stock: '۴۲۰ آیتم در ۲ متغیر',
        status: 'pending',
    },
    {
        id: '2',
        productName: 'ست لباس خواب ساتن',
        imgUrl: '/images/product1.jpg',
        sku: '۸۴۱۲-۹۰۳۱',
        brand: 'Victoria',
        category: 'لباس خواب',
        colorLabel: 'کرم',
        colorHex: '#E8D5C4',
        stock: '۱۵۶ آیتم در ۳ متغیر',
        status: 'active',
    },
    {
        id: '3',
        productName: 'شورت کشی مشکی',
        imgUrl: '/images/product1.jpg',
        sku: '۵۵۰۱-۲۲۸۷',
        brand: 'Lorenzo',
        category: 'لباس زیر زنانه',
        colorLabel: 'گلبهی',
        colorHex: '#E8A0A0',
        stock: '۸۹۰ آیتم در ۱ متغیر',
        status: 'active',
    },
    {
        id: '4',
        productName: 'سوتین پوش دار',
        imgUrl: '/images/product1.jpg',
        sku: '۳۳۰۹-۶۱۴۴',
        brand: 'Calvin Klein',
        category: 'لباس زیر زنانه',
        stock: '۲۴۵ آیتم در ۴ متغیر',
        status: 'diactive',
    },
    {
        id: '5',
        productName: 'تاپ ورزشی زنانه',
        imgUrl: '/images/product1.jpg',
        sku: '۹۹۲۰-۴۵۶۳',
        brand: 'Nike',
        category: 'لباس ورزشی',
        stock: '۳۱۲ آیتم در ۲ متغیر',
        status: 'pending',
    },
]

const ALL_OPTION = [{ label: 'همه', value: 'all' }]

export const MAIN_CATEGORY_OPTIONS = [
    ...ALL_OPTION,
    { label: 'لباس زنانه', value: 'women' },
    { label: 'لباس مردانه', value: 'men' },
]

export const SUB_CATEGORY_OPTIONS = [
    ...ALL_OPTION,
    { label: 'لباس زیر', value: 'underwear' },
    { label: 'لباس خواب', value: 'sleepwear' },
]

export const TURNOVER_OPTIONS = [
    ...ALL_OPTION,
    { label: 'پرفروش', value: 'hot' },
    { label: 'متوسط', value: 'medium' },
    { label: 'کم‌گردش', value: 'low' },
]

export const SIZE_OPTIONS = [
    ...ALL_OPTION,
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
]

export const COLOR_OPTIONS = [
    ...ALL_OPTION,
    { label: 'مشکی', value: 'black' },
    { label: 'سفید', value: 'white' },
]

export const MODEL_OPTIONS = [
    ...ALL_OPTION,
    { label: 'کلاسیک', value: 'classic' },
    { label: 'اسپرت', value: 'sport' },
]

export const STATUS_META: Record<
    AddProductItem['status'],
    { text: string; variant: 'success' | 'warning' | 'tonal'; icon: IconLabel }
> = {
    active: { text: 'فعال', variant: 'success', icon: 'checkCircle' },
    diactive: {
        text: 'غیرفعال',
        variant: 'warning',
        icon: 'closeCircle400Linear',
    },
    pending: { text: 'در حال بررسی', variant: 'tonal', icon: 'clockDashed' },
}

export const TABLE_HEADERS = [
    '',
    'عنوان محصول',
    'SKU',
    'برند',
    'دسته‌بندی',
    'موجودی',
    'وضعیت',
] as const

export const ADVANCED_SEARCH_DEFAULTS: AdvancedSearchValues = {
    mainCategory: 'all',
    subCategory: 'all',
    turnover: 'all',
    size: 'all',
    color: 'all',
    model: 'all',
    query: '',
}
