"use client"

import { useMemo } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/src/shared/components/ui/DropdownMenu'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { useListAttributes } from '@/src/routes/catalog/hooks/catalog'
import { formatPrice } from '@/src/shared/libs/formatter'
import { onlyNumber } from '@/src/shared/schema/generalSchema'
import { useCreateProducts } from '../../../provider/createProductsProvider'
import { DropdownOption } from '../../../types'
import {
    COLOR_BASIS_ID,
    PRODUCT_ATTRIBUTE_LIST_PARAMS,
    SIZE_BASIS_ID,
} from '../../../utils/attributes'
import PriceInputSection from './components/priceInputSection'

const formatMoneyInput = (value: string) =>
    value === '' ? '' : formatPrice(Number(value))

interface FormMultiSelectProps {
    label: string
    placeholder?: string
    value: string[]
    options: DropdownOption[]
    onChange: (value: string[]) => void
}

const DISCOUNT_TYPE_OPTIONS: DropdownOption[] = [
    { label: 'درصد', value: 'percentage' },
    { label: 'مبلغ', value: 'amount' },
]

const dropdownContentClassName =
    'bg-surface-container-lowest min-w-(--radix-dropdown-menu-trigger-width) rounded-card-md p-sm shadow-lg ring-4 ring-outline-variant'

const FormMultiSelect = ({
    label,
    placeholder = 'انتخاب',
    value,
    options,
    onChange,
}: FormMultiSelectProps) => {
    const selectedOptions = options.filter((option) => value.includes(option.value))

    const toggleValue = (optionValue: string) => {
        onChange(
            value.includes(optionValue)
                ? value.filter((item) => item !== optionValue)
                : [...value, optionValue]
        )
    }

    const removeValue = (optionValue: string) => {
        onChange(value.filter((item) => item !== optionValue))
    }

    return (
        <div className='flex flex-col'>
            <span className='mb-1.5 text-label-md text-on-surface-variant'>{label}</span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        type='button'
                        variant='default-high'
                        className='flex min-h-10 h-auto! w-full flex-row-reverse items-center justify-between gap-1.5 rounded-container-lg! px-3 py-2 text-right'
                    >
                        <Icon label='chevronDown400Broken' className='size-6! shrink-0' />
                        <div className='flex flex-1 flex-wrap gap-1.5'>
                            {selectedOptions.length > 0 ? (
                                selectedOptions.map((option) => (
                                    <span
                                        key={option.value}
                                        className='inline-flex items-center gap-1 rounded-xl text-label-lg bg-surface-container-lowest py-2! px-3! h-auto! text-on-surface-variant'
                                    >
                                        <button
                                            type='button'
                                            className='rounded-xl! text-outline hover:text-on-surface h-auto!'
                                            onPointerDown={(event) => event.stopPropagation()}
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                removeValue(option.value)
                                            }}
                                        >
                                            <Icon label='closeSm400Broken' className='size-6!' />
                                        </button>
                                        {option.label}
                                    </span>
                                ))
                            ) : (
                                <span className='py-1 text-base text-outline md:text-sm'>{placeholder}</span>
                            )}
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className={dropdownContentClassName}>
                    {options.map((option) => (
                        <DropdownMenuCheckboxItem
                            key={option.value}
                            checked={value.includes(option.value)}
                            className='cursor-pointer rounded-md px-2 py-1.5 text-on-surface-variant focus:bg-surface-container-high'
                            onCheckedChange={() => toggleValue(option.value)}
                            onSelect={(event) => event.preventDefault()}
                        >
                            {option.label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

const PricingTab = () => {
    const {
        attributeSelections,
        basePriceBasis,
        setBasePriceBasis,
        unitPrice,
        setUnitPrice,
        discountType,
        setDiscountType,
        discountValue,
        setDiscountValue,
        sizes,
        colors,
    } = useCreateProducts()
    const { data } = useListAttributes(PRODUCT_ATTRIBUTE_LIST_PARAMS)

    const basisOptions = useMemo(() => {
        const options: DropdownOption[] = []

        if (sizes.length > 0) {
            options.push({ label: 'سایز', value: SIZE_BASIS_ID })
        }
        if (colors.length > 0) {
            options.push({ label: 'رنگ', value: COLOR_BASIS_ID })
        }

        const attributeOptions = (data?.results ?? [])
            .filter(
                (attribute) =>
                    (attributeSelections[attribute.id]?.values ?? []).length > 0
            )
            .sort((left, right) => left.sort_order - right.sort_order)
            .map((attribute) => ({
                label: attribute.name,
                value: attribute.id,
            }))

        return [...options, ...attributeOptions]
    }, [attributeSelections, colors.length, data, sizes.length])

    const selectedBasis = useMemo(() => {
        const available = new Set(basisOptions.map((option) => option.value))
        return basePriceBasis.filter((id) => available.has(id))
    }, [basePriceBasis, basisOptions])

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-3 gap-6'>
                <Input
                    label='قیمت واحد'
                    placeholder='قیمت واحد'
                    value={formatMoneyInput(unitPrice)}
                    onChange={(value) => setUnitPrice(onlyNumber(value))}
                />

                <FormDropdown
                    label='نوع تخفیف'
                    value={discountType}
                    options={DISCOUNT_TYPE_OPTIONS}
                    onChange={setDiscountType}
                />

                <Input
                    label={
                        discountType === 'amount' ? 'مبلغ تخفیف' : 'درصد تخفیف'
                    }
                    placeholder={
                        discountType === 'amount' ? 'مبلغ تخفیف' : 'درصد تخفیف'
                    }
                    value={
                        discountType === 'amount'
                            ? formatMoneyInput(discountValue)
                            : discountValue
                    }
                    onChange={(value) => setDiscountValue(onlyNumber(value))}
                />
            </div>

            <FormMultiSelect
                label='قیمت پایه بر اساس'
                value={selectedBasis}
                options={basisOptions}
                onChange={setBasePriceBasis}
            />

            <PriceInputSection />
        </div>
    )
}

export default PricingTab
