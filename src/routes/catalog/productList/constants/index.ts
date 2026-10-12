import type { ToggleButtonItem } from '@/src/shared/layouts/tableListLayout/TableListLayout'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const PRODUCT_LIST_TOGGLE_BUTTONS: ToggleButtonItem[] = [
    { label: 'همه', value: 'all' },
    { label: 'پیش‌نویس', value: 'DRAFT' },
    { label: 'فعال', value: 'ACTIVE' },
    { label: 'بایگانی شده', value: 'ARCHIVED' },
]

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'عنوان محصول', isChecked: true },
    { id: 'col-1', header_label: 'SKU', isChecked: true },
    { id: 'col-2', header_label: 'برند', isChecked: true },
    { id: 'col-3', header_label: 'دسته‌بندی', isChecked: true },
    { id: 'col-4', header_label: 'موجودی', isChecked: true },
    { id: 'col-5', header_label: 'تعداد رنگ', isChecked: true },
    { id: 'col-6', header_label: 'تعداد سایز', isChecked: true },
    { id: 'col-7', header_label: 'وضعیت', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
    { id: 'actions-1', header_label: '', isChecked: true },
    { id: 'actions-2', header_label: '', isChecked: true },
]
