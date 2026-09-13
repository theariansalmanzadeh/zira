import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

import type { PayrollFilterTab, PayrollRowData } from '../components/TableRow'

export const SUMMARY_STATS = [
    { title: 'صورتحساب دوره', value: '320' },
    { title: 'نیازمند ارسال', value: '8' },
    { title: 'نیازمند بررسی', value: '3' },
    { title: 'ارسال شده', value: '309' },
] as const

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "دوره", isChecked: true },
    { id: "col-1", header_label: "کارمند", isChecked: true },
    { id: "col-2", header_label: "خالص پرداختی", isChecked: true },
    { id: "col-3", header_label: "بیمه و مالیات", isChecked: true },
    { id: "col-4", header_label: "سند حسابداری", isChecked: true },
    { id: "col-5", header_label: "وضعیت", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
]

export const PAYROLL_DUMMY: PayrollRowData[] = [
    {
        id: '1',
        period: 'اردیبهشت',
        employeeCount: '64',
        netPay: '-',
        insuranceTax: '-',
        documentId: 'DOC-767798',
        status: 'calculating',
        filterTab: 'calculating',
    },
    {
        id: '2',
        period: 'فروردین',
        employeeCount: '87',
        netPay: '-',
        insuranceTax: '-',
        documentId: 'DOC-767797',
        status: 'finalized',
        filterTab: 'finalized',
    },
    {
        id: '3',
        period: 'اسفند',
        employeeCount: '82',
        netPay: '-',
        insuranceTax: '-',
        documentId: 'DOC-767796',
        status: 'finalized',
        filterTab: 'finalized',
    },
    {
        id: '4',
        period: 'بهمن',
        employeeCount: '79',
        netPay: '-',
        insuranceTax: '-',
        documentId: 'DOC-767795',
        status: 'finalized',
        filterTab: 'finalized',
    },
    {
        id: '5',
        period: 'دی',
        employeeCount: '75',
        netPay: '-',
        insuranceTax: '-',
        documentId: 'DOC-767794',
        status: 'calculating',
        filterTab: 'calculating',
    },
    {
        id: '6',
        period: 'آذر',
        employeeCount: '71',
        netPay: '-',
        insuranceTax: '-',
        documentId: 'DOC-767793',
        status: 'finalized',
        filterTab: 'finalized',
    },
    {
        id: '7',
        period: 'آبان',
        employeeCount: '68',
        netPay: '-',
        insuranceTax: '-',
        documentId: 'DOC-767792',
        status: 'draft',
        filterTab: 'draft',
    },
    {
        id: '8',
        period: 'مهر',
        employeeCount: '65',
        netPay: '-',
        insuranceTax: '-',
        documentId: 'DOC-767791',
        status: 'finalized',
        filterTab: 'finalized',
    },
    {
        id: '9',
        period: 'شهریور',
        employeeCount: '63',
        netPay: '-',
        insuranceTax: '-',
        documentId: 'DOC-767790',
        status: 'draft',
        filterTab: 'draft',
    },
    {
        id: '10',
        period: 'مرداد',
        employeeCount: '60',
        netPay: '-',
        insuranceTax: '-',
        documentId: 'DOC-767789',
        status: 'finalized',
        filterTab: 'finalized',
    },
]

export const filterPayroll = (
    rows: PayrollRowData[],
    filter: PayrollFilterTab | string
) => {
    if (filter === 'all') return rows
    return rows.filter((row) => row.filterTab === filter)
}
