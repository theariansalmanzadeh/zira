'use client'

import { useState } from 'react'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import type { DropdownOption } from '../../types'

const SALES_UNIT_OPTIONS: DropdownOption[] = [
    { label: 'ADF 2', value: 'adf-2' },
    { label: 'ADF 1', value: 'adf-1' },
    { label: 'عدد', value: 'piece' },
]

const SIZING_OPTIONS: DropdownOption[] = [
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
]

const COLOR_OPTIONS: DropdownOption[] = [
    { label: 'مشکی', value: 'black' },
    { label: 'سفید', value: 'white' },
    { label: 'قرمز', value: 'red' },
    { label: 'آبی', value: 'blue' },
]

const AttributesTab = () => {
    const [salesUnit, setSalesUnit] = useState<string>()
    const [sizing, setSizing] = useState<string>()
    const [color, setColor] = useState<string>()

    return (
        <div className='grid grid-cols-2 gap-6' dir='rtl'>
            <FormDropdown
                label='واحد فروش'
                placeholder='انتخاب'
                value={salesUnit}
                options={SALES_UNIT_OPTIONS}
                onChange={setSalesUnit}
            />
            <FormDropdown
                label='سایزبندی'
                placeholder='انتخاب'
                value={sizing}
                options={SIZING_OPTIONS}
                onChange={setSizing}
            />
            <FormDropdown
                label='رنگ'
                placeholder='انتخاب'
                value={color}
                options={COLOR_OPTIONS}
                onChange={setColor}
            />
        </div>
    )
}

export default AttributesTab
