'use client'

import { Checkbox } from '@shared/components/ui/Checkbox'
import { Pill } from '@shared/components/ui/Pill'
import { TableCell, TableRow } from '@shared/components/ui/Table'
import { STATUS_CONFIG } from '../constants'
import type { SelectGroupItem } from '../types'

type GroupTableRowProps = {
    group: SelectGroupItem
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

const GroupTableRow = ({ group, checked, onCheckedChange }: GroupTableRowProps) => {
    const status = STATUS_CONFIG[group.status]

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
                <TableCell>{group.groupTitle}</TableCell>
                <TableCell>{group.groupId}</TableCell>
                <TableCell>{group.groupRole}</TableCell>
                <TableCell>{group.usersCount}</TableCell>
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

export default GroupTableRow
