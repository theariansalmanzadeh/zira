'use client'

import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { useTable } from '@/src/shared/context/TableProvider'
import {
    getPreparationExitHref,
    type PreparationExitRecord,
} from '../constants/exits'

const ExitTableCells = ({
    data,
    values,
}: {
    data: PreparationExitRecord
    values: Record<string, string>
}) => {
    const { visibleTableColoumn } = useTable()
    const gridTemplateColumns = visibleTableColoumn
        .map((_, index) =>
            index === visibleTableColoumn.length - 1 ? 'auto' : 'minmax(0, 1fr)'
        )
        .join(' ')

    return (
        <div
            className="grid items-center gap-3 rounded-card-md bg-surface-container-lowest px-4 py-3 text-label-lg font-normal text-on-surface"
            style={{ gridTemplateColumns }}
            dir="rtl"
        >
            {visibleTableColoumn.map((column) =>
                column.id === 'actions' ? (
                    <Link
                        key={column.id}
                        href={getPreparationExitHref(data)}
                        aria-label="جزئیات خروج"
                        className="flex size-10 items-center justify-center justify-self-end rounded-card-md bg-surface-container-high"
                    >
                        <Icon
                            label="chevronLeft400Linear"
                            className="size-6 text-on-surface"
                        />
                    </Link>
                ) : (
                    <span key={column.id}>{values[column.id]}</span>
                )
            )}
        </div>
    )
}

export default ExitTableCells
