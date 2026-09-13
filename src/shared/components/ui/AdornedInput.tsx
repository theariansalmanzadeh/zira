'use client'

import { useId } from 'react'
import { InputField } from '@/src/shared/components/ui/Input'
import { cn } from '@/src/shared/libs/utils'

export type AdornedInputProps = {
    label: string
    required?: boolean
    value: string
    onChange: (value: string) => void
    suffix: string
    placeholder?: string
    msg?: string
    className?: string
    wrapperClassName?: string
}

const AdornedInput = ({
    label,
    required,
    value,
    onChange,
    suffix,
    placeholder,
    msg,
    className,
    wrapperClassName,
}: AdornedInputProps) => {
    const id = useId()

    return (
        <div className={cn('flex flex-col', className)}>
            <label
                htmlFor={id}
                className='mb-1.5 text-label-md text-on-surface-variant'
            >
                {label}
                {required && <span className='text-error'> *</span>}
            </label>
            <div
                className={cn(
                    'bg-surface-container-high flex flex-row items-center gap-1.5 rounded-container-lg px-3 py-3',
                    wrapperClassName
                )}
            >
                <InputField
                    id={id}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className='w-full bg-transparent'
                />
                <span className='shrink-0 text-outline'>{suffix}</span>
            </div>
            {msg && (
                <span className='mt-1 text-sm text-on-surface-variant'>{msg}</span>
            )}
        </div>
    )
}

export default AdornedInput
