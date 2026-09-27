'use client'

import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import { TableCell, TableRow as UiTableRow } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { VariantProps } from 'class-variance-authority'
import {
    PACK_VISIBILITY_LABEL,
    type PackListItem,
    type PackVisibility,
} from '../constants'

const VISIBILITY_VARIANT: Record<
    PackVisibility,
    VariantProps<typeof PillVariants>['variant']
> = {
    public: 'success',
    'customer-group': 'info',
    hidden: 'tonal',
}

const TableRow = ({ data }: { data: PackListItem }) => {
    const { TableColoumn } = useTable()

    return (
        <>
            <UiTableRow className="[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <div className="size-12 shrink-0 rounded-card-md bg-info-container" />
                            <div className="flex min-w-0 flex-col gap-0.5 text-right">
                                <span className="truncate font-semibold text-on-surface">
                                    {data.name}
                                </span>
                                <span className="truncate text-label-md text-outline">
                                    {data.itemCode} : {data.itemName}
                                </span>
                            </div>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        {data.brand} : {data.model}
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{data.variety}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{data.packCount}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell className="text-error">{data.price}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className="text-error">{data.available}</TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell>
                        <Pill
                            text={PACK_VISIBILITY_LABEL[data.visibility]}
                            variant={VISIBILITY_VARIANT[data.visibility]}
                            hasDot
                            className="w-fit border-0"
                        />
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    )
}

export default TableRow
