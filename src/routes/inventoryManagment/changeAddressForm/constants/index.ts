import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'

export const WAREHOUSE_OPTIONS: FormDropdownOption[] = [
    { label: 'انبار مرکزی تهران', value: 'wh-tehran' },
    { label: 'انبار غرب', value: 'wh-west' },
    { label: 'انبار شرق', value: 'wh-east' },
]

export const WAREHOUSE_CODE_BY_VALUE: Record<string, string> = {
    'wh-tehran': 'WH-1001',
    'wh-west': 'WH-1002',
    'wh-east': 'WH-1003',
}
