'use client'

import IconButton from '@shared/components/ui/IconButton'
import { Pill } from '@shared/components/ui/Pill'
import { TableCell, TableRow as UiTableRow } from '@shared/components/ui/Table'
import type { DepartmentExpert, DepartmentExpertStatus } from '../types'

const statusConfig: Record<
    DepartmentExpertStatus,
    { text: string; variant: 'success' | 'tonal' }
> = {
    active: { text: 'فعال', variant: 'success' },
    inactive: { text: 'غیرفعال', variant: 'tonal' },
}

type ExpertRowProps = {
    expert: DepartmentExpert
}

const ExpertRow = ({ expert }: ExpertRowProps) => {
    const status = statusConfig[expert.status]

    return (
        <>
            <UiTableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                <TableCell>
                    <div className="flex flex-row items-center gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-surface-container-highest" />
                        <span>{expert.userName}</span>
                    </div>
                </TableCell>
                <TableCell>{expert.userId}</TableCell>
                <TableCell>
                    <Pill className="border-0" variant={status.variant} text={status.text} />
                </TableCell>
                <TableCell className="w-[1%] whitespace-nowrap">
                    <IconButton icon="moreHorizontal300Broken" iconClassName="size-6! text-on-surface-variant" />
                </TableCell>
                <TableCell className="w-[1%] whitespace-nowrap">
                    <IconButton icon="chevronDown300Linear" className='size-6! rotate-90 text-on-surface-variant' />
                </TableCell>
            </UiTableRow>
            <div className='py-1' />
        </>
    )
}

export default ExpertRow
