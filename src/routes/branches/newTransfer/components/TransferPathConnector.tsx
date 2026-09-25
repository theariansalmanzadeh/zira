'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@/src/shared/libs/utils'

type TransferPathConnectorProps = {
    className?: string
}

const TransferPathConnector = ({ className }: TransferPathConnectorProps) => {
    return (
        <div className={cn('flex justify-center py-1', className)}>
            <span className='flex size-9 items-center justify-center rounded-full bg-primary-container'>
                <Icon
                    label='arrowDownward400Linear'
                    className='size-5! text-primary'
                />
            </span>
        </div>
    )
}

export default TransferPathConnector
