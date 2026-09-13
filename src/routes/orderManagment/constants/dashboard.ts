import { IconLabel } from '@/src/shared/types/icon'

export type OrderSummaryStat = {
    bodyTitle: string
    value: number
    headerIcon: IconLabel
    headerIconClassName: string
}

export const ORDER_SUMMARY_STATS: OrderSummaryStat[] = [
    {
        bodyTitle: 'تعداد سفارش‌ها',
        value: 267,
        headerIcon: 'order300Linear',
        headerIconClassName:
            'rounded-card-sm p-1 text-on-surface-variant bg-surface-container-high',
    },
    {
        bodyTitle: 'در انتظار تایید',
        value: 19,
        headerIcon: 'checkCircle300Linear',
        headerIconClassName:
            'rounded-card-sm p-1 text-on-warning-container bg-warning-container',
    },
    {
        bodyTitle: 'در حال آماده‌سازی',
        value: 27,
        headerIcon: 'refresh300Linear',
        headerIconClassName:
            'rounded-card-sm p-1 text-on-success-container bg-success-container',
    },
    {
        bodyTitle: 'درخواست پیش‌سفارش',
        value: 7,
        headerIcon: 'receipt300Linear',
        headerIconClassName: 'rounded-card-sm p-1 text-info bg-info-container',
    },
]

export const ORDER_ALERTS = [
    {
        title: '۲۴ سفارش در انتظار تایید حسابدار',
        description: 'قدیمی‌ترین: ۶ ساعت پیش',
    },
    {
        title: '۵ پیش‌سفارش در انتظار بیعانه',
        description: 'مهلت بیعانه تا امروز',
    },
    {
        title: 'سفارش PO-982020 موجودی ناکافی',
        description: '۲ قلم نیاز به تامین',
    },
    {
        title: '۳ فاکتور نزدیک تاریخ تسویه',
        description: 'در ۲ روز آینده',
    },
]

export const ORDER_STATUS_BREAKDOWN = [
    { label: 'تهران مرکزی', percent: 62, value: '۲.۹ میلیارد' },
    { label: 'شعبه کرج', percent: 30, value: '۱.۳ میلیارد' },
    { label: 'شعبه اصفهان', percent: 4, value: '۴۸۰ میلیون' },
    { label: 'شعبه اصفهان', percent: 2, value: '۲۱۰ میلیون' },
    { label: 'شعبه اصفهان', percent: 2, value: '۱۸۰ میلیون' },
    { label: 'شعبه مشهد', percent: 2, value: '۱۵۰ میلیون' },
    { label: 'تهران غرب', percent: 2, value: '۱۲۰ میلیون' },
]

export const ORDER_QUICK_ACCESS_ITEMS = [
    { label: 'لیست شعب', value: 12, href: '/admin/order-managment/order-list' },
    { label: 'انتقال بین شعب', value: 2, href: '/admin/branches?sub=list' },
    { label: 'کارمندان', value: 27, href: '/admin/order-managment?sub=requests' },
    { label: 'موجودی شعب', value: '-', href: '/admin/branches?sub=list' },
]
