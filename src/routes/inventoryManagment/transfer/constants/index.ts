import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type TransferListDirection = 'send' | 'receive'
export type TransferInsuranceStatus = 'insured' | 'uninsured'
export type TransferListStatus = 'pending' | 'sent' | 'received'

export type TransferListRowData = {
    id: string
    productType: string
    productCode: string
    productName: string
    unit: string
    quantity: string
    originWarehouse: string
    originResponsible: string
    destinationWarehouse: string
    destinationResponsible: string
    originAddress: string
    destinationAddress: string
    insuranceStatus: TransferInsuranceStatus
    transferStatus: TransferListStatus
    direction: TransferListDirection
}

export const LIST_TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'نوع محصول', isChecked: true },
    { id: 'col-1', header_label: 'کد محصول', isChecked: true },
    { id: 'col-2', header_label: 'نام محصول', isChecked: true },
    { id: 'col-3', header_label: 'واحد', isChecked: true },
    { id: 'col-4', header_label: 'تعداد', isChecked: true },
    { id: 'col-5', header_label: 'آدرس در انبار مبدا', isChecked: true },
    { id: 'col-6', header_label: 'آدرس در انبار مقصد', isChecked: true },
    { id: 'col-7', header_label: 'وضعیت انتقال', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
]

export const LIST_TOGGLE_BUTTONS = [
    { label: 'همه', value: 'all' },
    { label: 'ارسال', value: 'send' },
    { label: 'دریافت', value: 'receive' },
]

export const TRANSFER_LIST_DUMMY: TransferListRowData[] = [
    {
        id: 'list-1',
        productType: 'ست تکی',
        productCode: '7352-90',
        productName: 'نیم تنه ورزشی',
        unit: 'عدد',
        quantity: '۴۰',
        originWarehouse: 'مرکزی تهران',
        originResponsible: 'علی رضایی',
        destinationWarehouse: 'شعبه کرج',
        destinationResponsible: 'مریم احمدی',
        originAddress: 'A-R1-S1-B01',
        destinationAddress: 'B-R2-S3-B04',
        insuranceStatus: 'insured',
        transferStatus: 'sent',
        direction: 'send',
    },
    {
        id: 'list-2',
        productType: 'تکی',
        productCode: '4410-09',
        productName: 'حوله حمام',
        unit: 'عدد',
        quantity: '۱۲',
        originWarehouse: 'شعبه اصفهان',
        originResponsible: 'حسین کریمی',
        destinationWarehouse: 'مرکزی تهران',
        destinationResponsible: 'علی رضایی',
        originAddress: 'C-R1-S2-B08',
        destinationAddress: 'A-R3-S1-B02',
        insuranceStatus: 'uninsured',
        transferStatus: 'pending',
        direction: 'receive',
    },
    {
        id: 'list-3',
        productType: 'ست',
        productCode: '8120-14',
        productName: 'روتختی نخی',
        unit: 'دست',
        quantity: '۸',
        originWarehouse: 'شعبه مشهد',
        originResponsible: 'زهرا نوری',
        destinationWarehouse: 'شعبه تبریز',
        destinationResponsible: 'رضا مرادی',
        originAddress: 'D-R2-S1-B11',
        destinationAddress: 'E-R1-S4-B06',
        insuranceStatus: 'insured',
        transferStatus: 'received',
        direction: 'receive',
    },
]

export const REQUEST_TOGGLE_BUTTONS = [
    { label: 'سیستمی', value: 'system' },
    { label: 'ثبت دستی', value: 'manual' },
]

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'ردیف', isChecked: true },
    { id: 'col-1', header_label: 'تاریخ درخواست', isChecked: true },
    { id: 'col-2', header_label: 'کد محصول', isChecked: true },
    { id: 'col-3', header_label: 'نوع محصول', isChecked: true },
    { id: 'col-4', header_label: 'نام محصول', isChecked: true },
    { id: 'col-5', header_label: 'واحد', isChecked: true },
    { id: 'col-6', header_label: 'تعداد', isChecked: true },
    { id: 'col-7', header_label: 'آدرس در انبار', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
]
