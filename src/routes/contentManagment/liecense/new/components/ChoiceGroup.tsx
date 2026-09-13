'use client'

import { cn } from '@shared/libs/utils'

export type ChoiceGroupProps = {
    label: string
    options: { value: string; label: string }[]
    value: string
    onChange: (value: string) => void
}

const ChoiceGroup = ({
    label,
    options,
    value,
    onChange,
}: ChoiceGroupProps) => (
    <div className="flex flex-col gap-2">
        <span className="text-label-md font-semibold text-on-surface-variant">
            {label}
        </span>
        <div className="flex items-center gap-2">
            {options.map((option) => {
                const selected = option.value === value

                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={cn(
                            'h-10 flex-1 rounded-card-md border px-3 text-label-md font-semibold transition-colors',
                            selected
                                ? 'border-primary bg-primary/8 text-primary'
                                : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                        )}
                    >
                        {option.label}
                    </button>
                )
            })}
        </div>
    </div>
)

export default ChoiceGroup
