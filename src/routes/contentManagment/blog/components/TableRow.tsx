'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber, formatFaDate } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    BLOG_CATEGORY_LABELS,
    type BlogRowData,
} from '../constants'

export type TableRowProps = {
    data: BlogRowData
    isExpanded?: boolean
    onToggleExpand?: () => void
    onEdit?: () => void
    onDelete?: () => void
}

const TableRow = ({
    data,
    isExpanded = false,
    onToggleExpand,
    onEdit,
    onDelete,
}: TableRowProps) => {
    const { TableColoumn } = useTable()
    const {
        code,
        title,
        subject,
        author,
        source,
        createdAt,
        views,
        summary,
        content,
        categories,
    } = data
    const visibleColumns = TableColoumn.filter((column) => column.isChecked)

    return (
        <>
            <UiTableRow
                className={cn(
                    '[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant',
                    isExpanded && '[&>td]:rounded-b-none!'
                )}
            >
                {TableColoumn[0]?.isChecked && (
                    <TableCell className="w-[110px]" dir="ltr">
                        <span className="block text-right text-outline">
                            {code}
                        </span>
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <div className="flex items-center gap-1.5">
                            <IconButton
                                icon="chevronUp400Linear"
                                variant="ghost"
                                className="size-8! shrink-0"
                                iconClassName={cn(
                                    'size-4! text-outline transition-transform',
                                    !isExpanded && '-rotate-180'
                                )}
                                onClick={onToggleExpand}
                            />
                            <span className="font-bold text-on-surface">
                                {title}
                            </span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>{subject}</TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{author}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell>{source}</TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell dir="ltr">
                        <span className="block text-right">{formatFaDate(createdAt)}</span>
                    </TableCell>
                )}
                {TableColoumn[6]?.isChecked && (
                    <TableCell className="text-center font-semibold">
                        {formatFaNumber(views)}
                    </TableCell>
                )}
                {TableColoumn[7]?.isChecked && (
                    <TableCell className="w-[1%] whitespace-nowrap">
                        <div
                            className="flex items-center justify-center gap-1"
                            dir="ltr"
                        >
                            <IconButton
                                icon="delete400Linear"
                                variant="ghost"
                                className="size-9!"
                                iconClassName="size-5! text-outline"
                                onClick={onDelete}
                            />
                            <IconButton
                                icon="editSquare400Linear"
                                variant="ghost"
                                className="size-9!"
                                iconClassName="size-5! text-outline"
                                onClick={onEdit}
                            />
                        </div>
                    </TableCell>
                )}
            </UiTableRow>

            {isExpanded && (
                <UiTableRow className="hover:bg-transparent!">
                    <TableCell
                        colSpan={visibleColumns.length}
                        className="whitespace-normal rounded-t-none! bg-surface-container-lowest py-4"
                    >
                        <div className="flex flex-row gap-4 px-2" dir="rtl">
                            <div className="flex flex-col gap-4 w-[60%]">
                                <div className="flex flex-col gap-1.5 rounded-card-md bg-surface-container-highest p-4">
                                    <h4 className="text-label-md font-semibold text-on-surface">
                                        خلاصه متن
                                    </h4>
                                    <p className="text-body-md leading-8 text-on-surface-variant">
                                        {summary}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1.5 rounded-card-md bg-surface-container-highest p-4">
                                    <h4 className="text-label-md font-semibold text-on-surface">
                                        محتوا
                                    </h4>
                                    <p className="text-body-md leading-8 text-on-surface-variant">
                                        {content}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-label-md font-semibold text-on-surface">
                                    دسته‌بندی
                                </h4>
                                <div className="flex flex-wrap items-center gap-2">
                                    {categories.map((category) => (
                                        <Pill
                                            key={category}
                                            text={BLOG_CATEGORY_LABELS[category]}
                                            variant="tonal"
                                            size="sm"
                                            className="border-0 bg-primary-container [&_span]:text-primary"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TableCell>
                </UiTableRow>
            )}

            <tr aria-hidden className="h-1" />
        </>
    )
}

export default TableRow
