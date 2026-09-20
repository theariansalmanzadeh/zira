'use client'

import { useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Button } from '@/src/shared/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/src/shared/components/ui/DropdownMenu'
import SelectItem from '@/src/shared/components/ui/SelectItem'
import { cn } from '@shared/libs/utils'
import {
    PRODUCT_SCOPE_OPTIONS,
    STOCK_TAKING_MANAGER_OPTIONS,
    STOCK_TAKING_WAREHOUSE_OPTIONS,
    type ProductScope,
} from '../constants'

type InitialStockTakingFormProps = {
    date?: Date
    onDateChange: (date: Date | undefined) => void
    manager?: string
    onManagerChange: (value: string) => void
    scope: ProductScope
    onScopeChange: (scope: ProductScope) => void
    onStart: () => void
}

const InitialStockTakingForm = ({
    date,
    onDateChange,
    manager,
    onManagerChange,
    scope,
    onScopeChange,
    onStart,
}: InitialStockTakingFormProps) => {
    const [warehouse, setWarehouse] = useState<string>()
    const selectedWarehouseLabel = STOCK_TAKING_WAREHOUSE_OPTIONS.find(
        (option) => option.value === warehouse
    )?.label

    return (
        <div
            className='flex flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <div className='flex flex-col gap-1'>
                <h2 className='text-title-md font-semibold text-on-surface'>
                    فرم اولیه انبارگردانی
                </h2>
                <p className='text-label-md text-outline'>
                    تاریخ، دامنه محصولات و مسئول انبارگردانی را مشخص کنید.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <CalendarButton
                    label='تاریخ انبارگردانی'
                    value={date}
                    onChange={onDateChange}
                />
                <FormDropdown
                    label='مسئول انبارگردانی'
                    placeholder='انتخاب مسئول'
                    value={manager}
                    options={STOCK_TAKING_MANAGER_OPTIONS}
                    onChange={onManagerChange}
                />
            </div>

            <div className='flex flex-col gap-3'>
                <span className='text-label-md text-on-surface-variant'>
                    دامنه محصولات (نوع گستردگی)
                </span>
                <div className='grid grid-cols-1 gap-2 md:grid-cols-3'>
                    {PRODUCT_SCOPE_OPTIONS.map((option) => (
                        <SelectItem
                            key={option.value}
                            title={option.title}
                            description={option.description}
                            icon={option.icon}
                            selected={scope === option.value}
                            onClick={() => onScopeChange(option.value)}
                        />
                    ))}
                </div>
            </div>

            {scope === 'product-group' && (
                <div className='flex flex-col gap-2'>
                    <span className='text-label-md text-on-surface-variant'>
                        گروه کالا
                    </span>
                    <button
                        type='button'
                        className='flex w-full flex-row items-center justify-between rounded-container-lg border border-dashed border-primary/50 bg-surface-container-lowest px-4 py-3 text-right transition-colors hover:bg-primary/5'
                    >
                        <span className='text-label-lg text-on-surface-variant'>
                            انتخاب گروه کالا
                        </span>
                        <span className='text-label-md font-medium text-primary'>
                            انتخاب از درختواره
                        </span>
                    </button>
                    <p className='text-label-sm text-outline'>
                        درختواره سه سطحی دسته اصلی، میانی و فرعی با امکان انتخاب
                        چندگانه در هر سطح.
                    </p>
                </div>
            )}

            {scope === 'warehouse' && (
                <div className='flex flex-col gap-2'>
                    <span className='text-label-md text-on-surface-variant'>
                        انبار
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type='button'
                                className='flex w-full flex-row-reverse items-center justify-between gap-1.5 rounded-container-lg bg-surface-container-high px-3 py-3 text-right text-label-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                            >
                                <Icon
                                    label='chevronDown300Broken'
                                    className='size-6 shrink-0 text-on-surface-variant'
                                />
                                <span
                                    className={cn(
                                        'text-label-lg md:text-sm',
                                        selectedWarehouseLabel
                                            ? 'text-on-surface'
                                            : 'text-outline'
                                    )}
                                >
                                    {selectedWarehouseLabel ?? 'انتخاب انبار'}
                                </span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align='start'
                            className='min-w-(--radix-dropdown-menu-trigger-width) rounded-card-md bg-surface-container-lowest p-sm shadow-lg ring-4 ring-outline-variant'
                        >
                            {STOCK_TAKING_WAREHOUSE_OPTIONS.map((option) => (
                                <DropdownMenuItem
                                    key={option.value}
                                    className='cursor-pointer rounded-md px-2 py-1.5 text-on-surface-variant focus:bg-surface-container-high'
                                    onSelect={() => setWarehouse(option.value)}
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}

            <div className='flex flex-row flex-wrap items-center justify-end gap-3 pt-2'>
                <Button type='button' variant='primary' onClick={onStart}>
                    <span className='text-label-sm text-on-primary'>
                        شروع فرآیند
                    </span>
                    <Icon label='chevronLeft400Linear' className='size-4! text-on-primary' />
                </Button>

            </div>
        </div>
    )
}

export default InitialStockTakingForm
