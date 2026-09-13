import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const CATEGORY_TYPES_GRID_CLASS =
    'grid gap-x-0 gap-y-2'

export const CATEGORY_COLUMN_SIZES: Record<string, string> = {
    title: 'minmax(0,2fr)',
    id: '1fr',
    level: '1fr',
    directItems: '1fr',
    totalProducts: '1fr',
    status: 'auto',
    actions: 'auto',
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'title', header_label: 'عنوان دسته‌', isChecked: true },
    { id: 'id', header_label: 'شناسه', isChecked: true },
    { id: 'level', header_label: 'سطح', isChecked: true },
    { id: 'directItems', header_label: 'اقلام مستقیم', isChecked: true },
    { id: 'totalProducts', header_label: 'تعداد کل کالا', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true },
]

export const CATEGORY_CELL_CLASS =
    'bg-surface-container-lowest py-3 text-label-lg font-normal text-on-surface-variant'

export const CATEGORY_HEADER_CELL_CLASS =
    'px-2 py-3 text-label-lg font-normal text-outline'
