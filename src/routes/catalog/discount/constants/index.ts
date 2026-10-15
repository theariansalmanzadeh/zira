import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const CASH_TABLE_COLUMNS: TableFilterItem[] = [
    { id: 'discount-amount', header_label: 'میزان تخفیف', isChecked: true },
    { id: 'min-amount', header_label: 'حداقل مبلغ خرید', isChecked: true },
    { id: 'start-date', header_label: 'تاریخ شروع', isChecked: true },
    { id: 'end-date', header_label: 'تاریخ پایان', isChecked: true },
    { id: 'updated-at', header_label: 'تاریخ آخرین بروزرسانی', isChecked: true },
    { id: 'creator', header_label: 'ثبت‌کننده', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
]

export const COMBINED_TABLE_COLUMNS: TableFilterItem[] = [
    { id: 'customer', header_label: 'مشتری', isChecked: true },
    { id: 'product', header_label: 'محصول', isChecked: true },
    { id: 'discount', header_label: 'تخفیف', isChecked: true },
    { id: 'min-qty', header_label: 'حداقل تعداد', isChecked: true },
    { id: 'start-date', header_label: 'تاریخ شروع', isChecked: true },
    { id: 'end-date', header_label: 'تاریخ اتمام', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
]
