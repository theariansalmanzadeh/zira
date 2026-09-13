export type DashboardKpi = {
    label: string
    value: string
    unit?: string
    showCurrency?: boolean
    valueClassName?: string
}

export const DASHBOARD_KPIS: DashboardKpi[] = [
    {
        label: 'جمع مبلغ خرید',
        value: '۱٫۲',
        unit: 'میلیارد',
        showCurrency: true,
        valueClassName: 'text-on-surface',
    },
    {
        label: 'جمع سودآوری',
        value: '۲۴۸',
        unit: 'میلیون',
        showCurrency: true,
        valueClassName: 'text-success',
    },
    {
        label: 'میانگین زمان پرداخت',
        value: '۲٫۱',
        unit: 'روز',
        valueClassName: 'text-on-surface',
    },
    {
        label: 'امتیاز خوش‌حسابی',
        value: '۹۲',
        unit: 'از ۱۰۰',
        valueClassName: 'text-warning',
    },
    {
        label: 'مدت همکاری',
        value: '۳٫۲',
        unit: 'سال',
        valueClassName: 'text-on-surface',
    },
    {
        label: 'تعداد سفارش',
        value: '۴۷',
        unit: 'سفارش',
        valueClassName: 'text-on-surface',
    },
    {
        label: 'مرجوعی',
        value: '٪۱٫۸',
        valueClassName: 'text-error',
    },
    {
        label: 'سقف اعتبار کل',
        value: '۳۵۰',
        unit: 'میلیون',
        showCurrency: true,
        valueClassName: 'text-primary',
    },
]

export type ChequeStatusItem = {
    id: string
    label: string
    count: number
    amount: number
    icon: 'checkLg300Linear' | 'warning400Linear' | 'closeLg300Linear'
    iconBoxClassName: string
    iconClassName: string
    amountClassName: string
}

export const CHEQUE_STATUS_ITEMS: ChequeStatusItem[] = [
    {
        id: 'passed',
        label: 'چک‌های پاس شده',
        count: 31,
        amount: 412000000,
        icon: 'checkLg300Linear',
        iconBoxClassName: 'bg-success-container',
        iconClassName: 'text-success',
        amountClassName: 'text-success',
    },
    {
        id: 'pending',
        label: 'چک‌های پاس نشده',
        count: 2,
        amount: 18000000,
        icon: 'warning400Linear',
        iconBoxClassName: 'bg-warning-container',
        iconClassName: 'text-warning',
        amountClassName: 'text-warning',
    },
    {
        id: 'bounced',
        label: 'چک‌های برگشتی',
        count: 1,
        amount: 9000000,
        icon: 'closeLg300Linear',
        iconBoxClassName: 'bg-error-container',
        iconClassName: 'text-error',
        amountClassName: 'text-error',
    },
]
