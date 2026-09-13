import type { OrderHistoryRowData } from '../components/OrderHistoryTableRow'
import { formatPrice } from '@/src/shared/libs/formatter'

export const ORDER_HISTORY_HEADERS = [
    'ردیف',
    'تاریخ ثبت',
    'مبلغ کل',
    'تاریخ تسویه',
    'نحوه تسویه',
    'فاکتور',
] as const

export const ORDER_HISTORY_DUMMY: OrderHistoryRowData[] = [
    {
        id: '1',
        row: 1,
        registeredAt: '2025-12-03T00:00:00.000Z',
        totalAmount: 8410440,
        settledAt: '2025-12-03T00:00:00.000Z',
        settlementMethod: 'cash',
    },
    {
        id: '2',
        row: 2,
        registeredAt: '2025-11-19T00:00:00.000Z',
        totalAmount: 57900800,
        settledAt: '2026-01-18T00:00:00.000Z',
        settlementMethod: 'cheque',
    },
]

export const formatOrderAmount = (value: number) => `${formatPrice(value)} ت`
