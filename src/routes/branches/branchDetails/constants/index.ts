import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import { ModalTypes, type ModalType } from '@/src/shared/components/modals/types'
import type { Branch } from '@/src/api/types/admin/organization'
import { formatFaNumber } from '@/src/shared/libs/formatter'

export type QuickAccessStat = {
    label: string
    values: string[]
    href?: string
    modalType: ModalType | null
    tableValue?: string
}

const PERMIT_VALUE_LABELS: Record<
    | 'allow_credit_sale'
    | 'allow_cheque_sale'
    | 'allow_consignment_sale'
    | 'allow_scrap_entry',
    string
> = {
    allow_credit_sale: 'فروش اعتباری',
    allow_cheque_sale: 'فروش چکی',
    allow_consignment_sale: 'فروش امانی',
    allow_scrap_entry: 'ثبت ضایعات',
}

export const quickAccessValuesByLabel = (
    label: string,
    branch?: Branch | null
): string[] => {
    if (!branch) return []

    switch (label) {
        case 'انبارهای مربوطه':
            return branch.warehouses.map((warehouse) => warehouse.warehouse_name)
        case 'کالاهای مجاز':
            return []
        case 'دستگاه های POS':
            return (branch.pos_devices ?? []).map((device) => device.title)
        case 'مجوزها':
            return (Object.keys(PERMIT_VALUE_LABELS) as (keyof typeof PERMIT_VALUE_LABELS)[])
                .filter((key) => Boolean(branch.permit?.[key]))
                .map((key) => PERMIT_VALUE_LABELS[key])
        default:
            return []
    }
}

export const mapQuickAccessItems = (
    branch?: Branch | null
): QuickAccessStat[] =>
    QUICK_ACCESS_ITEMS.map((item) => ({
        ...item,
        values: quickAccessValuesByLabel(item.label, branch),
    }))

export const quickAccessSummary = (label: string, values: string[]) => {
    const count = formatFaNumber(values.length)
    switch (label) {
        case 'انبارهای مربوطه':
            return `${count} انبار`
        case 'کالاهای مجاز':
            return `${count} کالا`
        case 'دستگاه های POS':
            return `${count} دستگاه`
        case 'مجوزها':
            return `${count} مجوز`
        default:
            return values.join('، ')
    }
}

export const PRODUCT_TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'عنوان کالا', isChecked: true },
    { id: 'col-1', header_label: 'شناسه کالا', isChecked: true },
    { id: 'col-2', header_label: 'برند', isChecked: true },
    { id: 'col-3', header_label: 'دسته‌بندی', isChecked: true },
    { id: 'col-4', header_label: 'موجودی', isChecked: true },
    { id: 'col-5', header_label: 'انبار مربوطه', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
    { id: 'actions-1', header_label: '', isChecked: true },
    { id: 'actions-2', header_label: '', isChecked: true },
]

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'name', header_label: 'نام صندوق', isChecked: true },
    { id: 'cashier', header_label: 'صندوق‌دار', isChecked: true },
    { id: 'shift', header_label: 'شیفت کاری', isChecked: true },
    { id: 'posDevice', header_label: 'دستگاه POS متصل', isChecked: true },
    { id: 'bank', header_label: 'بانک متصل', isChecked: true },
    { id: 'bankAccount', header_label: 'حساب بانکی متصل', isChecked: true },
    { id: 'initialBalance', header_label: 'موجودی اولیه', isChecked: true },
    { id: 'edit', header_label: 'ویرایش', isChecked: true },
    { id: 'remove', header_label: 'حذف', isChecked: true },
]

export const BANK_ACCOUNT_TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'bank', header_label: 'بانک', isChecked: true },
    { id: 'accountType', header_label: 'نوع حساب', isChecked: true },
    { id: 'accountNumber', header_label: 'شماره حساب', isChecked: true },
    { id: 'sheba', header_label: 'شماره شبا', isChecked: true },
    { id: 'balance', header_label: 'مانده', isChecked: true },
    { id: 'isDefault', header_label: 'پیش‌فرض', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
    { id: 'expand', header_label: '', isChecked: true },
]

export const BANK_ACCOUNT_COLUMNS = [
    { id: 'bank', label: 'بانک' },
    { id: 'accountType', label: 'نوع حساب' },
    { id: 'accountNumber', label: 'شماره حساب' },
    { id: 'sheba', label: 'شماره شبا' },
    { id: 'balance', label: 'مانده' },
    { id: 'isDefault', label: 'پیش‌فرض' },
    { id: 'status', label: 'وضعیت' },
    { id: 'expand', label: '' },
] as const

export const BANK_ACCOUNT_GRID_CLASS =
    'grid grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)_minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,0.75fr)_minmax(0,0.7fr)_auto] items-center gap-3'

export type BankAccountRowData = {
    id: string
    bank: string
    accountType: string
    accountNumber: string
    sheba: string
    cardNumber: string
    accountHolder: string
    bankBranch: string
    bankBranchCode: string
    balance: number
    isDefault: boolean
    status: 'فعال' | 'غیرفعال'
}

export const BANK_ACCOUNT_DUMMY: BankAccountRowData[] = [
    {
        id: '1',
        bank: 'بانک ملت',
        accountType: 'جاری',
        accountNumber: '1234567890',
        sheba: 'IR330120000000000123456',
        cardNumber: '6104337812345678',
        accountHolder: 'زیرا مارکت (سهامی خاص)',
        bankBranch: 'شعبه ولیعصر',
        bankBranchCode: '6231',
        balance: 125000000,
        isDefault: true,
        status: 'فعال',
    },
    {
        id: '2',
        bank: 'بانک سامان',
        accountType: 'کوتاه‌مدت',
        accountNumber: '9876543210',
        sheba: 'IR820560000000000987654',
        cardNumber: '6219861045678912',
        accountHolder: 'زیرا مارکت (سهامی خاص)',
        bankBranch: 'شعبه میرداماد',
        bankBranchCode: '842',
        balance: 48000000,
        isDefault: false,
        status: 'فعال',
    },
]

export type CashRegisterBadgeTone = 'primary' | 'info'

export type CashRegisterRowData = {
    id: string
    index: number
    name: string
    code: string
    badgeTone: CashRegisterBadgeTone
    cashier: string
    shift: string
    posDevice: string
    bank: string
    bankAccount: string
    initialBalance: number
}

export const CASH_REGISTER_BADGE_CLASS: Record<CashRegisterBadgeTone, string> =
{
    primary: 'bg-primary text-primary-foreground',
    info: 'bg-info text-on-info',
}

export const CASH_REGISTER_DUMMY: CashRegisterRowData[] = [
    {
        id: '1',
        index: 1,
        name: 'صندوق فروش ۱',
        code: 'CR-3100',
        badgeTone: 'primary',
        cashier: 'سارا محمدی',
        shift: 'تمام‌وقت',
        posDevice: 'کارت‌خوان ۱',
        bank: 'بانک ملت',
        bankAccount: '1234567890',
        initialBalance: 5000000,
    },
    {
        id: '2',
        index: 2,
        name: 'صندوق فروش ۲',
        code: 'CR-3101',
        badgeTone: 'info',
        cashier: 'مهدی رضایی',
        shift: 'شیفت صبح',
        posDevice: 'کارت‌خوان ۲',
        bank: 'بانک سامان',
        bankAccount: '9876543210',
        initialBalance: 5000000,
    },
]

export const QUICK_ACCESS_ITEMS: QuickAccessStat[] = [
    {
        label: 'انبارهای مربوطه',
        values: [],
        modalType: ModalTypes.RELATED_WAREHOUSES,
    },
    {
        label: 'کالاهای مجاز',
        values: [],
        modalType: ModalTypes.ALLOWED_PRODUCTS,
    },
    {
        label: 'دستگاه های POS',
        values: [],
        modalType: ModalTypes.POS_BRANCH_DETAILS,
    },
    {
        label: 'مجوزها',
        values: [],
        modalType: ModalTypes.BRANCH_ALLOWANCE,
    },
]
