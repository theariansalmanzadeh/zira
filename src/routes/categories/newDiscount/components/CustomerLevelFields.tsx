'use client'

import { useState } from 'react'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { cn } from '@/src/shared/libs/utils'
import {
    CUSTOMER_LEVEL_OPTIONS,
    type CustomerLevel,
} from '../constant'
import { RequiredLabel } from './CodeSpecsCard'

const CustomerLevelFields = () => {
    const [selectedLevels, setSelectedLevels] = useState<CustomerLevel[]>([])

    const toggleLevel = (value: CustomerLevel) => {
        setSelectedLevels((prev) =>
            prev.includes(value)
                ? prev.filter((level) => level !== value)
                : [...prev, value]
        )
    }

    return (
        <div className='flex flex-col gap-1.5'>
            <RequiredLabel>سطح مشتری</RequiredLabel>
            <div className='flex flex-row flex-wrap gap-2'>
                {CUSTOMER_LEVEL_OPTIONS.map((option) => {
                    const checked = selectedLevels.includes(option.value)

                    return (
                        <button
                            key={option.value}
                            type='button'
                            onClick={() => toggleLevel(option.value)}
                            className={cn(
                                'flex flex-1 items-center justify-between gap-3 rounded-card-md border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-right transition-colors',
                                checked && 'border-primary bg-primary/8'
                            )}
                        >
                            <Checkbox
                                checked={checked}
                                onCheckedChange={() => toggleLevel(option.value)}
                                onClick={(event) => event.stopPropagation()}
                                variant='default-outline'
                                className='size-5 rounded-sm'
                            />
                            <span className='text-label-lg text-nowrap text-on-surface'>
                                {option.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default CustomerLevelFields
