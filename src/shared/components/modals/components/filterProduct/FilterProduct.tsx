'use client'

import { useState } from 'react'
import { Button } from '@shared/components/ui/button'
import { Checkbox } from '@shared/components/ui/Checkbox'
import { cn } from '@shared/libs/utils'
import type { BaseModalProps } from '../../types'
import { PLP_PRODUCTS } from '@/src/routes/productsList/constants'

const CATEGORY_FILTERS = [
    { id: 'women', label: 'زنانه' },
    { id: 'men', label: 'مردانه' },
    { id: 'boys', label: 'پسرانه' },
]

const BRAND_FILTERS = Array.from(
    new Set(PLP_PRODUCTS.map((product) => product.brand))
).map((brand) => ({ id: brand, label: brand }))

const FilterProduct = ({ closeModal }: BaseModalProps) => {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const toggleValue = (value: string, setter: (next: string[]) => void) => {
        // setter((prev: string[]) =>
        //     prev.includes(value)
        //         ? prev.filter((item: string) => item !== value)
        //         : [...prev, value]
        // )
    }

    return (
        <div className="flex w-full flex-col gap-4 p-3" dir="rtl">
            <h3 className="text-right text-title-md font-medium text-on-surface">
                فیلترها
            </h3>

            <section className="flex flex-col gap-2">
                <h4 className="text-right text-title-md font-medium text-on-surface">
                    برند
                </h4>
                <div className="flex flex-col gap-2 rounded-container-lg bg-surface-container-high p-3">
                    {BRAND_FILTERS.map((brand) => {
                        const isChecked = selectedBrands.includes(brand.id)
                        return (
                            <div
                                key={brand.id}
                                className={cn(
                                    'flex flex-row items-center gap-3 px-3 py-2.5',
                                    isChecked &&
                                    'rounded-container-md bg-surface-container-lowest'
                                )}
                            >
                                <Checkbox
                                    id={`brand-${brand.id}`}
                                    checked={isChecked}
                                    onCheckedChange={() =>
                                        toggleValue(brand.id, setSelectedBrands)
                                    }
                                    variant="primary"
                                    className="size-5 rounded-md"
                                />
                                <label
                                    htmlFor={`brand-${brand.id}`}
                                    className="flex-1 cursor-pointer select-none text-label-md text-on-surface"
                                >
                                    {brand.label}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="flex flex-col gap-2">
                <h4 className="text-right text-title-md font-medium text-on-surface">
                    دسته‌بندی
                </h4>
                <div className="flex flex-col gap-2 rounded-container-lg bg-surface-container-high p-3">
                    {CATEGORY_FILTERS.map((category) => {
                        const isChecked = selectedCategories.includes(category.id)
                        return (
                            <div
                                key={category.id}
                                className={cn(
                                    'flex flex-row items-center gap-3 px-3 py-2.5',
                                    isChecked &&
                                    'rounded-container-md bg-surface-container-lowest'
                                )}
                            >
                                <Checkbox
                                    id={`category-${category.id}`}
                                    checked={isChecked}
                                    onCheckedChange={() =>
                                        toggleValue(
                                            category.id,
                                            setSelectedCategories
                                        )
                                    }
                                    variant="primary"
                                    className="size-5 rounded-md"
                                />
                                <label
                                    htmlFor={`category-${category.id}`}
                                    className="flex-1 cursor-pointer select-none text-label-md text-on-surface"
                                >
                                    {category.label}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </section>

            <div className="flex flex-row items-center justify-between gap-4">
                <Button
                    type="button"
                    variant="ghost"
                    className="px-0 text-on-surface-variant hover:bg-transparent"
                    onClick={closeModal}
                >
                    بازگشت
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    className="rounded-2xl px-6"
                    onClick={closeModal}
                >
                    اعمال فیلتر
                </Button>
            </div>
        </div>
    )
}

export default FilterProduct
