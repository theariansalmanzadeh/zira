'use client'

import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import { TableCell, TableRow as UiTableRow } from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaDate, formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { getBundleDetailHref } from '../../createAndUpdateBundle/constants'
import type { BundleItem } from '../constants'

type TableRowProps = {
    data: BundleItem
}

const CountCell = ({ value }: { value: number }) => (
    <div className="flex items-baseline gap-1">
        <span className="text-label-lg font-bold text-on-surface">
            {formatFaNumber(value)}
        </span>
        <span className="text-label-md text-outline">عدد</span>
    </div>
)

const TableRow = ({ data }: TableRowProps) => {
    const { push } = useRouter()
    const { TableColoumn } = useTable()
    const href = getBundleDetailHref(data.id)

    const navigateToDetail = () => {
        push(href)
    }

    return (
        <>
            <UiTableRow
                className="cursor-pointer [&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant"
                onClick={navigateToDetail}
            >
                {TableColoumn[0]?.isChecked && (
                    <TableCell>
                        <span className="inline-flex rounded-card-sm bg-surface-container-high px-2.5 py-1 text-label-md font-semibold text-on-surface">
                            {data.code}
                        </span>
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
                        <CountCell value={data.itemsCount} />
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>
                        <CountCell value={data.totalStock} />
                    </TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>
                        <div className="flex items-center gap-1">
                            <span className="text-label-lg font-bold text-success">
                                {formatPrice(data.price)}
                            </span>
                            <Icon label="currency" className="size-5 text-outline" />
                        </div>
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell>
                        <span className="text-on-surface">
                            {formatFaDate(data.createdAt)}
                        </span>
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <div className="flex items-center gap-0.5">
                            <IconButton
                                icon="editSquare400Linear"
                                variant="ghost"
                                className="size-8!"
                                iconClassName="size-5! text-outline"
                                onClick={navigateToDetail}
                            />
                            <IconButton
                                icon="chevronRight400Linear"
                                variant="ghost"
                                className="size-8!"
                                iconClassName="size-5! text-outline rotate-180"
                                onClick={navigateToDetail}
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
