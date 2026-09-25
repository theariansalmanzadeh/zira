'use client'

import StepperStatus from '@/src/shared/components/StepperStatus/StepperStatus'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import {
    TRANSFER_DETAIL_DUMMY,
    buildBranchTransferStepperSteps,
    type TransferDetailData,
} from './constants'
import Header from './components/Header'
import TransferPath from './components/TransferPath'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'

type BranchTransferDetailProps = {
    data?: TransferDetailData
}

const BranchTransferDetail = ({
    data = TRANSFER_DETAIL_DUMMY,
}: BranchTransferDetailProps) => {
    const totalUnits = data.products.reduce(
        (sum, product) => sum + product.quantity,
        0
    )
    const steps = buildBranchTransferStepperSteps(data.status)

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <Header data={data} />

            <TransferPath data={data} />

            <div className='flex flex-col gap-3'>
                <div className='flex flex-row flex-wrap items-center gap-2'>
                    <h3 className='text-title-md font-semibold text-on-surface'>
                        اقلام انتقال
                    </h3>
                    <span className='text-label-md text-outline'>
                        {formatFaNumber(data.products.length)} قلم ·{' '}
                        {formatFaNumber(totalUnits)} واحد
                    </span>
                </div>

                <div className='overflow-hidden rounded-card-lg border border-outline-variant'>
                    <TableHeader />
                    <div className='flex flex-col'>
                        {data.products.map((product) => (
                            <TableRow key={product.id} data={product} />
                        ))}
                    </div>
                </div>
            </div>

            <StepperStatus steps={steps} />
        </div>
    )
}

export default BranchTransferDetail
