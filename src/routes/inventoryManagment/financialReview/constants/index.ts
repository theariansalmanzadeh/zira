import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const FINANCIAL_REVIEW_TABS = [
    { value: 'warehouse', label: 'انبار', count: 4 },
    { value: 'product', label: 'کالا', count: 240 },
    { value: 'tracking', label: 'ردیابی', count: 12 },
    { value: 'supplier', label: 'تامین کننده', count: 18 },
    { value: 'customer', label: 'مشتری', count: 96 },
    { value: 'documents', label: 'اسناد', count: 312 },
    { value: 'items', label: 'اقلام', count: 1402 },
] as const

export type FinancialReviewTab =
    (typeof FINANCIAL_REVIEW_TABS)[number]['value']

export const WAREHOUSE_COLUMNS: TableFilterItem[] = [
    { id: 'col-0', header_label: 'کد انبار', isChecked: true },
    { id: 'col-1', header_label: 'عنوان انبار', isChecked: true },
    { id: 'col-2', header_label: 'اول دوره', isChecked: true },
    { id: 'col-3', header_label: 'ورودی', isChecked: true },
    { id: 'col-4', header_label: 'خروجی', isChecked: true },
    { id: 'col-5', header_label: 'خالص', isChecked: true },
]

export const PRODUCT_COLUMNS: TableFilterItem[] = [
    { id: 'col-0', header_label: 'کد کالا', isChecked: true },
    { id: 'col-1', header_label: 'عنوان کالا', isChecked: true },
    { id: 'col-2', header_label: 'ورودی', isChecked: true },
    { id: 'col-3', header_label: 'خروجی', isChecked: true },
    { id: 'col-4', header_label: 'موجودی', isChecked: true },
    { id: 'col-5', header_label: 'واحد اصلی', isChecked: true },
    { id: 'col-6', header_label: 'مشخصات کالا', isChecked: true },
]

export const TRACKING_COLUMNS: TableFilterItem[] = [
    { id: 'col-0', header_label: 'عنوان ردیابی', isChecked: true },
    { id: 'col-1', header_label: 'اول دوره', isChecked: true },
    { id: 'col-2', header_label: 'ورودی', isChecked: true },
    { id: 'col-3', header_label: 'خروجی', isChecked: true },
    { id: 'col-4', header_label: 'خالص', isChecked: true },
]

export const SUPPLIER_COLUMNS: TableFilterItem[] = [
    { id: 'col-0', header_label: 'کد تفصیلی', isChecked: true },
    { id: 'col-1', header_label: 'نام تامین کننده', isChecked: true },
    { id: 'col-2', header_label: 'رسید', isChecked: true },
    { id: 'col-3', header_label: 'برگشت رسید', isChecked: true },
    { id: 'col-4', header_label: 'خالص', isChecked: true },
]

export const CUSTOMER_COLUMNS: TableFilterItem[] = [
    { id: 'col-0', header_label: 'کد تفصیلی', isChecked: true },
    { id: 'col-1', header_label: 'نام مشتری', isChecked: true },
    { id: 'col-2', header_label: 'خروج', isChecked: true },
    { id: 'col-3', header_label: 'برگشت خروج', isChecked: true },
    { id: 'col-4', header_label: 'خالص', isChecked: true },
]

export const DOCUMENTS_COLUMNS: TableFilterItem[] = [
    { id: 'col-0', header_label: 'تاریخ', isChecked: true },
    { id: 'col-1', header_label: 'شماره', isChecked: true },
    { id: 'col-2', header_label: 'کد انبار', isChecked: true },
    { id: 'col-3', header_label: 'نام انبار', isChecked: true },
    { id: 'col-4', header_label: 'کد انبار مقصد', isChecked: true },
    { id: 'col-5', header_label: 'نام انبار مقصد', isChecked: true },
    { id: 'col-6', header_label: 'سند', isChecked: true },
    { id: 'col-7', header_label: 'نوع', isChecked: true },
]

export const ITEMS_COLUMNS: TableFilterItem[] = [
    { id: 'col-0', header_label: 'تاریخ', isChecked: true },
    { id: 'col-1', header_label: 'شماره', isChecked: true },
    { id: 'col-2', header_label: 'سند', isChecked: true },
    { id: 'col-3', header_label: 'نوع', isChecked: true },
    { id: 'col-4', header_label: 'شماره سند مبنا', isChecked: true },
    { id: 'col-5', header_label: 'مبلغ', isChecked: true },
    { id: 'col-6', header_label: 'موجودی انبار', isChecked: true },
]

export const WAREHOUSE_DUMMY = [
    {
        id: '1',
        code: 'WH-1001',
        title: 'انبار مرکزی تهران',
        opening: 1850000000,
        incoming: 920000000,
        outgoing: 640000000,
        net: 2130000000,
    },
]

export const PRODUCT_DUMMY = [
    {
        id: '1',
        code: '7352-63',
        title: 'لباس خواب ساتن',
        incoming: 248000000,
        outgoing: 96000000,
        stock: 152000000,
        unit: 'عدد',
    },
]

export const TRACKING_DUMMY = [
    {
        id: '1',
        title: 'سری ساخت ۰۱-۱۴۰۴',
        opening: 168000000,
        incoming: 64000000,
        outgoing: 42000000,
        net: 190000000,
    },
]

export const SUPPLIER_DUMMY = [
    {
        id: '1',
        code: 'SP-1101',
        name: 'پخش آریا',
        receipt: 480000000,
        returnReceipt: 32000000,
        net: 448000000,
    },
]

export const CUSTOMER_DUMMY = [
    {
        id: '1',
        code: 'CU-2101',
        name: 'علی رضایی',
        initial: 'ع',
        outgoing: 64000000,
        returnOutgoing: 2400000,
        net: 61600000,
    },
]

export const DOCUMENTS_DUMMY = [
    {
        id: '1',
        date: '۱۴۰۴/۱۲/۰۸',
        number: '۱۰۲۳',
        warehouseCode: 'WH-1001',
        warehouseName: 'مرکزی تهران',
        destinationCode: '—',
        destinationName: '—',
        document: 'GRN-4410',
        type: 'رسید',
    },
]

export const ITEMS_DUMMY = [
    {
        id: '1',
        date: '۱۴۰۴/۱۲/۰۸',
        number: '۱۰۲۳',
        document: 'GRN-4410',
        type: 'رسید',
        baseDocument: 'PO-982032',
        amount: 21600000,
        warehouseStock: 1054000000,
    },
]
