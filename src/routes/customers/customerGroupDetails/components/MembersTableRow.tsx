'use client'

import { useRouter } from 'next/navigation'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    TableCell,
    TableRow as UiTableRow,
} from '@/src/shared/components/ui/Table'
import type { CustomerGroupMember } from '@/src/shared/components/modals/components/CustomerGroupDetails.types'

type MembersTableRowProps = {
    data: CustomerGroupMember
}

const MembersTableRow = ({ data }: MembersTableRowProps) => {
    const { push } = useRouter()
    const isActive = data.status === 'فعال'

    return (
        <UiTableRow className="border-b border-outline-variant/60 hover:bg-surface-container-high/40 [&>*]:text-label-md [&>*]:font-normal [&>*]:text-on-surface-variant">
            <TableCell>
                <div className="flex flex-row items-center gap-3">
                    <div
                        className="flex size-8 shrink-0 items-center justify-center rounded-full text-label-md font-bold text-white"
                        style={{ backgroundColor: data.avatarColor }}
                    >
                        {data.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-on-surface">
                        {data.name}
                    </span>
                </div>
            </TableCell>
            <TableCell>
                <span dir="ltr">{data.code}</span>
            </TableCell>
            <TableCell>
                <span className="rounded-lg bg-surface-container-high px-2 py-0.5 text-label-sm font-bold text-on-surface-variant">
                    {data.level}
                </span>
            </TableCell>
            <TableCell>
                <Pill
                    text={data.status}
                    variant={isActive ? 'success' : 'tonal'}
                    className="border-0"
                />
            </TableCell>
            <TableCell className="w-[1%] whitespace-nowrap">
                <IconButton
                    icon="chevronLeft400Linear"
                    variant="ghost"
                    className="size-8!"
                    iconClassName="size-4! text-outline"
                    onClick={() => push(`/admin/customers/${data.code}`)}
                />
            </TableCell>
        </UiTableRow>
    )
}

export default MembersTableRow
