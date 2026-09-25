'use client'

import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import {
    COLOR_OPTIONS,
    MAIN_CATEGORY_OPTIONS,
    MODEL_OPTIONS,
    SIZE_OPTIONS,
    SUB_CATEGORY_OPTIONS,
    TURNOVER_OPTIONS,
    type AdvancedSearchValues,
} from '../constants'

type AdvancedSearchFieldsProps = {
    values: AdvancedSearchValues
    onChange: (key: keyof AdvancedSearchValues, value: string) => void
}

const AdvancedSearchFields = ({
    values,
    onChange,
}: AdvancedSearchFieldsProps) => (
    <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <FormDropdown
                label='دسته اصلی'
                value={values.mainCategory}
                options={MAIN_CATEGORY_OPTIONS}
                onChange={(value) => onChange('mainCategory', value)}
            />
            <FormDropdown
                label='دسته فرعی'
                value={values.subCategory}
                options={SUB_CATEGORY_OPTIONS}
                onChange={(value) => onChange('subCategory', value)}
            />
            <FormDropdown
                label='گردش کالا'
                value={values.turnover}
                options={TURNOVER_OPTIONS}
                onChange={(value) => onChange('turnover', value)}
            />
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <FormDropdown
                label='سایز'
                value={values.size}
                options={SIZE_OPTIONS}
                onChange={(value) => onChange('size', value)}
            />
            <FormDropdown
                label='رنگ'
                value={values.color}
                options={COLOR_OPTIONS}
                onChange={(value) => onChange('color', value)}
            />
            <FormDropdown
                label='مدل'
                value={values.model}
                options={MODEL_OPTIONS}
                onChange={(value) => onChange('model', value)}
            />
        </div>
        <Input
            label='نام یا کد کالا'
            value={values.query}
            onChange={(value) => onChange('query', value)}
            placeholder='...جستجو'
            iconId='search400Linear'
            iconClassName='text-on-surface'
        />
    </div>
)

export default AdvancedSearchFields
