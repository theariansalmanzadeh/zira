'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatPrice } from '@/src/shared/libs/formatter'

const AmountCell = ({ value }: { value: number }) => (
    <div className='flex items-center gap-1'>
        <span>{formatPrice(value)}</span>
        <Icon label='currency' className='size-4! text-outline' />
    </div>
)

export default AmountCell
