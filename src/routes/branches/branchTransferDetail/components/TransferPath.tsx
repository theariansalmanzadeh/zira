'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import type { TransferDetailData } from '../constants'

type TransferPathProps = {
    data: Pick<
        TransferDetailData,
        'fromBranch' | 'fromWarehouse' | 'toBranch' | 'toWarehouse'
    >
}

const TransferPath = ({ data }: TransferPathProps) => {
    return (
        <div
            className='flex flex-row flex-wrap items-center justify-between gap-4 rounded-card-lg bg-surface-container-high px-6 py-5'
            dir='rtl'
        >
            <div className='flex min-w-0 flex-1 flex-col gap-1 text-right'>
                <span className='text-label-md text-outline'>مبدا</span>
                <span className='text-label-lg font-medium text-on-surface'>
                    {data.fromBranch}
                </span>
                <span className='text-label-md text-outline'>
                    {data.fromWarehouse}
                </span>
            </div>

            <Icon
                label='chevronLeft300Linear'
                className='size-6! shrink-0 text-primary'
            />

            <div className='flex min-w-0 flex-1 flex-col gap-1 text-right'>
                <span className='text-label-md text-outline'>مقصد</span>
                <span className='text-label-lg font-medium text-on-surface'>
                    {data.toBranch}
                </span>
                <span className='text-label-md text-outline'>
                    {data.toWarehouse}
                </span>
            </div>
        </div>
    )
}

export default TransferPath
