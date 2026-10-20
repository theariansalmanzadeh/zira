'use client'

import { useMemo } from 'react'
import {
    useListBrands,
    useListCategories,
} from '@/src/routes/catalog/hooks/catalog'
import { flattenCategories } from '@/src/routes/catalog/addAndUpdateProduct/utils/categories'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'

const ALL = 'all'

const withAll = (options: { label: string; value: string }[]) => [
    { label: 'همه', value: ALL },
    ...options,
]

export const FILTER_DEFAULTS = {
    categoryId: ALL,
    brandId: ALL,
    search: '',
}

export type PricingFilterValues = typeof FILTER_DEFAULTS

type PricingFiltersProps = {
    filters: PricingFilterValues
    onChange: (filters: PricingFilterValues) => void
}

const PricingFilters = ({ filters, onChange }: PricingFiltersProps) => {
    const { data: brands } = useListBrands({ page: 1, page_size: 100 })
    const { data: categoryTree } = useListCategories()

    const categoryOptions = useMemo(
        () =>
            flattenCategories(categoryTree ?? []).map((category) => ({
                label: category.name,
                value: category.id,
            })),
        [categoryTree]
    )

    const brandOptions = useMemo(
        () =>
            (brands?.results ?? []).map((brand) => ({
                label: brand.name,
                value: brand.id,
            })),
        [brands]
    )

    const update = (key: keyof PricingFilterValues, value: string) => {
        onChange({ ...filters, [key]: value })
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex flex-row flex-wrap items-end gap-3'>
                <FormDropdown
                    className='min-w-36 flex-1'
                    label='دسته‌بندی'
                    value={filters.categoryId}
                    options={withAll(categoryOptions)}
                    onChange={(value) => update('categoryId', value)}
                />
                <FormDropdown
                    className='min-w-36 flex-1'
                    label='برند'
                    value={filters.brandId}
                    options={withAll(brandOptions)}
                    onChange={(value) => update('brandId', value)}
                />
                <Button
                    type='button'
                    variant='outline'
                    onClick={() => onChange(FILTER_DEFAULTS)}
                >
                    پاک‌کردن
                </Button>
            </div>
            <Input
                label='جستجو'
                placeholder='نام، برند یا کد خانواده...'
                value={filters.search}
                onChange={(value) => update('search', value)}
                wrapperClassName='w-full'
            />
        </div>
    )
}

export default PricingFilters
