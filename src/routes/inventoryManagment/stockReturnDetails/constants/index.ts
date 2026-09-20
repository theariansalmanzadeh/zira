import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'

export const RECEIVER_OPTIONS: FormDropdownOption[] = [
    { label: 'علی رضایی', value: 'ali-rezaei' },
    { label: 'مریم کریمی', value: 'maryam-karimi' },
    { label: 'حسین محمدی', value: 'hossein-mohammadi' },
]

export const WAREHOUSE_OPTIONS: FormDropdownOption[] = [
    { label: 'انبار مرکزی تهران', value: 'tehran-central' },
    { label: 'انبار کرج', value: 'karaj' },
    { label: 'انبار اصفهان', value: 'isfahan' },
]

export type AddressOption = FormDropdownOption & {
    code: string
}

export const ZONE_OPTIONS: AddressOption[] = [
    {
        label: 'C - ناحیه مرجوعی و قرنطینه',
        value: 'zone-c',
        code: 'C',
    },
    {
        label: 'A - ناحیه فروش',
        value: 'zone-a',
        code: 'A',
    },
    {
        label: 'B - ناحیه ذخیره‌سازی',
        value: 'zone-b',
        code: 'B',
    },
]

export const RACK_OPTIONS: AddressOption[] = [
    { label: 'قفسه R1', value: 'rack-r1', code: 'R1' },
    { label: 'قفسه R2', value: 'rack-r2', code: 'R2' },
    { label: 'قفسه R3', value: 'rack-r3', code: 'R3' },
]

export const SHELF_OPTIONS: AddressOption[] = [
    { label: 'طبقه S1', value: 'shelf-s1', code: 'S1' },
    { label: 'طبقه S2', value: 'shelf-s2', code: 'S2' },
    { label: 'طبقه S3', value: 'shelf-s3', code: 'S3' },
]

export const BOX_OPTIONS: AddressOption[] = [
    { label: 'جعبه B1', value: 'box-b1', code: 'B01' },
    { label: 'جعبه B2', value: 'box-b2', code: 'B02' },
    { label: 'جعبه B3', value: 'box-b3', code: 'B03' },
]

export const STOCK_RETURN_DETAILS_DEFAULTS = {
    requestCode: 'RT-1041',
    requestDate: '۱۴۰۴/۱۲/۱۲',
    customer: 'حسین احمدی (CU-2344)',
    product: '۷۳۵۲-۶۳ - لباس خواب ساتن',
    declaredQty: '۶ عدد',
    countedQty: '۶',
    receiverId: 'ali-rezaei',
    warehouseId: 'tehran-central',
    zoneId: 'zone-c',
    rackId: 'rack-r1',
    shelfId: 'shelf-s1',
    boxId: 'box-b1',
} as const

export const buildWarehouseAddress = (
    zoneId?: string,
    rackId?: string,
    shelfId?: string,
    boxId?: string
): string => {
    const zone = ZONE_OPTIONS.find((option) => option.value === zoneId)?.code
    const rack = RACK_OPTIONS.find((option) => option.value === rackId)?.code
    const shelf = SHELF_OPTIONS.find((option) => option.value === shelfId)?.code
    const box = BOX_OPTIONS.find((option) => option.value === boxId)?.code

    if (!zone || !rack || !shelf || !box) return ''

    return `${zone}-${rack}-${shelf}-${box}`
}
