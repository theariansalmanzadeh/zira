import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'

export type ProductTurnoverDocType = 'goods-entry' | 'sales-exit'

export type ProductTurnoverRow = {
    id: string
    row: number
    documentNumber: string
    date: string
    documentType: ProductTurnoverDocType
    productCode: string
    productName: string
    unit: string
    quantity: number
}

export type ProductTurnoverDocumentHeaderData = {
    documentNumber: string
    registeredAt: string
    documentType: string
    branch: string
    warehouse: string
    counterparty: string
    registrar: string
    status: string
}

export const BRANCH_OPTIONS: FormDropdownOption[] = [
    { label: 'شعبه اصفهان', value: 'isfahan' },
    { label: 'شعبه مرکزی تهران', value: 'tehran-central' },
    { label: 'شعبه کرج', value: 'karaj' },
]

export const WAREHOUSE_OPTIONS: FormDropdownOption[] = [
    { label: 'همه انبارها', value: 'all' },
    { label: 'انبار مرکزی تهران', value: 'tehran-central' },
    { label: 'انبار غرب', value: 'west' },
]

export const DOCUMENT_TYPE_OPTIONS: FormDropdownOption[] = [
    { label: 'همه اسناد', value: 'all' },
    { label: 'ورود کالا', value: 'goods-entry' },
    { label: 'خروج فروش', value: 'sales-exit' },
]

export const TIME_RANGE_OPTIONS: FormDropdownOption[] = [
    { label: '۳ ماه گذشته', value: '3-months' },
    { label: '۱ ماه گذشته', value: '1-month' },
    { label: '۷ روز گذشته', value: '7-days' },
]

export const DOC_TYPE_CONFIG: Record<
    ProductTurnoverDocType,
    {
        text: string
        variant: NonNullable<VariantProps<typeof PillVariants>['variant']>
    }
> = {
    'goods-entry': { text: 'ورود کالا', variant: 'success' },
    'sales-exit': { text: 'خروج فروش', variant: 'error' },
}

export const TABLE_COLOUMN = [
    { id: 'row', header_label: 'ردیف', isChecked: true },
    { id: 'documentNumber', header_label: 'شماره سند', isChecked: true },
    { id: 'date', header_label: 'تاریخ', isChecked: true },
    { id: 'documentType', header_label: 'نوع سند', isChecked: true },
    { id: 'productCode', header_label: 'کد کالا', isChecked: true },
    { id: 'productName', header_label: 'نام کالا', isChecked: true },
    { id: 'unit', header_label: 'واحد', isChecked: true },
    { id: 'quantity', header_label: 'تعداد', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true },
]

export const TABLE_COLUMNS = [
    { id: 'row', label: 'ردیف' },
    { id: 'documentNumber', label: 'شماره سند' },
    { id: 'date', label: 'تاریخ' },
    { id: 'documentType', label: 'نوع سند' },
    { id: 'productCode', label: 'کد کالا' },
    { id: 'productName', label: 'نام کالا' },
    { id: 'unit', label: 'واحد' },
    { id: 'quantity', label: 'تعداد' },
    { id: 'actions', label: '' },
] as const

export const FILTER_QUERY_KEYS = {
    branch: 'branch',
    warehouse: 'warehouse',
    documentType: 'documentType',
    timeRange: 'timeRange',
} as const

export const FILTER_DEFAULTS = {
    branch: BRANCH_OPTIONS[0]?.value ?? 'isfahan',
    warehouse: WAREHOUSE_OPTIONS[0]?.value ?? 'all',
    documentType: DOCUMENT_TYPE_OPTIONS[0]?.value ?? 'all',
    timeRange: TIME_RANGE_OPTIONS[0]?.value ?? '3-months',
} as const

export const TABLE_GRID_CLASS =
    'grid grid-cols-[minmax(0,0.5fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_auto] items-center gap-3'

export const PRODUCT_TURNOVER_DUMMY: ProductTurnoverRow[] = [
    {
        id: 'SD-74100',
        row: 1,
        documentNumber: 'SD-74100',
        date: '۱۴۰۴/۰۹/۳۰',
        documentType: 'goods-entry',
        productCode: 'ZM-1042',
        productName: 'سوتین بدون فنر مدل لوسی',
        unit: 'عدد',
        quantity: 12,
    },
    {
        id: 'SD-74103',
        row: 2,
        documentNumber: 'SD-74103',
        date: '۱۴۰۴/۰۹/۲۹',
        documentType: 'sales-exit',
        productCode: 'ZM-1047',
        productName: 'سوتین فنری مدل رزا',
        unit: 'عدد',
        quantity: 8,
    },
]

export const PRODUCT_TURNOVER_DETAIL_DUMMY: ProductTurnoverDocumentHeaderData =
{
    documentNumber: 'SD-74100',
    registeredAt: '۱۴۰۴/۰۹/۳۰',
    documentType: 'ورود کالا',
    branch: 'شعبه مرکزی تهران',
    warehouse: 'انبار مرکزی تهران',
    counterparty: 'خرید از تأمین‌کننده',
    registrar: 'محمدرضا کاظمی',
    status: 'قطعی شده',
}
