'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import { POS_DEVICE_GRID_CLASS, type PosDeviceItem } from './constants'

type TableRowProps = {
    data: PosDeviceItem
}

const TableRow = ({ data }: TableRowProps) => {
    return (
        <div
            className={cn(
                POS_DEVICE_GRID_CLASS,
                'min-w-[1100px] border-b border-outline-variant bg-surface-container-lowest px-3 py-3 text-label-lg text-on-surface-variant last:border-b-0'
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
                {formatFaNumber(data.terminalNumber, { useGrouping: false })}
            </div>
            <div dir='ltr' className='text-right'>
                {formatFaNumber(data.terminalPassword, {
                    useGrouping: false,
                })}
            </div>
            <div>{data.cashRegister}</div>
            <div className='flex flex-row items-center gap-1'>
                <span>{formatFaNumber(data.todayTransactionsMillion)}</span>
                <Icon label='currency' className='size-5! text-on-surface-variant' />
            </div>
        </div>
    )
}

export default TableRow
