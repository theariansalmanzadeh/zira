'use client'

import { TableCell, TableRow as UiTableRow } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { StockTakingItem } from '../constants'

type TableRowProps = {
    data: StockTakingItem
}

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable()

    return (
        <>
            <UiTableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface'>
                {TableColoumn[0]?.isChecked && (
                    <TableCell>{data.trackingCode}</TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>{data.warehouseCode}</TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{data.warehouseName}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{data.productType}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{data.productCode}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>{data.productName}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>{data.unit}</TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell>{formatFaNumber(data.quantity)}</TableCell>
                )}
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

export default TableRow
export type { TableRowProps }
