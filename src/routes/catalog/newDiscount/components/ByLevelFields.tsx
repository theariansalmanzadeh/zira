'use client'

import { Pill } from '@/src/shared/components/ui/Pill'
import { cn } from '@/src/shared/libs/utils'
import {
    CUSTOMER_LEVEL_OPTIONS,
    type CustomerLevel,
} from '../constant'

type ByLevelFieldsProps = {
    value: CustomerLevel[]
    onChange: (value: CustomerLevel[]) => void
}

const ByLevelFields = ({ value, onChange }: ByLevelFieldsProps) => {
    const toggleLevel = (level: CustomerLevel) => {
        onChange(
            value.includes(level)
                ? value.filter((item) => item !== level)
                : [...value, level]
        )
    }

    return (
        <div className='flex flex-col gap-1.5'>
            <span className='text-label-md text-on-surface-variant'>
                سطح مشتری
            </span>
            <div className='flex flex-row flex-wrap gap-2'>
                {CUSTOMER_LEVEL_OPTIONS.map((option) => {
                    const checked = value.includes(option.value)

                    return (
                        <button
                            key={option.value}
                            type='button'
                            onClick={() => toggleLevel(option.value)}
                            className='cursor-pointer'
                        >
                            <Pill
                                text={option.label}
                                size='lg'
                                variant={checked ? 'primary' : 'outlined'}
                                className={cn(
                                    'pointer-events-none px-3 py-2',
                                    checked && 'ring-2 ring-primary/20'
                                )}
                            />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default ByLevelFields
