import type { IconLabel } from '@/src/shared/types/icon'

export type InventorySummaryCard = {
    icon: IconLabel
    iconClassName: string
    title: string
    value: string
    suffix: string
    footerIcon: IconLabel
    footerIconClassName: string
    footerText: string
    footerTextClassName: string
}

export const INVENTORY_SUMMARY_CARDS: InventorySummaryCard[] = [
    {
        icon: 'package2',
        iconClassName:
            'rounded-card-sm bg-success-container p-1 text-on-success-container',
        title: 'تعداد کل اقلام موجود',
        value: '18,420',
        suffix: 'عدد',
        footerIcon: 'keyboardArrowUp400Linear',
        footerIconClassName: 'text-success',
        footerText: '3.2% بیشتر',
        footerTextClassName: 'text-success',
    },
    {
        icon: 'analytics',
        iconClassName: 'rounded-card-sm bg-info-container p-1 text-on-info-container',
        title: 'موجودی ریالی انبار',
        value: '4,8',
        suffix: 'میلیارد تومان',
        footerIcon: 'keyboardArrowUp400Linear',
        footerIconClassName: 'text-success',
        footerText: '6.1% بیشتر',
        footerTextClassName: 'text-success',
    },
    {
        icon: 'warning400Linear',
        iconClassName:
            'rounded-card-sm bg-error-container p-1 text-on-error-container',
        title: 'کالاهای زیر نقطه سفارش',
        value: '126',
        suffix: 'قلم',
        footerIcon: 'keyboardArrowUp400Linear',
        footerIconClassName: 'text-error',
        footerText: '4 قلم بیشتر',
        footerTextClassName: 'text-error',
    },
    {
        icon: 'schedule400Linear',
        iconClassName:
            'rounded-card-sm bg-warning-container p-1 text-on-warning-container',
        title: 'میانگین گردش موجودی',
        value: '38',
        suffix: 'روز',
        footerIcon: 'keyboardArrowUp400Linear',
        footerIconClassName: 'text-success',
        footerText: '2 روز سریع‌تر',
        footerTextClassName: 'text-success',
    },
]

export const STOCK_FLOW_DATA = [
    { date: 'شنبه', inflow: 145, outflow: 52 },
    { date: 'یکشنبه', inflow: 168, outflow: 48 },
    { date: 'دوشنبه', inflow: 132, outflow: 61 },
    { date: 'سه‌شنبه', inflow: 189, outflow: 55 },
    { date: 'چهارشنبه', inflow: 156, outflow: 44 },
    { date: 'پنج‌شنبه', inflow: 172, outflow: 58 },
    { date: 'جمعه', inflow: 98, outflow: 36 },
]

export const INVENTORY_ALERTS = [
    {
        title: '27 کالا زیر نقطه سفارش',
        description: 'نیازمند درخواست تأمین فوری',
    },
    {
        title: '12 کالای راکد بالای ۹۰ روز',
        description: 'ارزش رسوب: ۲۱۰ م.ت',
    },
    {
        title: 'اتمام بیمه انبار مرکزی',
        description: '۸ روز تا سررسید',
    },
    {
        title: '۴ رسید در انتظار تأیید',
        description: 'از تأمین‌کنندگان',
    },
]

export const QUICK_ACCESS_ITEMS = [
    {
        label: 'لیست کالاهای کم موجود',
        value: 12,
        href: '/admin/inventory-managment?sub=low-stock',
    },
    {
        label: 'رسوب انبار',
        value: 2,
        href: '/admin/inventory-managment?sub=stagnant-stock',
    },
    {
        label: 'حواله‌های ورود در انتظار',
        value: 27,
        href: '/admin/inventory-managment?sub=goods-entry',
    },
    {
        label: 'حواله‌های خروج در انتظار',
        value: 8,
        href: '/admin/inventory-managment?sub=preparation-exit',
    },
]

export type TransferSummaryItem = {
    id: string
    origin: string
    destination: string
    status: 'transferred' | 'pending' | 'in-transit'
}

export const TRANSFER_SUMMARY_ITEMS: TransferSummaryItem[] = [
    {
        id: 'TRF-3301',
        origin: 'مرکزی تهران',
        destination: 'شعبه کرج',
        status: 'transferred',
    },
    {
        id: 'TRF-3300',
        origin: 'مرکزی تهران',
        destination: 'شعبه اصفهان',
        status: 'pending',
    },
    {
        id: 'TRF-3299',
        origin: 'شعبه کرج',
        destination: 'مرکزی تهران',
        status: 'in-transit',
    },
]
