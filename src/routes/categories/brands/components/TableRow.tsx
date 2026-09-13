'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { TableCell, TableRow as UiTableRow } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { BrandItem } from '../constants'

type TableRowProps = {
    data: BrandItem
    onEdit?: () => void
    onMore?: () => void
}

const TableRow = ({ data, onEdit, onMore }: TableRowProps) => {
    const { TableColoumn } = useTable()
    const isActive = data.status === 'active'

    return (
        <>
            <UiTableRow className="[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <div
                                className={cn(
                                    'flex size-10 shrink-0 items-center justify-center rounded-card-md text-label-lg font-bold',
                                    data.avatarClassName
                                )}
                            >
                                {data.initial}
                            </div>
                            <div className="flex min-w-0 flex-col gap-0.5 text-right">
                                <span className="font-semibold text-on-surface">
                                    {data.name}
                                </span>
                                <span className="truncate text-label-md text-outline">
                                    {data.slug}
                                </span>
                            </div>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <span className="text-on-surface">{data.field}</span>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <span className="text-on-surface">
                            {formatFaNumber(data.productsCount)} عدد
                        </span>
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        <span className="text-on-surface">{data.country}</span>
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <Pill
                            text={isActive ? 'فعال' : 'غیرفعال'}
                            variant={isActive ? 'success' : 'tonal'}
                            hasDot
                            className="border-0"
                        />
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <div className="flex items-center gap-0.5">
                            <IconButton
                                icon="editSquare400Linear"
                                variant="ghost"
                                className="size-8!"
                                iconClassName="size-5! text-outline"
                                onClick={onEdit}
                            />
                            <IconButton
                                icon="moreHorizontal300Broken"
                                variant="ghost"
                                className="size-8!"
                                iconClassName="size-5! text-outline"
                                onClick={onMore}
                            />
                        </div>
                    </TableCell>
                )}
            </UiTableRow>
            <div className="py-1" />
        </>
    )
}

export default TableRow
export type { TableRowProps }
