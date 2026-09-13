import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

import type { ChartOfAccountRowData } from '../components/TableRow'

export const CHART_OF_ACCOUNTS_DUMMY: ChartOfAccountRowData[] = [
    {
        id: '1',
        title: 'دارایی‌های جاری',
        code: 'CH-9281',
        level: 'کل',
        nature: 'بستانکار',
        balance: '6,318,930,000',
        status: 'active',
        depth: 0,
        hasChildren: true,
        filterTab: 'assets',
    },
    {
        id: '1-1',
        title: 'نقد و بانک',
        code: 'CH-9281',
        level: 'معین',
        nature: '-',
        balance: '6,318,930,000',
        status: 'active',
        depth: 1,
        hasChildren: true,
        filterTab: 'assets',
    },
    {
        id: '1-1-1',
        title: 'صندوق مرکزی',
        code: 'CH-9281',
        level: 'تفصیلی',
        nature: 'بدهکار',
        balance: '6,318,930,000',
        status: 'active',
        depth: 2,
        hasChildren: false,
        filterTab: 'assets',
    },
    {
        id: '1-1-2',
        title: 'بانک ملت - جاری',
        code: 'CH-9281',
        level: 'تفصیلی',
        nature: 'بدهکار',
        balance: '6,318,930,000',
        status: 'active',
        depth: 2,
        hasChildren: false,
        filterTab: 'assets',
    },
    {
        id: '1-2',
        title: 'حساب‌های دریافتنی',
        code: 'CH-9281',
        level: 'معین',
        nature: '-',
        balance: '6,318,930,000',
        status: 'active',
        depth: 1,
        hasChildren: true,
        filterTab: 'assets',
    },
    {
        id: '1-2-1',
        title: 'مشتریان عمده',
        code: 'CH-9281',
        level: 'تفصیلی',
        nature: 'بدهکار',
        balance: '6,318,930,000',
        status: 'active',
        depth: 2,
        hasChildren: false,
        filterTab: 'assets',
    },
    {
        id: '1-2-2',
        title: 'چک‌های دریافتنی',
        code: 'CH-9281',
        level: 'تفصیلی',
        nature: 'بدهکار',
        balance: '6,318,930,000',
        status: 'inactive',
        depth: 2,
        hasChildren: false,
        filterTab: 'assets',
    },
    {
        id: '2',
        title: 'بدهی‌های جاری',
        code: 'CH-9282',
        level: 'کل',
        nature: 'بستانکار',
        balance: '2,150,000,000',
        status: 'active',
        depth: 0,
        hasChildren: true,
        filterTab: 'liabilities',
    },
    {
        id: '3',
        title: 'حقوق صاحبان سهام',
        code: 'CH-9283',
        level: 'کل',
        nature: 'بستانکار',
        balance: '4,000,000,000',
        status: 'active',
        depth: 0,
        hasChildren: false,
        filterTab: 'equity',
    },
    {
        id: '4',
        title: 'درآمد فروش',
        code: 'CH-9284',
        level: 'کل',
        nature: 'بستانکار',
        balance: '8,500,000,000',
        status: 'active',
        depth: 0,
        hasChildren: false,
        filterTab: 'revenue',
    },
    {
        id: '5',
        title: 'هزینه عملیاتی',
        code: 'CH-9285',
        level: 'کل',
        nature: 'بدهکار',
        balance: '1,200,000,000',
        status: 'active',
        depth: 0,
        hasChildren: false,
        filterTab: 'expense',
    },
    {
        id: '6',
        title: 'حساب‌های انتظامی',
        code: 'CH-9286',
        level: 'کل',
        nature: '-',
        balance: '0',
        status: 'inactive',
        depth: 0,
        hasChildren: false,
        filterTab: 'memorandum',
    },
]

export const filterChartOfAccounts = (
    accounts: ChartOfAccountRowData[],
    filter: string
) => {
    if (filter === 'all') return accounts
    return accounts.filter((account) => account.filterTab === filter)
}

export const getVisibleAccounts = (
    accounts: ChartOfAccountRowData[],
    expandedIds: Set<string>
) => {
    const visible: ChartOfAccountRowData[] = []

    const byParentPrefix = (id: string, parentId: string) =>
        id.startsWith(`${parentId}-`) &&
        id.split('-').length === parentId.split('-').length + 1

    const walk = (parentId: string | null) => {
        const children = accounts.filter((account) => {
            if (parentId === null) {
                return !account.id.includes('-')
            }
            return byParentPrefix(account.id, parentId)
        })

        children.forEach((child) => {
            visible.push(child)
            if (child.hasChildren && expandedIds.has(child.id)) {
                walk(child.id)
            }
        })
    }

    walk(null)
    return visible
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "عنوان حساب", isChecked: true },
    { id: "col-1", header_label: "شناسه", isChecked: true },
    { id: "col-2", header_label: "سطح", isChecked: true },
    { id: "col-3", header_label: "ماهیت", isChecked: true },
    { id: "col-4", header_label: "مانده (تومان)", isChecked: true },
    { id: "col-5", header_label: "وضعیت", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
]
