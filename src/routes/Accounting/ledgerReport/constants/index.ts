import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

import type { LedgerReportRowData } from '../component/TableRow'

export const SUMMARY_STATS = [
    { title: 'گردش بدهکار', value: '2,441', subtitle: 'میلیون تومان' },
    { title: 'گردش بستانکار', value: '692', subtitle: 'میلیون تومان' },
    {
        title: 'مانده',
        value: '1,827',
        subtitle: 'میلیون تومان . بدهکار',
    },
    { title: 'تعداد گردش', value: '84' },
] as const

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "شماره سند", isChecked: true },
    { id: "col-1", header_label: "تاریخ", isChecked: true },
    { id: "col-2", header_label: "شرح", isChecked: true },
    { id: "col-3", header_label: "بدهکار", isChecked: true },
    { id: "col-4", header_label: "بستانکار", isChecked: true },
    { id: "col-5", header_label: "مانده", isChecked: true },
]

export const LEDGER_REPORT_DUMMY: LedgerReportRowData[] = [
    {
        id: '1',
        documentNumber: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'وصول چک مشتری',
        debit: '-',
        credit: '-',
        balance: '-',
    },
    {
        id: '2',
        documentNumber: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'وصول چک مشتری',
        debit: '-',
        credit: '-',
        balance: '-',
    },
    {
        id: '3',
        documentNumber: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'وصول چک مشتری',
        debit: '-',
        credit: '-',
        balance: '-',
    },
    {
        id: '4',
        documentNumber: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'واریز فروش نقدی',
        debit: '-',
        credit: '-',
        balance: '-',
    },
    {
        id: '5',
        documentNumber: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'واریز فروش نقدی',
        debit: '-',
        credit: '-',
        balance: '-',
    },
    {
        id: '6',
        documentNumber: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'دریافت وجه نقد بابت فروش',
        debit: '-',
        credit: '-',
        balance: '-',
    },
    {
        id: '7',
        documentNumber: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'دریافت وجه نقد بابت فروش',
        debit: '-',
        credit: '-',
        balance: '-',
    },
    {
        id: '8',
        documentNumber: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'پرداخت به تامین‌کننده',
        debit: '-',
        credit: '-',
        balance: '-',
    },
    {
        id: '9',
        documentNumber: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'پرداخت به تامین‌کننده',
        debit: '-',
        credit: '-',
        balance: '-',
    },
    {
        id: '10',
        documentNumber: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'پرداخت اجاره',
        debit: '-',
        credit: '-',
        balance: '-',
    },
]

export const LEDGER_REPORT_TOTAL_COUNT = 84
