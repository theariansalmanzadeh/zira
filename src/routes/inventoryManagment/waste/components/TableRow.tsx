'use client'

import { useState } from 'react'
import { formatFaDateTime, formatFaNumber } from '@/src/shared/libs/formatter'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { useTable } from '@/src/shared/context/TableProvider'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import { IconLabel } from '@/src/shared/types/icon'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/src/shared/libs/utils'

export type WasteStatus = 'under-review' | 'approved' | 'rejected'
export type WasteFilterTab = 'all' | 'under-review' | 'approved' | 'rejected'

export type WasteRowData = {
    id: string
    productTitle: string
    quantity: number
    reason: string
    registeredAt: string
    totalAmount: string
    status: WasteStatus
    filterTab: Exclude<WasteFilterTab, 'all'>
    warehouseName: string
    warehouseAddress: string
    warehouseNote: string
    responsibleName: string
    lossAmount: number
}

const STATUS_CONFIG: Record<
    WasteStatus,
    {
        text: string
        variant: VariantProps<typeof PillVariants>['variant']
        icon: IconLabel
    }
> = {
    'under-review': {
        text: 'در حال بررسی',
        variant: 'info',
        icon: 'visibility400Linear',
    },
    approved: {
        text: 'تایید شده',
        variant: 'success',
        icon: 'visibility400Linear',
    },
    rejected: {
        text: 'رد شده',
        variant: 'error',
        icon: 'visibility400Linear',
    },
}

const DETAIL_STATUS_CONFIG: Record<
    WasteStatus,
    { text: string; variant: VariantProps<typeof PillVariants>['variant'] }
> = {
    'under-review': { text: 'در انتظار صورتجلسه', variant: 'warning' },
    approved: { text: 'تایید نهایی', variant: 'success' },
    rejected: { text: 'رد شده', variant: 'error' },
}

export type TableRowProps = {
    data: WasteRowData
    showAdminFields?: boolean
}

export const WasteExpandedDetails = ({
    data,
    showAdminFields = false,
}: {
    data: WasteRowData
    showAdminFields?: boolean
}) => {
    const detailStatus = DETAIL_STATUS_CONFIG[data.status]

    return (
        <div className='grid grid-cols-2 gap-4 rounded-card-md bg-surface-container-lowest px-4 py-4 sm:grid-cols-4'>
            <div className='flex flex-col gap-1 text-right'>
                <span className='text-label-md text-outline'>نام انبار</span>
                <span className='text-label-lg text-on-surface'>
                    {data.warehouseName}
                </span>
            </div>
            <div className='flex flex-col gap-1 text-right'>
                <span className='text-label-md text-outline'>آدرس در انبار</span>
                <span className='text-label-lg text-on-surface'>
                    {data.warehouseAddress}
                </span>
            </div>
            <div className='flex flex-col gap-1 text-right'>
                <span className='text-label-md text-outline'>
                    توضیحات انباردار
                </span>
                <span className='text-label-lg text-on-surface'>
                    {data.warehouseNote}
                </span>
            </div>
            <div className='flex flex-col gap-1 text-right'>
                <span className='text-label-md text-outline'>وضعیت</span>
                <Pill
                    variant={detailStatus.variant}
                    text={detailStatus.text}
                    hasDot
                    className='w-fit border-0'
                />
            </div>
            {showAdminFields && (
                <>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-label-md text-outline'>
                            مسئول انبار
                        </span>
                        <span className='text-label-lg text-on-surface'>
                            {data.responsibleName}
                        </span>
                    </div>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-label-md text-outline'>
                            مبلغ کل زیان
                        </span>
                        <span className='flex items-center gap-1 text-label-lg text-on-surface'>
                            <span>{formatFaNumber(data.lossAmount)}</span>
                            <Icon
                                label='currency'
                                className='size-5! text-on-surface-variant'
                            />
                        </span>
                    </div>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-label-md text-outline'>
                            توضیحات انباردار
                        </span>
                        <span className='text-label-lg text-on-surface'>
                            {data.warehouseNote}
                        </span>
                    </div>
                </>
            )}
        </div>
    )
}

const TableRow = ({ data, showAdminFields = false }: TableRowProps) => {
    const { TableColoumn, visibleTableColoumn } = useTable()
    const [isExpanded, setIsExpanded] = useState(false)
    const {
        id,
        productTitle,
        quantity,
        reason,
        registeredAt,
        totalAmount,
        status,
    } = data
    const statusConfig = STATUS_CONFIG[status]
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
                {TableColoumn[0]?.isChecked && <div>{id}</div>}
                {TableColoumn[1]?.isChecked && (
                    <div className='flex flex-row items-center gap-2'>
                        <div className='size-8 shrink-0 rounded-card-sm bg-surface-container-highest' />
                        <span>{productTitle}</span>
                    </div>
                )}
                {TableColoumn[2]?.isChecked && <div>{quantity}</div>}
                {TableColoumn[3]?.isChecked && <div>{reason}</div>}
                {TableColoumn[4]?.isChecked && (
                    <div>{formatFaDateTime(registeredAt)}</div>
                )}
                {TableColoumn[5]?.isChecked && (
                    <div className='flex items-center gap-1'>
                        <span>{totalAmount}</span>
                        <Icon label='currency' className='size-5!' />
                    </div>
                )}
                {TableColoumn[6]?.isChecked && (
                    <div>
                        <Pill
                            variant={statusConfig.variant}
                            text={statusConfig.text}
                            icon={statusConfig.icon}
                            className='border-0'
                        />
                    </div>
                )}
                {TableColoumn[7]?.isChecked && (
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
                <WasteExpandedDetails
                    data={data}
                    showAdminFields={showAdminFields}
                />
            )}
        </div>
    )
}

export default TableRow
