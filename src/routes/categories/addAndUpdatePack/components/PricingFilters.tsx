'use client'

import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'

const ALL = 'all'

const withAll = (options: { label: string; value: string }[]) => [
    { label: 'همه', value: ALL },
    ...options,
]

const MAIN_CATEGORY_OPTIONS = withAll([
    { label: 'لباس زیر زنانه', value: 'underwear' },
    { label: 'لباس خواب', value: 'sleepwear' },
])

const MID_CATEGORY_OPTIONS = withAll([
    { label: 'شورت و تانگا', value: 'shorts' },
    { label: 'سوتین', value: 'bra' },
])

const SUB_CATEGORY_OPTIONS = withAll([
    { label: 'شورت زنانه', value: 'women-shorts' },
    { label: 'سوتین زنانه', value: 'women-bra' },
])

const BRAND_OPTIONS = withAll([
    { label: 'لمیس', value: 'lemis' },
    { label: 'سایر', value: 'other' },
])

const SIZE_OPTIONS = withAll([
    { label: 'XS', value: 'xs' },
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
])

const COLOR_OPTIONS = withAll([
    { label: 'قرمز', value: 'red' },
    { label: 'آبی', value: 'blue' },
    { label: 'سبز', value: 'green' },
])

export const FILTER_DEFAULTS = {
    mainCategory: ALL,
    midCategory: ALL,
    subCategory: ALL,
    brand: ALL,
    size: ALL,
    color: ALL,
    search: '',
}

export type PricingFilterValues = typeof FILTER_DEFAULTS

type PricingFiltersProps = {
    filters: PricingFilterValues
    onChange: (filters: PricingFilterValues) => void
}

const PricingFilters = ({ filters, onChange }: PricingFiltersProps) => {
    const update = (key: keyof PricingFilterValues, value: string) => {
        onChange({ ...filters, [key]: value })
    }

    return (
        <div className='flex flex-row flex-wrap items-end gap-3'>
            <FormDropdown
                className='min-w-36 flex-1'
                label='دسته اصلی'
                value={filters.mainCategory}
                options={MAIN_CATEGORY_OPTIONS}
                onChange={(value) => update('mainCategory', value)}
            />
            <FormDropdown
                className='min-w-36 flex-1'
                label='دسته میانی'
                value={filters.midCategory}
                options={MID_CATEGORY_OPTIONS}
                onChange={(value) => update('midCategory', value)}
            />
            <FormDropdown
                className='min-w-36 flex-1'
                label='دسته فرعی'
                value={filters.subCategory}
                options={SUB_CATEGORY_OPTIONS}
                onChange={(value) => update('subCategory', value)}
            />
            <FormDropdown
                className='min-w-36 flex-1'
                label='برند'
                value={filters.brand}
                options={BRAND_OPTIONS}
                onChange={(value) => update('brand', value)}
            />
            <FormDropdown
                className='min-w-28 flex-1'
                label='سایز'
                value={filters.size}
                options={SIZE_OPTIONS}
                onChange={(value) => update('size', value)}
            />
            <FormDropdown
                className='min-w-28 flex-1'
                label='رنگ'
                value={filters.color}
                options={COLOR_OPTIONS}
                onChange={(value) => update('color', value)}
            />
            <Input
                label='جستجو'
                placeholder='نام، طرح، برند یا کد خانواده...'
                value={filters.search}
                onChange={(value) => update('search', value)}
                wrapperClassName='min-w-52'
            />
            <Button
                type='button'
                variant='outline'
                onClick={() => onChange(FILTER_DEFAULTS)}
            >
                پاک‌کردن
            </Button>
        </div>
    )
}

export default PricingFilters
