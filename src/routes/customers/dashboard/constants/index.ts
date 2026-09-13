export const CUSTOMER_ALERTS = [
    { title: '-', description: '-' },
    { title: '-', description: '-' },
    { title: '-', description: '-' },
    { title: '-', description: '-' },
]

export const TOP_CUSTOMER_SORT_OPTIONS = [
    { label: 'حجم سفارش', value: 'volume' },
    { label: 'خوش حسابی', value: 'credit' },
] as const

export type TopCustomerSort = (typeof TOP_CUSTOMER_SORT_OPTIONS)[number]['value']

export const TOP_CUSTOMERS = [
    { name: 'آرمان محمدی', orders: 12, amount: 178060000 },
    { name: 'مهیار عظیمی', orders: 12, amount: 178060000 },
    { name: 'عرفان مدرس', orders: 12, amount: 178060000 },
    { name: 'سارا محدث', orders: 12, amount: 178060000 },
    { name: 'آرام کشاورزی', orders: 12, amount: 178060000 },
]

export const CUSTOMER_QUICK_ACCESS_ITEMS = [
    { label: 'درخواست‌ها', href: '/admin/customers?sub=requests' },
    { label: 'مشتریان فعال', href: '/admin/customers?sub=list' },
    { label: 'سطوح اعتبار', href: '/admin/customers?sub=list' },
]

export const CUSTOMER_SUMMARY_STATS_DUMMY = {
    newCustomersNumber: 59,
    newCustomersPercent: 4,
    loyalCustomersNumber: 189,
    loyalCustomersPercent: 7.2,
    avgPaymentTimeNumber: 2.4,
    avgPaymentTimePercent: -3.9,
    avgOrderVolumeNumber: 38000000,
    avgOrderVolumePercent: 15,
} as const
