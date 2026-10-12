import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type VariableValue = {
    label: string
    color?: string
}

export type VariableItem = {
    id: string
    name: string
    type: string
    control: string
    role: string
    description: string
    values: VariableValue[]
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
        control: 'سواچ رنگ',
        role: 'متغیرساز',
        description: 'رنگ‌های قابل تعریف در ماتریس کالا',
        values: [
            { label: 'قرمز', color: '#d64545' },
            { label: 'آبی', color: '#3d6fd8' },
            { label: 'سبز', color: '#2f7d4a' },
            { label: 'مشکی', color: '#1a1a1a' },
            { label: 'کرم', color: '#e6d3b8' },
            { label: 'گلبهی', color: '#e7a0a8' },
        ],
        valueCount: 6,
        productsCount: 240,
    },
    {
        id: '2',
        name: 'سایز',
        type: 'انتخابی (متن)',
        control: 'دراپ‌داون',
        role: 'متغیرساز',
        description: 'سایزهای قابل انتخاب برای کالا',
        values: [
            { label: 'S' },
            { label: 'M' },
            { label: 'L' },
            { label: 'XL' },
        ],
        valueCount: 4,
        productsCount: 312,
    },
    {
        id: '3',
        name: 'جنس',
        type: 'متنی',
        control: 'ورودی متن',
        role: 'توصیفی',
        description: 'جنس پارچه یا مواد کالا',
        values: [{ label: 'نخی' }, { label: 'ساتن' }, { label: 'دانتل' }],
        valueCount: 3,
        productsCount: 156,
    },
    {
        id: '4',
        name: 'فنردار بودن',
        type: 'بولین',
        control: 'چک‌باکس',
        role: 'فیلتر',
        description: 'داشتن یا نداشتن فنر',
        values: [{ label: 'بله' }, { label: 'خیر' }],
        valueCount: 2,
        productsCount: 98,
    },
]
