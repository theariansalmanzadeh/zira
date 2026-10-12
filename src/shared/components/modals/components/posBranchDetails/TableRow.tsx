'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import {
    organizationKeys,
    useDeactivatePosDevice,
} from '@/src/routes/branches/hooks/organization'
import { useModalStore } from '@/src/shared/store/modal-store'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import { POS_DEVICE_GRID_CLASS, type PosDeviceItem } from './constants'

type TableRowProps = {
    data: PosDeviceItem
    branchId: string
}

const TableRow = ({ data, branchId }: TableRowProps) => {
    const { push } = useRouter()
    const queryClient = useQueryClient()
    const closeModal = useModalStore((state) => state.closeModal)
    const { mutate: deactivatePosDevice } = useDeactivatePosDevice()
    const [isExpanded, setIsExpanded] = useState(false)

    const onEdit = () => {
        push(`/admin/branches/pos-device/${data.id}/edit`)
        closeModal()
    }

    const onRemove = () => {
        deactivatePosDevice(data.id, {
            onSuccess: () => {
                if (!branchId) return
                queryClient.invalidateQueries({
                    queryKey: organizationKeys.branches.detail(branchId),
                })
            },
        })
    }

    return (
        <div className='border-b border-outline-variant bg-surface-container-lowest last:border-b-0'>
            <div
                className={cn(
                    POS_DEVICE_GRID_CLASS,
                    'px-3 py-3 text-label-lg text-on-surface-variant'
                )}
            >
                <div>{formatFaNumber(data.index)}</div>
                <div className='flex flex-row items-center gap-3'>
                    <div className='flex min-w-0 flex-col gap-0.5'>
                        <span className='font-medium text-on-surface'>
                            {data.name}
                        </span>
                        <span
                            dir='ltr'
                            className='text-right text-label-md text-outline'
                        >
                            {data.code}
                        </span>
                    </div>
                </div>
                <div>{data.model}</div>
                <div>{data.bank}</div>
                <div dir='ltr' className='text-right'>
                    {formatFaNumber(data.bankAccount, { useGrouping: false })}
                </div>
                <div
                    dir='ltr'
                    className='text-right font-semibold text-on-surface'
                >
                    {formatFaNumber(data.terminalNumber, {
                        useGrouping: false,
                    })}
                </div>
                <div dir='ltr' className='text-right'>
                    {formatFaNumber(data.terminalPassword, {
                        useGrouping: false,
                    })}
                </div>
                <button
                    type='button'
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className='flex size-8 items-center justify-center rounded-full hover:bg-surface-container-high'
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? 'بستن جزئیات' : 'نمایش جزئیات'}
                >
                    <Icon
                        label='chevronDown400Linear'
                        className={cn(
                            'size-5! text-on-surface-variant transition-transform',
                            isExpanded && 'rotate-180'
                        )}
                    />
                </button>
            </div>
            {isExpanded && (
                <div className='flex flex-wrap items-center gap-4 px-3 pb-3 text-label-lg text-on-surface-variant mt-3'>
                    <div>
                        <span className='text-outline'>صندوق متصل: </span>
                        {data.cashRegister}
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <span className='text-outline'>تراکنش امروز: </span>
                        <span>
                            {formatFaNumber(data.todayTransactionsMillion)}
                        </span>
                        <Icon
                            label='currency'
                            className='size-5! text-on-surface-variant'
                        />
                    </div>
                    <IconButton
                        icon='editSquare400Linear'
                        variant='ghost'
                        className='size-8!'
                        iconClassName='size-5! text-outline'
                        onClick={onEdit}
                    />
                    <IconButton
                        icon='delete400Linear'
                        variant='ghost'
                        className='size-8!'
                        iconClassName='size-5! text-outline'
                        onClick={onRemove}
                    />
                </div>
            )}
        </div>
    )
}

export default TableRow
