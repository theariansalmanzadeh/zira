export const DURATION_OPTIONS = [
    { label: '۱ هفته', value: '1-week' },
    { label: '۲ هفته', value: '2-weeks' },
    { label: '۱ ماه', value: '1-month' },
]

export const STATUS_OPTIONS = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]

export const CODE_TYPE_TABS = [
    { label: 'درصدی', value: 'percentage' },
    { label: 'مبلغی', value: 'amount' },
    { label: 'ارسال رایگان', value: 'free-shipping' },
] as const

export type CodeType = (typeof CODE_TYPE_TABS)[number]['value']

export const SCOPE_OPTIONS = [
    {
        title: 'همه محصولات',
        value: 'all-products',
    },
    {
        title: 'محصولات انتخابی',
        value: 'selected-products',
    },
    {
        title: 'همه مشتریان',
        value: 'all-customers',
    },
    {
        title: 'مشتریان انتخابی',
        value: 'selected-customers',
    },
    {
        title: 'بر اساس سطح مشتری',
        value: 'customer-level',
    },
] as const

export type ScopeType = (typeof SCOPE_OPTIONS)[number]['value']

export const CUSTOMER_LEVEL_OPTIONS = [
    { label: 'طلایی', value: 'GOLD' },
    { label: 'نقره‌ای', value: 'SILVER' },
    { label: 'برنزی', value: 'BRONZE' },
] as const

export type CustomerLevel = (typeof CUSTOMER_LEVEL_OPTIONS)[number]['value']

export const CUSTOMER_GROUP_OPTIONS = [
    { label: 'باشگاه وفاداری', value: 'loyalty-club' },
    { label: 'مشتریان VIP', value: 'vip' },
    { label: 'عمده‌فروشان', value: 'wholesalers' },
]

export type SelectedProduct = {
    id: string
    code: string
    name: string
    price: number
    stock: number
}

export const SELECTED_PRODUCTS_DUMMY: SelectedProduct[] = [
    {
        id: '1',
        code: 'PRD-1001',
        name: 'هودی زمستانه زنانه',
        price: 890000,
        stock: 42,
    },
    {
        id: '2',
        code: 'PRD-1002',
        name: 'کفش ورزشی مردانه',
        price: 1250000,
        stock: 18,
    },
    {
        id: '3',
        code: 'PRD-1003',
        name: 'ساعت هوشمند',
        price: 3200000,
        stock: 7,
    },
]
