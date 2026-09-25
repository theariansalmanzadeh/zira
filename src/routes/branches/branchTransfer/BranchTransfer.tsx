'use client'

import { TransferCard } from '@/src/shared/components/ui/TransferCard'
import { BRANCH_TRANSFER_DUMMY } from './constants'

const BranchTransfer = () => {
    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            {BRANCH_TRANSFER_DUMMY.map((item) => (
                <TransferCard key={item.id} data={item} />
            ))}
        </div>
    )
}

export default BranchTransfer
