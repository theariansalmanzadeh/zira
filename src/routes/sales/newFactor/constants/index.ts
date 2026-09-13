import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import type { CartItem, FactorCustomer } from '../types'

export const CREATE_FACTOR_STEPS = [
    { step: 1, label: 'مشتری' },
    { step: 2, label: 'اقلام' },
    { step: 3, label: 'خلاصه' },
] as const

export const FACTOR_CUSTOMERS: FactorCustomer[] = [
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
        qty: 1,
        swatch: '#C7A87C',
    },
]

export const WAREHOUSE_OPTIONS: FormDropdownOption[] = [
    { label: 'مرکزی تهران', value: 'tehran-central' },
    { label: 'انبار کرج', value: 'karaj' },
    { label: 'انبار اصفهان', value: 'isfahan' },
]

export const SETTLEMENT_TYPE_OPTIONS: FormDropdownOption[] = [
    { label: 'نقدی', value: 'cash' },
    { label: 'چکی', value: 'cheque' },
    { label: 'اعتباری', value: 'credit' },
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

export const TAX_RATE = 0.1
