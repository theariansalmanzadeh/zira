import type {
    PaymentNoticeFilterTab,
    PaymentNoticeRowData,
} from '../components/TableRow'

export const SUMMARY_STATS = [
    { title: 'پرداخت‌های این ماه', value: '156', prefix: 'میلیون تومان' },
    { title: 'در انتظار تایید', value: '12', prefix: 'عدد' },
    { title: 'چک‌های خرج‌شده', value: '8', prefix: 'فقره' },
    { title: 'مانده پرداختنی', value: '136', prefix: 'میلیون تومان' },
] as const

export const PAYMENT_NOTICES_DUMMY: PaymentNoticeRowData[] = [
    {
        id: 'PN-7363',
        date: '2025-12-09T00:00:00.000Z',
        counterparty: 'پوشاک آرمان',
        type: 'cheque',
        amount: '18,297,400',
        status: 'pendingApproval',
        filterTab: 'all',
    },
    {
        id: 'PN-7362',
        date: '2025-12-09T00:00:00.000Z',
        counterparty: 'فروشگاه رضایی',
        type: 'transfer',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'all',
    },
    {
        id: 'PN-7361',
        date: '2025-12-09T00:00:00.000Z',
        counterparty: 'بازرگانی نوین',
        type: 'cash',
        amount: '18,297,400',
        status: 'pendingApproval',
        filterTab: 'all',
    },
    {
        id: 'PN-7360',
        date: '2025-12-09T00:00:00.000Z',
        counterparty: 'تجارت سپهر',
        type: 'cheque',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'all',
    },
    {
        id: 'PN-7359',
        date: '2025-12-08T00:00:00.000Z',
        counterparty: 'پوشاک آرمان',
        type: 'transfer',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'all',
    },
    {
        id: 'PN-7358',
        date: '2025-12-08T00:00:00.000Z',
        counterparty: 'فروشگاه رضایی',
        type: 'cash',
        amount: '18,297,400',
        status: 'pendingApproval',
        filterTab: 'all',
    },
    {
        id: 'PN-7357',
        date: '2025-12-08T00:00:00.000Z',
        counterparty: 'بازرگانی نوین',
        type: 'cheque',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'all',
    },
    {
        id: 'PN-7356',
        date: '2025-12-07T00:00:00.000Z',
        counterparty: 'تجارت سپهر',
        type: 'transfer',
        amount: '18,297,400',
        status: 'draft',
        filterTab: 'draft',
    },
    {
        id: 'PN-7355',
        date: '2025-12-07T00:00:00.000Z',
        counterparty: 'پوشاک آرمان',
        type: 'cash',
        amount: '18,297,400',
        status: 'draft',
        filterTab: 'draft',
    },
    {
        id: 'PN-7354',
        date: '2025-12-06T00:00:00.000Z',
        counterparty: 'فروشگاه رضایی',
        type: 'cheque',
        amount: '18,297,400',
        status: 'draft',
        filterTab: 'draft',
    },
]

export const filterPaymentNotices = (
    notices: PaymentNoticeRowData[],
    filter: PaymentNoticeFilterTab | string
) => {
    if (filter === 'all') return notices
    return notices.filter((notice) => notice.filterTab === filter)
}
