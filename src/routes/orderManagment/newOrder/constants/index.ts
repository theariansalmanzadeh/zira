import type {
    CartItem,
    CreateOrderCustomer,
    PaymentOption,
} from '../types'

export const CREATE_ORDER_STEPS = [
    { step: 1, label: 'مشتری' },
    { step: 2, label: 'اقلام' },
    { step: 3, label: 'تسویه' },
    { step: 4, label: 'تایید' },
] as const

export const ORDER_CUSTOMERS: CreateOrderCustomer[] = [
    {
        id: 'c-1',
        name: 'آرا صفوی',
        phone: '۰۹۱۲ ۴۴۸ ۲۲۰۱',
        level: 'gold',
        initial: 'آ',
        swatch: '#D98EA8',
    },
    {
        id: 'c-2',
        name: 'مرجان محمدی',
        phone: '۰۹۳۵ ۱۲۰ ۸۸۴۵',
        level: 'silver',
        initial: 'م',
        swatch: '#8FB6D6',
    },
    {
        id: 'c-3',
        name: 'داریوش طالبی',
        phone: '۰۹۱۰ ۷۷۲ ۰۰۹۸',
        level: 'gold',
        initial: 'د',
        swatch: '#C7A87C',
    },
]

export const INITIAL_CART_ITEMS: CartItem[] = [
    {
        id: 'item-1',
        name: 'ست لباس خواب ساتن',
        unitPrice: 398000,
        qty: 12,
        swatch: '#D98EA8',
    },
    {
        id: 'item-2',
        name: 'سوتین بدون فنر دانتل',
        unitPrice: 286000,
        qty: 6,
        swatch: '#8FB6D6',
    },
    {
        id: 'item-3',
        name: 'شورت نخی زنانه (پک ۳ عددی)',
        unitPrice: 172000,
        qty: 24,
        swatch: '#C7A87C',
    },
]

export const PAYMENT_OPTIONS: PaymentOption[] = [
    {
        type: 'cash',
        label: 'نقدی',
        sub: 'پرداخت کامل هنگام تحویل',
        icon: '💵',
        iconBgClassName: 'bg-success-container',
        iconFgClassName: 'text-on-success-container',
    },
    {
        type: 'cheque',
        label: 'چکی',
        sub: 'پرداخت با چک مدت‌دار',
        icon: '🧾',
        iconBgClassName: 'bg-primary-container',
        iconFgClassName: 'text-on-primary-container',
    },
    {
        type: 'credit',
        label: 'اعتباری',
        sub: 'از سقف اعتبار مشتری',
        icon: '💳',
        iconBgClassName: 'bg-info-container',
        iconFgClassName: 'text-info',
    },
]

export const CUSTOMER_LEVEL_STYLES = {
    gold: {
        label: 'طلایی',
        className: 'text-[#C8841A] bg-[#FBF0E2]',
    },
    silver: {
        label: 'نقره‌ای',
        className: 'text-[#7C8A99] bg-[#EEF1F4]',
    },
    bronze: {
        label: 'برنزی',
        className: 'text-[#A9744B] bg-[#F4ECE3]',
    },
} as const
