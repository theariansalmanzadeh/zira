'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/src/shared/components/ui/button'
import CheckboxDropdown from '@/src/shared/components/ui/CheckboxDropdown'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { useCreateProducts } from '../../provider/createProductsProvider'
import type { DropdownOption } from '../../types'

const SALES_UNIT_OPTIONS: DropdownOption[] = [
    { label: 'ADF 2', value: 'adf-2' },
    { label: 'ADF 1', value: 'adf-1' },
    { label: 'عدد', value: 'piece' },
]

export const SIZING_OPTIONS: DropdownOption[] = [
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
]

export const COLOR_OPTIONS: DropdownOption[] = [
    { label: 'مشکی', value: 'black' },
    { label: 'سفید', value: 'white' },
    { label: 'قرمز', value: 'red' },
    { label: 'آبی', value: 'blue' },
]

export const COLOR_HEX: Record<string, string> = {
    black: '#111111',
    white: '#FFFFFF',
    red: '#E53935',
    blue: '#6BB7E9',
}

export const PACK_OPTIONS: DropdownOption[] = [
    { label: '۶', value: '6' },
    { label: '۱۲', value: '12' },
    { label: '۲۴', value: '24' },
    { label: 'عدد', value: 'number' },
]

export const packColumnLabel = (value: string) => {
    if (value === 'number') return 'عدد'
    const option = PACK_OPTIONS.find((item) => item.value === value)
    return option ? `پک ${option.label} عددی` : value
}

const AttributesTab = () => {
    const { push } = useRouter()
    const {
        salesUnit,
        setSalesUnit,
        sizes,
        setSizes,
        colors,
        setColors,
        packs,
        setPacks,
    } = useCreateProducts()

    return (
        <div className='flex flex-col gap-6' dir='rtl'>
            <div className='grid grid-cols-2 gap-6'>
                <FormDropdown
                    label='واحد فروش'
                    placeholder='انتخاب'
                    value={salesUnit}
                    options={SALES_UNIT_OPTIONS}
                    onChange={setSalesUnit}
                />
                <CheckboxDropdown
                    label='سایزبندی'
                    options={SIZING_OPTIONS}
                    values={sizes}
                    onChange={setSizes}
                />
                <CheckboxDropdown
                    label='رنگ'
                    options={COLOR_OPTIONS}
                    values={colors}
                    onChange={setColors}
                />
                <CheckboxDropdown
                    label='پک ها'
                    options={PACK_OPTIONS}
                    values={packs}
                    onChange={setPacks}
                />

            </div>
            <Button
                type='button'
                variant='outline'
                className='w-fit border-primary text-primary'
                onClick={() => push('/admin/categories/variable/new')}
            >
                افزودن ویژگی
            </Button>
        </div>
    )
}

export default AttributesTab
