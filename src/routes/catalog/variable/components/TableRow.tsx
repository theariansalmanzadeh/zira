'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { TableCell, TableRow as UiTableRow } from '@/src/shared/components/ui/Table'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { VariableItem } from '../constants'

type TableRowProps = {
    data: VariableItem
    onEdit?: () => void
    onDelete?: () => void
}

const TableRow = ({ data, onEdit, onDelete }: TableRowProps) => (
    <>
        <UiTableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant'>
            <TableCell>
                <span className='font-semibold text-on-surface'>{data.name}</span>
            </TableCell>
            <TableCell>
                <span className='text-on-surface'>{data.type}</span>
            </TableCell>
            <TableCell>
                <span className='font-bold text-on-surface'>
                    {formatFaNumber(data.valueCount)}
                </span>{' '}
                <span className='text-outline'>عدد</span>
            </TableCell>
            <TableCell>
                <span className='font-bold text-on-surface'>
                    {formatFaNumber(data.productsCount)}
                </span>{' '}
                <span className='text-outline'>کالا</span>
            </TableCell>
            <TableCell className='w-[1%] whitespace-nowrap'>
                <div className='flex items-center gap-0.5'>
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
                        onClick={onDelete}
                    />
                </div>
            </TableCell>
        </UiTableRow>
        <div className='py-1' />
    </>
)

export default TableRow
export type { TableRowProps }
