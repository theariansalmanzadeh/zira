export type CampaignReportMetric = {
    label: string
    value: number
    change: number
    valueFormat?: 'number' | 'percent'
    changeSuffix?: 'percent' | 'items'
}

export type CampaignNatureTrendPoint = {
    month: string
    discount: number
    event: number
    bundle: number
}

export type CampaignSummaryRow = {
    id: string
    name: string
    nature: string
    startAt: string | null
    endAt: string | null
    orders: number
    sales: number
    conversionRate: number
}

export type CampaignComparisonStat = {
    label: string
    value: string
}

export type CampaignSalesBarItem = {
    name: string
    value: number
}

export const CAMPAIGN_REPORT_METRICS_DUMMY: CampaignReportMetric[] = [
    {
        label: 'کالای فعال در کمپین‌ها',
        value: 486,
        change: 62,
        valueFormat: 'number',
        changeSuffix: 'items',
    },
    {
        label: 'سهم کمپین‌ها از کل فروش',
        value: 34,
        change: 6,
        valueFormat: 'percent',
        changeSuffix: 'percent',
    },
    {
        label: 'میانگین تخفیف کمپین‌ها',
        value: 24,
        change: -2,
        valueFormat: 'percent',
        changeSuffix: 'percent',
    },
    {
        label: 'کالای ناموجود شده',
        value: 46,
        change: -12,
        valueFormat: 'number',
        changeSuffix: 'items',
    },
]

export const CAMPAIGN_NATURE_TREND_DUMMY: CampaignNatureTrendPoint[] = [
    { month: 'فروردین', discount: 35, event: 28, bundle: 18 },
    { month: 'اردیبهشت', discount: 48, event: 36, bundle: 20 },
    { month: 'خرداد', discount: 62, event: 44, bundle: 22 },
    { month: 'تیر', discount: 78, event: 52, bundle: 24 },
    { month: 'مرداد', discount: 95, event: 68, bundle: 26 },
    { month: 'شهریور', discount: 120, event: 82, bundle: 28 },
    { month: 'مهر', discount: 155, event: 105, bundle: 30 },
    { month: 'آبان', discount: 210, event: 140, bundle: 32 },
    { month: 'آذر', discount: 280, event: 185, bundle: 34 },
]

export const CAMPAIGN_SUMMARY_DUMMY: CampaignSummaryRow[] = [
    {
        id: '1',
        name: 'حراج پایان فصل پاییز',
        nature: 'تخفیفی',
        startAt: '2025-11-22T00:00:00.000Z',
        endAt: '2025-12-06T00:00:00.000Z',
        orders: 2410,
        sales: 820000000,
        conversionRate: 7.2,
    },
    {
        id: '2',
        name: 'شب یلدا',
        nature: 'مناسبتی',
        startAt: '2025-12-16T00:00:00.000Z',
        endAt: '2025-12-21T00:00:00.000Z',
        orders: 1860,
        sales: 540000000,
        conversionRate: 5.8,
    },
    {
        id: '3',
        name: 'پک زمستانه',
        nature: 'باندل',
        startAt: '2025-12-22T00:00:00.000Z',
        endAt: '2026-01-10T00:00:00.000Z',
        orders: 980,
        sales: 310000000,
        conversionRate: 4.1,
    },
    {
        id: '4',
        name: 'بازگشت مشتری طلایی',
        nature: 'تخفیفی',
        startAt: null,
        endAt: null,
        orders: 1320,
        sales: 265000000,
        conversionRate: 9.4,
    },
    {
        id: '5',
        name: 'روز مادر',
        nature: 'مناسبتی',
        startAt: '2026-03-11T00:00:00.000Z',
        endAt: '2026-03-16T00:00:00.000Z',
        orders: 1540,
        sales: 420000000,
        conversionRate: 6.5,
    },
    {
        id: '6',
        name: 'شتاب‌دهنده فروش',
        nature: 'شتاب‌دهنده فروش',
        startAt: '2025-10-23T00:00:00.000Z',
        endAt: '2025-11-01T00:00:00.000Z',
        orders: 760,
        sales: 185000000,
        conversionRate: 3.9,
    },
]

export const COMPARISON_STATS_A_DUMMY: CampaignComparisonStat[] = [
    { label: 'مشتریان شرکت‌کننده', value: '۱۲,۴۸۰' },
    { label: 'مشتری جدید از کمپین‌ها', value: '۳,۲۴۰' },
    { label: 'مشتری بازگشتی', value: '۹,۲۴۰' },
    { label: 'LTV پس از کمپین', value: '۴۸۵,۰۰۰' },
    { label: 'فروش کل کمپین‌ها', value: '۸۲۰,۰۰۰,۰۰۰' },
    { label: 'تعداد سفارش‌ها', value: '۲,۴۱۰' },
    { label: 'متوسط مبلغ هر سفارش', value: '۳۴۰,۰۰۰' },
]

export const COMPARISON_STATS_B_DUMMY: CampaignComparisonStat[] = [
    { label: 'مشتریان شرکت‌کننده', value: '۸,۹۲۰' },
    { label: 'مشتری جدید از کمپین‌ها', value: '۲,۱۱۰' },
    { label: 'مشتری بازگشتی', value: '۶,۸۱۰' },
    { label: 'LTV پس از کمپین', value: '۳۹۰,۰۰۰' },
    { label: 'فروش کل کمپین‌ها', value: '۵۴۰,۰۰۰,۰۰۰' },
    { label: 'تعداد سفارش‌ها', value: '۱,۸۶۰' },
    { label: 'متوسط مبلغ هر سفارش', value: '۲۹۰,۰۰۰' },
]

export const CAMPAIGN_SALES_BARS_DUMMY: CampaignSalesBarItem[] = [
    { name: 'هفته لباس زیر', value: 210 },
    { name: 'سپندارمذگان', value: 290 },
    { name: 'نوروز ۱۴۰۴', value: 380 },
    { name: 'باشگاه وفاداری', value: 410 },
    { name: 'شب یلدا', value: 640 },
    { name: 'حراج پایان فصل', value: 820 },
]

export type CampaignNatureShareItem = {
    name: string
    value: number
    color: string
}

export const CAMPAIGN_NATURE_SHARE_DUMMY: CampaignNatureShareItem[] = [
    { name: 'تخفیفی', value: 44, color: 'var(--color-primary)' },
    { name: 'مناسبتی', value: 34, color: 'var(--color-primary-container)' },
    { name: 'باندل', value: 15, color: 'var(--color-info)' },
    { name: 'شتاب‌دهنده فروش', value: 8, color: 'var(--color-warning)' },
]
