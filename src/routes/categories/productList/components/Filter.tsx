'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/src/shared/components/ui/Accordion'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { useSearchParam } from '@/src/shared/hooks/useSearchParam'

const ALL = 'all'

const withAll = (options: { label: string; value: string }[]) => [
    { label: 'همه', value: ALL },
    ...options,
]

const MAIN_CATEGORY_OPTIONS = withAll([
    { label: 'لباس زیر', value: 'underwear' },
    { label: 'لباس خواب', value: 'sleepwear' },
    { label: 'لباس ورزشی', value: 'sport' },
])

const SUB_CATEGORY_OPTIONS = withAll([
    { label: 'زنانه', value: 'women' },
    { label: 'راحتی', value: 'comfort' },
])

const FINAL_CATEGORY_OPTIONS = withAll([
    { label: 'بادی', value: 'body' },
    { label: 'ست', value: 'set' },
    { label: 'شورت', value: 'brief' },
    { label: 'سوتین', value: 'bra' },
    { label: 'تاپ', value: 'top' },
])

const BRAND_OPTIONS = withAll([
    { label: 'Lorenzo', value: 'Lorenzo' },
    { label: 'Victoria', value: 'Victoria' },
    { label: 'Calvin Klein', value: 'Calvin Klein' },
    { label: 'Nike', value: 'Nike' },
])

const SIZE_OPTIONS = withAll([
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
])

const COLOR_OPTIONS = withAll([
    { label: 'مشکی', value: 'black' },
    { label: 'سفید', value: 'white' },
    { label: 'ساتن', value: 'satin' },
    { label: 'گیپور', value: 'guipure' },
])

type ProductFilters = {
    main: string
    subCategory: string
    final: string
    brand: string
    size: string
    color: string
    q: string
}

const EMPTY_FILTERS: ProductFilters = {
    main: ALL,
    subCategory: ALL,
    final: ALL,
    brand: ALL,
    size: ALL,
    color: ALL,
    q: '',
}

const readFilters = (searchParams: URLSearchParams): ProductFilters => ({
    main: searchParams.get('main') || ALL,
    subCategory: searchParams.get('subCategory') || ALL,
    final: searchParams.get('final') || ALL,
    brand: searchParams.get('brand') || ALL,
    size: searchParams.get('size') || ALL,
    color: searchParams.get('color') || ALL,
    q: searchParams.get('q') || '',
})

const Filter = () => {
    const searchParams = useSearchParams()
    const { setSearchParams } = useSearchParam()
    const searchKey = searchParams.toString()
    const [filters, setFilters] = useState<ProductFilters>(() =>
        readFilters(searchParams)
    )

    useEffect(() => {
        setFilters(readFilters(new URLSearchParams(searchKey)))
    }, [searchKey])

    const updateFilter = (key: keyof ProductFilters, value: string) => {
        setFilters((current) => ({ ...current, [key]: value }))
    }

    const applyFilters = () => {
        setSearchParams({
            main: filters.main === ALL ? null : filters.main,
            subCategory:
                filters.subCategory === ALL ? null : filters.subCategory,
            final: filters.final === ALL ? null : filters.final,
            brand: filters.brand === ALL ? null : filters.brand,
            size: filters.size === ALL ? null : filters.size,
            color: filters.color === ALL ? null : filters.color,
            q: filters.q.trim() || null,
        })
    }

    const clearFilters = () => {
        setFilters(EMPTY_FILTERS)
        setSearchParams({
            main: null,
            subCategory: null,
            final: null,
            brand: null,
            size: null,
            color: null,
            q: null,
        })
    }

    return (
        <Accordion
            type="single"
            collapsible
            className="rounded-card-lg bg-surface-container-lowest px-4"
            dir="rtl"
        >
            <AccordionItem value="product-filters" className="border-0">
                <AccordionTrigger
                    iconType="chevronDown400Linear"
                    className="text-title-md text-on-surface hover:no-underline"
                >
                    فیلترها
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <FormDropdown
                                label="دسته اصلی"
                                value={filters.main}
                                options={MAIN_CATEGORY_OPTIONS}
                                onChange={(value) => updateFilter('main', value)}
                            />
                            <FormDropdown
                                label="دسته فرعی"
                                value={filters.subCategory}
                                options={SUB_CATEGORY_OPTIONS}
                                onChange={(value) =>
                                    updateFilter('subCategory', value)
                                }
                            />
                            <FormDropdown
                                label="دسته نهایی"
                                value={filters.final}
                                options={FINAL_CATEGORY_OPTIONS}
                                onChange={(value) => updateFilter('final', value)}
                            />
                            <FormDropdown
                                label="برند"
                                value={filters.brand}
                                options={BRAND_OPTIONS}
                                onChange={(value) => updateFilter('brand', value)}
                            />
                            <FormDropdown
                                label="سایز"
                                value={filters.size}
                                options={SIZE_OPTIONS}
                                onChange={(value) => updateFilter('size', value)}
                            />
                            <FormDropdown
                                label="رنگ"
                                value={filters.color}
                                options={COLOR_OPTIONS}
                                onChange={(value) => updateFilter('color', value)}
                            />
                        </div>
                        <Input
                            label="جستجو"
                            value={filters.q}
                            placeholder="نام یا کد کالا..."
                            onChange={(value) => updateFilter('q', value)}
                        />
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={applyFilters}
                            >
                                اعمال فیلتر
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={clearFilters}
                            >
                                پاک کردن فیلترها
                            </Button>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default Filter
