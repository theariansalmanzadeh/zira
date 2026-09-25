'use client'

import { useState, type ReactNode } from 'react'
import { useTable } from '@/src/shared/context/TableProvider'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import { cn } from '@/src/shared/libs/utils'
import { VariantProps } from 'class-variance-authority'
import type {
    TransferInsuranceStatus,
    TransferListRowData,
    TransferListStatus,
} from '../constants'

const INSURANCE_CONFIG: Record<
    TransferInsuranceStatus,
    { text: string; variant: VariantProps<typeof PillVariants>['variant'] }
> = {
    insured: { text: 'بیمه شده', variant: 'success' },
    uninsured: { text: 'بدون بیمه', variant: 'warning' },
}

const TRANSFER_STATUS_CONFIG: Record<
    TransferListStatus,
    { text: string; variant: VariantProps<typeof PillVariants>['variant'] }
> = {
    pending: { text: 'در انتظار', variant: 'warning' },
    sent: { text: 'ارسال شده', variant: 'info' },
    received: { text: 'دریافت شده', variant: 'success' },
}

type TransferListTableRowProps = {
    data: TransferListRowData
}

const DetailField = ({
    label,
    children,
}: {
    label: string
    children: ReactNode
}) => (
    <div className='flex flex-col gap-1 text-right'>
        <span className='text-label-md text-outline'>{label}</span>
        <div className='text-label-lg text-on-surface'>{children}</div>
    </div>
)

const TransferListTableRow = ({ data }: TransferListTableRowProps) => {
    const { TableColoumn, visibleTableColoumn } = useTable()
    const [isExpanded, setIsExpanded] = useState(false)
    const insurance = INSURANCE_CONFIG[data.insuranceStatus]
    const transferStatus = TRANSFER_STATUS_CONFIG[data.transferStatus]
    const gridTemplateColumns = visibleTableColoumn
        .map((_, index) =>
            index === visibleTableColoumn.length - 1 ? 'auto' : 'minmax(0, 1fr)'
        )
        .join(' ')

    return (
        <div className='flex flex-col gap-1' dir='rtl'>
            <div
                className='grid items-center gap-3 rounded-card-md bg-surface-container-lowest px-4 py-3 text-label-lg font-normal text-on-surface-variant'
                style={{ gridTemplateColumns }}
            >
                {TableColoumn[0]?.isChecked && <div>{data.productType}</div>}
                {TableColoumn[1]?.isChecked && <div>{data.productCode}</div>}
                {TableColoumn[2]?.isChecked && <div>{data.productName}</div>}
                {TableColoumn[3]?.isChecked && <div>{data.unit}</div>}
                {TableColoumn[4]?.isChecked && <div>{data.quantity}</div>}
                {TableColoumn[5]?.isChecked && <div>{data.originAddress}</div>}
                {TableColoumn[6]?.isChecked && <div>{data.destinationAddress}</div>}
                {TableColoumn[7]?.isChecked && (
                    <div>
                        <Pill
                            variant={transferStatus.variant}
                            text={transferStatus.text}
                            hasDot
                            className='border-0'
                        />
                    </div>
                )}
                {TableColoumn[8]?.isChecked && (
                    <div className='flex justify-end'>
                        <IconButton
                            icon='chevronLeft300Linear'
                            iconClassName={cn(
                                'size-6! transition-transform',
                                isExpanded && '-rotate-90'
                            )}
                            onClick={() => setIsExpanded((prev) => !prev)}
                        />
                    </div>
                )}
            </div>

            {isExpanded && (
                <div className='grid grid-cols-3 gap-4 rounded-card-md bg-surface-container-lowest p-4'>
                    <DetailField label='انبار مبدا و مسئول'>
                        {data.originWarehouse} — {data.originResponsible}
                    </DetailField>
                    <DetailField label='انبار مقصد و مسئول'>
                        {data.destinationWarehouse} — {data.destinationResponsible}
                    </DetailField>
                    <DetailField label='وضعیت بیمه'>
                        <Pill
                            variant={insurance.variant}
                            text={insurance.text}
                            hasDot
                            className='w-fit border-0'
                        />
                    </DetailField>
                </div>
            )}
        </div>
    )
}

export default TransferListTableRow
