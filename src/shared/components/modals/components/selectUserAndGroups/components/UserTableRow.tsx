'use client'

import { Checkbox } from '@shared/components/ui/Checkbox'
import { Pill } from '@shared/components/ui/Pill'
import { TableCell, TableRow } from '@shared/components/ui/Table'
import { STATUS_CONFIG } from '../constants'
import type { SelectUserItem } from '../types'

type UserTableRowProps = {
    user: SelectUserItem
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

const UserTableRow = ({ user, checked, onCheckedChange }: UserTableRowProps) => {
    const status = STATUS_CONFIG[user.status]

    return (
        <>
            <TableRow className="[&>*]:text-on-surface-variant [&>*]:text-label-lg [&>*]:font-normal">
                <TableCell className='pl-0'>
                    <div className="flex justify-center w-full">
                        <Checkbox
                            className='overflow-hidden size-6!'
                            checked={checked}
                            onCheckedChange={(value) => onCheckedChange(value === true)}
                        />
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex flex-row items-center gap-3">
                        <div className="size-8 shrink-0 rounded-full bg-surface-container-highest" />
                        <span>{user.userName}</span>
                    </div>
                </TableCell>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.roles}</TableCell>
                <TableCell>{user.permissions}</TableCell>
                <TableCell>
                    <Pill className="border-0" variant={status.variant} text={status.text} />
                </TableCell>
            </TableRow>
            <tr>
                <td colSpan={6} className="py-1" />
            </tr>
        </>
    )
}

export default UserTableRow
