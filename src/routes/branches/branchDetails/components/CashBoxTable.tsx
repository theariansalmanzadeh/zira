'use client'

import type { ReactNode } from 'react'
import type { BranchCashBox } from '@/src/api/types/admin/organization'
import { Icon } from '@/src/shared/components/Icons/Icon'
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { CASH_BOX_SHIFT_LABEL } from '../constants'

const amount = (value?: string) => formatFaNumber(value || '0')

const CashBoxTableHeader = () => {
    const { visibleTableColoumn } = useTable()

    return (
        <TableHeader className='rounded-xl'>
            <TableRow className='[&>*]:text-outline [&>*]:text-label-lg [&>*]:font-normal'>
                {visibleTableColoumn.map((column) => (
                    <TableHead key={column.id}>{column.header_label}</TableHead>
                ))}
            </TableRow>
        </TableHeader>
    )
}

const CashBoxTableRow = ({ data }: { data: BranchCashBox }) => {
    const { visibleTableColoumn } = useTable()
    const cells: Record<string, ReactNode> = {
        code: (
            <span dir='ltr' className='inline-block text-right'>
                {data?.code}
            </span>
        ),
        title: data?.title,
        opening_balance: (
            <span className='inline-flex items-center gap-2'>
                {amount(data?.opening_balance)}
                <Icon label='currency' />
            </span>
        ),
        is_active: data?.is_active ? 'فعال' : 'غیرفعال',
        shift: CASH_BOX_SHIFT_LABEL[data?.shift] ?? data?.shift,
        cashier_name: data?.cashier_name,
        current_cash_balance: (
            <span className='inline-flex items-center gap-2'>
                {amount(data?.current_cash_balance)}
                <Icon label='currency' />
            </span>
        ),
    }

    return (
        <TableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant'>
            {visibleTableColoumn.map((column) => (
                <TableCell key={column.id}>{cells[column.id]}</TableCell>
            ))}
        </TableRow>
    )
}

type CashBoxTableProps = {
    cashBoxes?: BranchCashBox[]
}

const CashBoxTable = ({ cashBoxes = [] }: CashBoxTableProps) => {
    return (
        <>
            <CashBoxTableHeader />
            <TableBody>
                {cashBoxes.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={7}
                            className='py-6 text-center text-label-lg text-outline'
                        >
                            صندوقی ثبت نشده است.
                        </TableCell>
                    </TableRow>
                ) : (
                    cashBoxes.map((cashBox) => (
                        <CashBoxTableRow key={cashBox?.id} data={cashBox} />
                    ))
                )}
            </TableBody>
        </>
    )
}

export default CashBoxTable
