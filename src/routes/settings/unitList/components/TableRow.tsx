'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { TableCell, TableRow as UiTableRow } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import {
    useDeleteUnit,
    useUpdateUnit,
} from '@/src/routes/settings/hooks/settings'
import type { UnitListItem } from '../constants'

type TableRowProps = {
    data: UnitListItem
}

const TableRow = ({ data }: TableRowProps) => {
    const { TableColoumn } = useTable()
    const { mutate: updateUnit, isPending: isUpdating } = useUpdateUnit()
    const { mutate: deleteUnit, isPending: isDeleting } = useDeleteUnit()

    const toggleActive = () => {
        if (isUpdating) return
        updateUnit({
            unitId: data.id,
            body: { is_active: !data.is_active },
        })
    }

    return (
        <>
            <UiTableRow className="[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant">
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <Pill text={data.code} variant="tonal" className="border-0" />
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <span className="font-semibold text-on-surface">
                            {data.name}
                        </span>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <span className="text-on-surface">
                            {formatFaNumber(data.factor)}
                        </span>
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        <span className="text-on-surface">
                            {data.base_unit_name || '—'}
                        </span>
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <Pill
                            text={data.is_base ? 'بله' : 'خیر'}
                            variant={data.is_base ? 'info' : 'tonal'}
                            className="border-0"
                        />
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        <Pill
                            text={data.is_active ? 'فعال' : 'غیرفعال'}
                            variant={data.is_active ? 'success' : 'tonal'}
                            hasDot
                            className="border-0"
                        />
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <div className="flex items-center gap-0.5">
                            <IconButton
                                icon={
                                    data.is_active
                                        ? 'pause400Linear'
                                        : 'play400Linear'
                                }
                                variant="ghost"
                                className="size-8!"
                                iconClassName="size-5! text-outline"
                                aria-label={
                                    data.is_active ? 'غیرفعال‌سازی' : 'فعال‌سازی'
                                }
                                disabled={isUpdating || isDeleting}
                                onClick={toggleActive}
                            />
                            <IconButton
                                icon="delete400Linear"
                                variant="ghost"
                                className="size-8!"
                                iconClassName="size-5! text-error"
                                aria-label="حذف واحد"
                                disabled={isUpdating || isDeleting}
                                isLoading={isDeleting}
                                onClick={() => deleteUnit(data.id)}
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
