import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type VariableItem = {
    id: string
    name: string
    type: string
    valueCount: number
    productsCount: number
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'ویژگی', isChecked: true },
    { id: 'col-1', header_label: 'نوع', isChecked: true },
    { id: 'col-2', header_label: 'تعداد مقدار', isChecked: true },
    { id: 'col-3', header_label: 'استفاده', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
]

export const VARIABLES_DUMMY: VariableItem[] = [
    {
        id: '1',
        name: 'رنگ',
        type: 'انتخابی (سواچ)',
        valueCount: 18,
        productsCount: 240,
    },
    {
        id: '2',
        name: 'سایز',
        type: 'انتخابی (متن)',
        valueCount: 8,
        productsCount: 312,
    },
    {
        id: '3',
        name: 'جنس',
        type: 'متنی',
        valueCount: 12,
        productsCount: 156,
    },
    {
        id: '4',
        name: 'فنردار بودن',
        type: 'بولین',
        valueCount: 2,
        productsCount: 98,
    },
]
