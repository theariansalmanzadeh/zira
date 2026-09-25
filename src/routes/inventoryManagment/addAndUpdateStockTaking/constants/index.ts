import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import type { IconLabel } from '@/src/shared/types/icon'
import type { StepperStatusStep } from '@/src/shared/components/StepperStatus/types'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export const STOCK_TAKING_STEPS = {
    initial: 'initial',
    count1: 'count1',
    discrepancy: 'discrepancy',
    count2: 'count2',
    finalize: 'finalize',
} as const

export type StockTakingStep =
    (typeof STOCK_TAKING_STEPS)[keyof typeof STOCK_TAKING_STEPS]

export const CREATE_STOCK_TAKING_STEPS: {
    id: StockTakingStep
    label: string
}[] = [
    { id: STOCK_TAKING_STEPS.initial, label: 'فرم اولیه' },
    { id: STOCK_TAKING_STEPS.count1, label: 'ثبت شمارش ۱' },
    { id: STOCK_TAKING_STEPS.discrepancy, label: 'گزارش مغایرت' },
    { id: STOCK_TAKING_STEPS.count2, label: 'ثبت شمارش ۲' },
    { id: STOCK_TAKING_STEPS.finalize, label: 'نهایی‌سازی' },
]

export const buildStockTakingStepperSteps = (
    activeStepIndex: number
): StepperStatusStep[] =>
    CREATE_STOCK_TAKING_STEPS.map((step, index) => ({
        id: step.id,
        label: step.label,
        status:
            index < activeStepIndex
                ? 'complete'
                : index === activeStepIndex
                  ? 'pending'
                  : 'not_reached',
    }))

export type ProductScope = 'all' | 'product-group' | 'warehouse'

export const PRODUCT_SCOPE_OPTIONS: {
    value: ProductScope
    title: string
    description: string
    icon: IconLabel
}[] = [
    {
        value: 'all',
        title: 'همه کالاها',
        description: 'تمام اقلام تمام انبارها شمارش می‌شود',
        icon: 'order400Linear',
    },
    {
        value: 'product-group',
        title: 'به تفکیک گروه کالا',
        description: 'فقط گروه‌های کالای انتخاب‌شده',
        icon: 'product400Linear',
    },
    {
        value: 'warehouse',
        title: 'به تفکیک انبار',
        description: 'فقط انبارهای انتخاب‌شده',
        icon: 'warehouse',
    },
]

export const STOCK_TAKING_MANAGER_OPTIONS: FormDropdownOption[] = [
    { label: 'علی رضایی', value: 'ali-rezaei' },
    { label: 'مریم احمدی', value: 'maryam-ahmadi' },
    { label: 'رضا کاظمی', value: 'reza-kazemi' },
]

export const STOCK_TAKING_WAREHOUSE_OPTIONS: FormDropdownOption[] = [
    { label: 'انبار مرکزی تهران', value: 'wh-tehran' },
    { label: 'انبار غرب', value: 'wh-west' },
    { label: 'انبار شرق', value: 'wh-east' },
]

export const STOCK_TAKING_CODE = 'SC-1404-12-15'

export const COUNT_TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'productName', header_label: 'نام محصول', isChecked: true },
    { id: 'productCode', header_label: 'کد محصول', isChecked: true },
    { id: 'unit', header_label: 'واحد', isChecked: true },
    { id: 'warehouse', header_label: 'انبار', isChecked: true },
    { id: 'address', header_label: 'آدرس در انبار', isChecked: true },
    { id: 'systemStock', header_label: 'موجودی سیستم', isChecked: true },
    { id: 'counted', header_label: 'شمارش شده', isChecked: true },
]

export const COUNT_ENTRY_TOGGLE = [
    { label: 'ثبت دستی', value: 'manual' },
    { label: 'ورودی اکسل', value: 'excel' },
] as const

export const COUNT_TABLE_COLUMNS = [
    { id: 'productName', label: 'نام محصول' },
    { id: 'productCode', label: 'کد محصول' },
    { id: 'unit', label: 'واحد' },
    { id: 'warehouse', label: 'انبار' },
    { id: 'address', label: 'آدرس در انبار' },
    { id: 'systemStock', label: 'موجودی سیستم' },
    { id: 'counted', label: 'شمارش شده' },
] as const


export type CountTableItem = {
    id: string
    productName: string
    productCode: string
    unit: string
    warehouse: string
    address: string
    systemStock: number
    counted: string
}

export const COUNT_TABLE_DUMMY: CountTableItem[] = [
    {
        id: '1',
        productName: 'لباس خواب ساتن',
        productCode: '7352-63',
        unit: 'عدد',
        warehouse: 'مرکزی تهران',
        address: 'A-R1-S2-B03',
        systemStock: 420,
        counted: '420',
    },
    {
        id: '2',
        productName: 'روتختی نخی',
        productCode: '8120-14',
        unit: 'عدد',
        warehouse: 'مرکزی تهران',
        address: 'A-R2-S1-B11',
        systemStock: 86,
        counted: '86',
    },
    {
        id: '3',
        productName: 'حوله حمام',
        productCode: '4410-09',
        unit: 'عدد',
        warehouse: 'انبار غرب',
        address: 'B-R1-S3-B02',
        systemStock: 150,
        counted: '148',
    },
]

export const COUNT_GRID_CLASS =
    'grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-3'

export type CountingSummaryCardTone =
    | 'default'
    | 'success'
    | 'error'
    | 'warning'

export type CountingSummaryCardItem = {
    id: string
    label: string
    value: number
    description: string
    tone: CountingSummaryCardTone
}

export const COUNTING_SUMMARY_CARDS: CountingSummaryCardItem[] = [
    {
        id: 'counted',
        label: 'اقلام شمارش‌شده',
        value: 241,
        description: 'از ۲۶۴ قلم دامنه',
        tone: 'default',
    },
    {
        id: 'positive',
        label: 'مغایرت مثبت',
        value: 1,
        description: 'موجودی بیشتر از سیستم',
        tone: 'success',
    },
    {
        id: 'negative',
        label: 'مغایرت منفی',
        value: 2,
        description: 'کسری موجودی',
        tone: 'error',
    },
    {
        id: 'monetary',
        label: 'اثر ریالی مغایرت',
        value: 1_420_000,
        description: 'ریال — برآوردی',
        tone: 'warning',
    },
]

export const DISCREPANCY_FILTER_TOGGLE = [
    { label: 'همه مغایرت‌ها', value: 'all' },
    { label: 'مثبت', value: 'positive' },
    { label: 'منفی', value: 'negative' },
] as const

export type DiscrepancyFilter = 'all' | 'positive' | 'negative'

export const DISCREPANCY_TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'row', header_label: 'ردیف', isChecked: true },
    { id: 'productName', header_label: 'نام محصول', isChecked: true },
    { id: 'unit', header_label: 'واحد', isChecked: true },
    { id: 'stock', header_label: 'موجودی', isChecked: true },
    { id: 'count1', header_label: 'شمارش ۱', isChecked: true },
    {
        id: 'discrepancy',
        header_label: 'مغایرت شمارش ۱',
        isChecked: true,
    },
    { id: 'warehouse', header_label: 'انبار', isChecked: true },
    { id: 'address', header_label: 'آدرس در انبار', isChecked: true },
]

export const DISCREPANCY_TABLE_COLUMNS = [
    { id: 'row', label: 'ردیف' },
    { id: 'productName', label: 'نام محصول' },
    { id: 'unit', label: 'واحد' },
    { id: 'stock', label: 'موجودی' },
    { id: 'count1', label: 'شمارش ۱' },
    { id: 'discrepancy', label: 'مغایرت شمارش ۱' },
    { id: 'warehouse', label: 'انبار' },
    { id: 'address', label: 'آدرس در انبار' },
] as const

export type DiscrepancyTableItem = {
    id: string
    row: number
    productName: string
    unit: string
    stock: number
    count1: number
    discrepancy: number
    warehouse: string
    address: string
}

export const DISCREPANCY_TABLE_DUMMY: DiscrepancyTableItem[] = [
    {
        id: '1',
        row: 2,
        productName: 'شورت زنانه نخی',
        unit: 'عدد',
        stock: 35,
        count1: 31,
        discrepancy: -4,
        warehouse: 'مرکزی تهران',
        address: 'A-R1-S2-B04',
    },
    {
        id: '2',
        row: 3,
        productName: 'ست نخی راحتی',
        unit: 'ست',
        stock: 180,
        count1: 186,
        discrepancy: 6,
        warehouse: 'مرکزی تهران',
        address: 'A-R4-S1-B02',
    },
    {
        id: '3',
        row: 5,
        productName: 'لگ ورزشی',
        unit: 'عدد',
        stock: 1245,
        count1: 1228,
        discrepancy: -17,
        warehouse: 'البرز',
        address: 'B-R2-S1-B05',
    },
]

export const DISCREPANCY_GRID_CLASS =
    'grid grid-cols-[minmax(0,0.55fr)_minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-3'

export const COUNT2_FILTER_TOGGLE = [
    { label: 'مغایرت‌ها', value: 'discrepancies' },
    { label: 'همه', value: 'all' },
] as const

export type Count2Filter = 'all' | 'discrepancies'

export const COUNT2_TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'row', header_label: 'ردیف', isChecked: true },
    { id: 'productName', header_label: 'نام محصول', isChecked: true },
    { id: 'productCode', header_label: 'کد محصول', isChecked: true },
    { id: 'unit', header_label: 'واحد', isChecked: true },
    { id: 'warehouse', header_label: 'انبار', isChecked: true },
    { id: 'address', header_label: 'آدرس در انبار', isChecked: true },
    { id: 'systemStock', header_label: 'موجودی سیستم', isChecked: true },
    { id: 'count1', header_label: 'شمارش ۱', isChecked: true },
    {
        id: 'discrepancy',
        header_label: 'مغایرت شمارش ۱',
        isChecked: true,
    },
    { id: 'count2', header_label: 'شمارش ۲', isChecked: true },
]

export const COUNT2_TABLE_COLUMNS = [
    { id: 'row', label: 'ردیف' },
    { id: 'productName', label: 'نام محصول' },
    { id: 'productCode', label: 'کد محصول' },
    { id: 'unit', label: 'واحد' },
    { id: 'warehouse', label: 'انبار' },
    { id: 'address', label: 'آدرس در انبار' },
    { id: 'systemStock', label: 'موجودی سیستم' },
    { id: 'count1', label: 'شمارش ۱' },
    { id: 'discrepancy', label: 'مغایرت شمارش ۱' },
    { id: 'count2', label: 'شمارش ۲' },
] as const

export type Count2TableItem = {
    id: string
    row: number
    productName: string
    productCode: string
    unit: string
    warehouse: string
    address: string
    systemStock: number
    count1: number
    discrepancy: number
    count2: string
}

export const COUNT2_TABLE_DUMMY: Count2TableItem[] = [
    {
        id: '1',
        row: 1,
        productName: 'لباس خواب ساتن',
        productCode: '7352-63',
        unit: 'عدد',
        warehouse: 'مرکزی تهران',
        address: 'A-R1-S2-B03',
        systemStock: 420,
        count1: 420,
        discrepancy: 0,
        count2: '420',
    },
    {
        id: '2',
        row: 2,
        productName: 'شورت زنانه نخی',
        productCode: '7352-71',
        unit: 'عدد',
        warehouse: 'مرکزی تهران',
        address: 'A-R1-S2-B04',
        systemStock: 35,
        count1: 31,
        discrepancy: -4,
        count2: '31',
    },
]

export const COUNT2_GRID_CLASS =
    'grid grid-cols-[minmax(0,0.5fr)_minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,0.6fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,0.8fr)_minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-3'

export const COUNT2_DISCREPANCY_REPORT_COLUMNS = [
    { id: 'row', label: 'ردیف' },
    { id: 'productName', label: 'نام محصول' },
    { id: 'unit', label: 'واحد' },
    { id: 'stock', label: 'موجودی' },
    { id: 'count1', label: 'شمارش ۱' },
    { id: 'count2', label: 'شمارش ۲' },
    { id: 'discrepancy2', label: 'مغایرت شمارش ۲' },
] as const

export type Count2DiscrepancyReportItem = {
    id: string
    row: number
    productName: string
    unit: string
    stock: number
    count1: number
    count2: number
    discrepancy2: number
}

export const COUNT2_DISCREPANCY_REPORT_DUMMY: Count2DiscrepancyReportItem[] = [
    {
        id: '1',
        row: 1,
        productName: 'شورت زنانه نخی',
        unit: 'عدد',
        stock: 35,
        count1: 31,
        count2: 33,
        discrepancy2: -2,
    },
]

export const COUNT2_DISCREPANCY_REPORT_GRID_CLASS =
    'grid grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.2fr)] items-center gap-3'
