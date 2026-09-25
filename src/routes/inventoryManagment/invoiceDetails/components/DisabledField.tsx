'use client'

import { Input } from '@/src/shared/components/ui/Input'
import { cn } from '@/src/shared/libs/utils'

type DisabledFieldProps = {
    label: string
    value: string
    className?: string
}

const DisabledField = ({ label, value, className }: DisabledFieldProps) => (
    <div className={cn('flex flex-col gap-2', className)}>
        <span className='text-right text-label-md text-outline'>{label}</span>
        <Input value={value} disabled />
    </div>
)

export default DisabledField
