'use client'

import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import {
    CASH_REGISTER_BADGE_CLASS,
    type CashRegisterRowData,
} from '../constants'

type CashRegisterTableRowProps = {
    data: CashRegisterRowData
}

const CashRegisterTableRow = ({ data }: CashRegisterTableRowProps) => {
    const { TableColoumn } = useTable()

    return (
        <>
            <UiTableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant'>
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className='flex flex-row items-center gap-3'>
                            <span
                                className={cn(
                                    'flex size-8 shrink-0 items-center justify-center rounded-card-sm text-label-md font-semibold',
                                    CASH_REGISTER_BADGE_CLASS[data.badgeTone]
                                )}
                            >
                                {formatFaNumber(data.index)}
                            </span>
                            <div className='flex flex-col gap-0.5'>
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
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{data.cashier}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{data.shift}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{data.posDevice}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{data.bank}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        <span dir='ltr' className='inline-block text-right'>
                            {formatFaNumber(data.bankAccount, {
                                useGrouping: false,
                            })}
                        </span>
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>
                        {formatPrice(data.initialBalance)} ت
                    </TableCell>
                )}
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

export default CashRegisterTableRow
