'use client'

import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Switch } from '@/src/shared/components/ui/Switch'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber, formatFaDate } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import { getFaqCategoryPill, type FaqRowData } from '../constants'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'

export type TableRowProps = {
    data: FaqRowData
    index: number
    isExpanded?: boolean
    onToggleExpand?: () => void
    onVisibleChange?: (visible: boolean) => void
    onEdit?: () => void
    onDelete?: () => void
}

const TableRow = ({
    data,
    index,
    isExpanded = false,
    onToggleExpand,
    onVisibleChange,
    onEdit,
    onDelete,
}: TableRowProps) => {
    const { TableColoumn } = useTable()
    const { id, question, answer, category, createdAt, visible } = data
    const categoryPill = getFaqCategoryPill(category)
    const visibleColumns = TableColoumn.filter((column) => column.isChecked)
    const { openModal } = useModalStore()
    const handleEdit = () => {
        if (onEdit) {
            onEdit()
            return
        }
        openModal(ModalTypes.ADD_NEW_FAQ, {
            id,
            defaultValues: {
                isAddingCategory: false,
                question,
                answer,
                categoryId: category,
            },
        })
    }
    const handleDelete = () => {
        onDelete?.()
    }

    return (
        <>
            <UiTableRow
                className={cn(
                    'cursor-pointer [&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant',
                    isExpanded && '[&>td]:rounded-b-none!'
                )}
                onClick={onToggleExpand}
            >
                {TableColoumn[0]?.isChecked && (
                    <TableCell className="w-[72px]">
                        {formatFaNumber(index)}
                    </TableCell>
                )}
                {TableColoumn[1]?.isChecked && (
                    <TableCell>
                        <div className="flex items-center gap-1.5 whitespace-normal">
                            <span
                                onClick={(event) => event.stopPropagation()}
                                onKeyDown={(event) => event.stopPropagation()}
                            >
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
                            </span>
                            <span className="text-on-surface">{question}</span>
                        </div>
                    </TableCell>
                )}
                {TableColoumn[2]?.isChecked && (
                    <TableCell>
                        <Pill
                            text={categoryPill.text}
                            variant="tonal"
                            className="border-0"
                        />
                    </TableCell>
                )}
                {TableColoumn[3]?.isChecked && (
                    <TableCell>{formatFaDate(createdAt)}</TableCell>
                )}
                {TableColoumn[4]?.isChecked && (
                    <TableCell onClick={(event) => event.stopPropagation()}>
                        <Switch
                            checked={visible}
                            onCheckedChange={onVisibleChange}
                        // className="data-[state=checked]:bg-success"
                        />
                    </TableCell>
                )}
                {TableColoumn[5]?.isChecked && (
                    <TableCell
                        className="w-[1%] whitespace-nowrap"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-center gap-1" dir="ltr">
                            <IconButton
                                icon="delete400Linear"
                                variant="ghost"
                                className="size-9!"
                                iconClassName="size-5! text-outline"
                                onClick={handleDelete}
                            />
                            <IconButton
                                icon="editSquare400Linear"
                                variant="ghost"
                                className="size-9!"
                                iconClassName="size-5! text-outline"
                                onClick={handleEdit}
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
                        <div className="flex flex-col gap-3 px-2" dir="rtl">
                            <div className="flex flex-col gap-1.5  bg-surface-container-highest rounded-card-md p-4">
                                <p className="text-body-md leading-8 text-on-surface-variant">
                                    {answer}
                                </p>
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
