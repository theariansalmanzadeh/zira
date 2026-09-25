export const BRANCH_DROPDOWN_OPTIONS = {
    label: 'شعبه',
    items: [
        { label: 'شعبه 1', value: '1' },
        { label: 'شعبه 2', value: '2' },
    ],
}

export const DATE_DROPDOWN_OPTIONS = {
    label: 'تاریخ',
    items: [
        { label: 'تاریخ 1', value: '1' },
        { label: 'تاریخ 2', value: '2' },
    ],
}

export type ReportSummaryCardData = {
    id: string
    title: string
    value: string
    suffix?: string
    footerText: string
    footerTone: 'success' | 'warning' | 'neutral'
    icon: import('@/src/shared/types/icon').IconLabel
    iconClassName: string
}

export const REPORT_SUMMARY_CARDS: ReportSummaryCardData[] = [
    {
        id: 'total-sales',
        title: 'فروش کل',
        value: '۸,۴۲۰',
        suffix: 'م ت',
        footerText: '+۱۲% نسبت به ماه قبل',
        footerTone: 'success',
        icon: 'analytics400Linear',
        iconClassName:
            'rounded-card-sm bg-error-container p-1 text-on-error-container',
    },
    {
        id: 'expenses',
        title: 'هزینه‌ها',
        value: '۵,۸۹۴',
        suffix: 'م ت',
        footerText: '+۴%',
        footerTone: 'warning',
        icon: 'creditCard400Linear',
        iconClassName:
            'rounded-card-sm bg-warning-container p-1 text-on-warning-container',
    },
    {
        id: 'turnover',
        title: 'گردش کالا',
        value: '۳۸۵۲',
        suffix: 'قلم',
        footerText: '+۶%',
        footerTone: 'success',
        icon: 'sync400Linear',
        iconClassName:
            'rounded-card-sm bg-info-container p-1 text-on-info-container',
    },
    {
        id: 'employees',
        title: 'کارمندان',
        value: '۲۴',
        suffix: 'نفر',
        footerText: 'فعال',
        footerTone: 'success',
        icon: 'account400Linear',
        iconClassName:
            'rounded-card-sm bg-primary-container p-1 text-primary',
    },
    {
        id: 'operating-profit',
        title: 'سود عملکرد',
        value: '۲,۵۲۶',
        suffix: 'م ت',
        footerText: '+۸%',
        footerTone: 'success',
        icon: 'moneyBag400Linear',
        iconClassName:
            'rounded-card-sm bg-success-container p-1 text-on-success-container',
    },
    {
        id: 'profit-margin',
        title: 'حاشیه سود',
        value: '۳۰%',
        footerText: '+۲%',
        footerTone: 'success',
        icon: 'analytics300Linear',
        iconClassName:
            'rounded-card-sm bg-surface-container-highest p-1 text-on-surface-variant',
    },
]

export type BestSellerItem = {
    id: string
    rank: number
    name: string
    salesCount: number
    amountMillion: number
    badgeLetter: string
}

export const BEST_SELLERS_DUMMY: BestSellerItem[] = [
    {
        id: '1',
        rank: 1,
        name: 'سوتین بدون فنر لوسی',
        salesCount: 1240,
        amountMillion: 595,
        badgeLetter: 'س',
    },
    {
        id: '2',
        rank: 2,
        name: 'شورت نخی مدل آوا',
        salesCount: 980,
        amountMillion: 470,
        badgeLetter: 'ش',
    },
    {
        id: '3',
        rank: 3,
        name: 'سوتین فنری مدل رزا',
        salesCount: 720,
        amountMillion: 346,
        badgeLetter: 'س',
    },
    {
        id: '4',
        rank: 4,
        name: 'بادی نخی مدل لنا',
        salesCount: 540,
        amountMillion: 259,
        badgeLetter: 'ب',
    },
    {
        id: '5',
        rank: 5,
        name: 'روتختی مدل اطلس',
        salesCount: 410,
        amountMillion: 197,
        badgeLetter: 'ر',
    },
]

export const FOOTER_TONE_CLASS: Record<
    ReportSummaryCardData['footerTone'],
    string
> = {
    success: 'text-success',
    warning: 'text-warning',
    neutral: 'text-outline',
}
