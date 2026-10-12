"use client"

import { useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/src/shared/components/ui/DropdownMenu'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { cn } from '@shared/libs/utils'
import { DropdownOption } from '../../../types'
import PriceInputSection from './components/priceInputSection'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'

interface FormDropdownProps {
    label: string
    placeholder?: string
    value?: string
    options: DropdownOption[]
    onChange: (value: string) => void
}

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

const BASE_PRICE_BASIS_OPTIONS: DropdownOption[] = [
    { label: 'واحد فروش', value: 'sales-unit' },
    { label: 'سایز', value: 'size' },
    { label: 'رنگ', value: 'color' },
]

const dropdownContentClassName =
    'bg-surface-container-lowest min-w-(--radix-dropdown-menu-trigger-width) rounded-card-md p-sm shadow-lg ring-4 ring-outline-variant'

// const FormDropdown = ({
//     label,
//     placeholder = 'انتخاب',
//     value,
//     options,
//     onChange,
// }: FormDropdownProps) => {
//     const selectedLabel = options.find((option) => option.value === value)?.label

//     return (
//         <div className='flex flex-col'>
//             <span className='mb-1.5 text-label-md font-normal text-on-surface-variant'>{label}</span>
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button
//                         variant='default-high'
//                         className='w-full justify-between rounded-container-lg!'
//                     >
//                         <span
//                             className={cn(
//                                 'text-base md:text-sm',
//                                 selectedLabel ? 'text-on-surface' : 'text-outline'
//                             )}
//                         >
//                             {selectedLabel ?? placeholder}
//                         </span>
//                         <Icon label='chevronDown400Broken' className='size-6! shrink-0' />
//                     </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align='start' className={dropdownContentClassName}>
//                     {options.map((option) => (
//                         <DropdownMenuItem
//                             key={option.value}
//                             className='cursor-pointer rounded-md px-2 py-1.5 text-on-surface-variant focus:bg-surface-container-high'
//                             onSelect={() => onChange(option.value)}
//                         >
//                             {option.label}
//                         </DropdownMenuItem>
//                     ))}
//                 </DropdownMenuContent>
//             </DropdownMenu>
//         </div>
//     )
// }

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
    const [discountType, setDiscountType] = useState('percentage')
    const [basePriceBasis, setBasePriceBasis] = useState<string[]>(['sales-unit', 'size'])

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-3 gap-6'>
                <Input label='قیمت واحد' placeholder='قیمت واحد' />

                <FormDropdown
                    label='نوع تخفیف'
                    value={discountType}
                    options={DISCOUNT_TYPE_OPTIONS}
                    onChange={setDiscountType}
                />

                <Input label='درصد تخفیف' placeholder='درصد تخفیف' />
            </div>

            <FormMultiSelect
                label='قیمت پایه بر اساس'
                value={basePriceBasis}
                options={BASE_PRICE_BASIS_OPTIONS}
                onChange={setBasePriceBasis}
            />

            <PriceInputSection />
        </div>
    )
}

export default PricingTab
