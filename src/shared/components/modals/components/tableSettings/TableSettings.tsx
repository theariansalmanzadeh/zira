'use client'

import { useState } from 'react'
import { GripVertical } from 'lucide-react'
import { Icon } from '@shared/components/Icons/Icon'
import { Button } from '@shared/components/ui/button'
import { Checkbox } from '@shared/components/ui/Checkbox'
import { cn } from '@shared/libs/utils'
import { useTableActionsStore } from '@shared/store/table-actions-store'
import type { BaseModalProps } from '../../types'
import type { TableHeaderItem, TableSettingsModalData } from './types'

const TableSettings = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as TableSettingsModalData | null | undefined
    const storeFilter = useTableActionsStore((state) => state.filter)
    const setFilter = useTableActionsStore((state) => state.setFilter)

    const [columns, setColumns] = useState<TableHeaderItem[]>(() => {
        const headers = modalData?.TableColoumn ?? []
        if (storeFilter.length === 0) return headers

        return headers.map((header) => {
            const stored = storeFilter.find((item) => item.id === header.id)
            return stored ? { ...header, isChecked: stored.isChecked } : header
        })
    })

    const toggleColumn = (id: string) => {
        setColumns((prev) =>
            prev.map((column) =>
                column.id === id
                    ? { ...column, isChecked: !column.isChecked }
                    : column
            )
        )
    }

    const handleApply = () => {
        setFilter(columns)
        modalData?.onApply?.(columns)
        closeModal()
    }

    return (
        <div className="flex w-full flex-col gap-4 p-3" dir="rtl">
            <div className="flex flex-row items-center justify-between">
                <h3 className="text-title-md font-medium text-on-surface">
                    تنظیمات جدول
                </h3>
                <Icon label="info" className="size-5! text-outline" />
            </div>

            <h4 className="text-title-md font-medium text-on-surface text-right">
                نمایش
            </h4>

            <div className="flex flex-col gap-2 rounded-container-lg bg-surface-container-high p-3">
                {columns.map((column) => (
                    <div
                        key={column.id}
                        className={cn(
                            'flex flex-row items-center gap-3 px-3 py-2.5',
                            column.isChecked &&
                                'rounded-container-md bg-surface-container-lowest'
                        )}
                    >
                        <button
                            type="button"
                            className="shrink-0 cursor-grab touch-none text-outline-variant"
                            aria-label="جابجایی"
                        >
                            <GripVertical className="size-5" />
                        </button>
                        <Checkbox
                            id={column.id}
                            checked={column.isChecked}
                            onCheckedChange={() => toggleColumn(column.id)}
                            variant="primary"
                            className="size-5 rounded-md"
                        />
                        <label
                            htmlFor={column.id}
                            className="flex-1 cursor-pointer select-none text-label-md text-on-surface"
                        >
                            {column.header_label}
                        </label>
                    </div>
                ))}
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
                <Button
                    type="button"
                    variant="ghost"
                    className="px-0 text-on-surface-variant hover:bg-transparent"
                    onClick={closeModal}
                >
                    بازگشت
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    className="rounded-2xl px-6"
                    onClick={handleApply}
                >
                    اعمال تغییرات
                </Button>
            </div>
        </div>
    )
}

export default TableSettings
