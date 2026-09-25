import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'
import type { WarehouseReceiptRowData, WarehouseReceiptStatus } from '../types'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'row', header_label: 'ردیف', isChecked: true },
    { id: 'invoiceNumber', header_label: 'شماره فاکتور', isChecked: true },
    { id: 'customerCode', header_label: 'کد مشتری', isChecked: true },
    { id: 'customerName', header_label: 'نام مشتری', isChecked: true },
    { id: 'date', header_label: 'تاریخ', isChecked: true },
    { id: 'itemCount', header_label: 'تعداد اقلام', isChecked: true },
    { id: 'senderWarehouse', header_label: 'انبار ارسال کننده', isChecked: true },
    { id: 'shippingMethod', header_label: 'نحوه ارسال', isChecked: true },
    { id: 'status', header_label: 'آخرین وضعیت', isChecked: true },
]

export const WAREHOUSE_RECEIPT_TOGGLE = [
    { label: 'رسید انبار در جریان', value: 'in-progress' },
    { label: 'لیست رسید انبارها', value: 'list' },
]

export const STATUS_CONFIG: Record<
    WarehouseReceiptStatus,
    {
        text: string
        variant: NonNullable<VariantProps<typeof PillVariants>['variant']>
    }
> = {
    'awaiting-address': { text: 'در انتظار تخصیص آدرس', variant: 'warning' },
    'awaiting-prep': { text: 'در انتظار آماده‌سازی', variant: 'warning' },
    completed: { text: 'تکمیل شده', variant: 'success' },
}

export const TABLE_GRID_CLASS =
    'grid grid-cols-[repeat(6,minmax(0,1fr))_minmax(0,2.4fr)] items-center gap-3'

export const WAREHOUSE_RECEIPT_DUMMY: WarehouseReceiptRowData[] = [
    {
        id: 'wr-1',
        row: 1,
        invoiceNumber: 'INV-91211',
        customerCode: 'CU-2344',
        customerName: 'حسین احمدی',
        date: '۱۴۰۴/۱۲/۱۲',
        itemCount: 2,
        senderWarehouse: 'تعیین نشده',
        shippingMethod: 'دریافت حضوری',
        status: 'awaiting-address',
        tab: 'in-progress',
    },
    {
        id: 'wr-2',
        row: 2,
        invoiceNumber: 'INV-91204',
        customerCode: 'CU-2201',
        customerName: 'مریم حسینی',
        date: '۱۴۰۴/۱۲/۱۱',
        itemCount: 3,
        senderWarehouse: 'انبار مرکزی تهران',
        shippingMethod: 'تیپاکس',
        status: 'awaiting-prep',
        tab: 'in-progress',
    },
    {
        id: 'wr-3',
        row: 3,
        invoiceNumber: 'INV-91180',
        customerCode: 'CU-1988',
        customerName: 'رضا مرادی',
        date: '۱۴۰۴/۱۲/۰۸',
        itemCount: 1,
        senderWarehouse: 'انبار مرکزی تهران',
        shippingMethod: 'پست',
        status: 'completed',
        tab: 'list',
    },
]
