import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'

export const PRODUCT_TYPE_OPTIONS: FormDropdownOption[] = [
    { label: 'ست / تک', value: 'set-single' },
    { label: 'ست', value: 'set' },
    { label: 'تک', value: 'single' },
]

export const UNIT_OPTIONS: FormDropdownOption[] = [
    { label: 'عدد', value: 'piece' },
    { label: 'بسته', value: 'pack' },
    { label: 'جفت', value: 'pair' },
]

export const WAREHOUSE_OPTIONS: FormDropdownOption[] = [
    { label: 'مرکزی تهران', value: 'tehran-central' },
    { label: 'انبار کرج', value: 'karaj' },
    { label: 'انبار اصفهان', value: 'isfahan' },
]

export const RESPONSIBLE_OPTIONS: FormDropdownOption[] = [
    { label: 'علی رضایی', value: 'ali-rezaei' },
    { label: 'مریم کریمی', value: 'maryam-karimi' },
    { label: 'حسین محمدی', value: 'hossein-mohammadi' },
]

export type AddressOption = FormDropdownOption & {
    code: string
}

export const ZONE_OPTIONS: AddressOption[] = [
    { label: 'A - ناحیه پوشاک زنانه', value: 'zone-a', code: 'A' },
    { label: 'B - ناحیه ذخیره‌سازی', value: 'zone-b', code: 'B' },
    { label: 'C - ناحیه مرجوعی و قرنطینه', value: 'zone-c', code: 'C' },
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

export const buildWarehouseAddress = (
    zoneId?: string,
    rackId?: string,
    shelfId?: string,
    boxId?: string
) => {
    const zone = ZONE_OPTIONS.find((option) => option.value === zoneId)?.code
    const rack = RACK_OPTIONS.find((option) => option.value === rackId)?.code
    const shelf = SHELF_OPTIONS.find((option) => option.value === shelfId)?.code
    const box = BOX_OPTIONS.find((option) => option.value === boxId)?.code

    if (!zone || !rack || !shelf || !box) return ''

    return `${zone}-${rack}-${shelf}-${box}`
}
