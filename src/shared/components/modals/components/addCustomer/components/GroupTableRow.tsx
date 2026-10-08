'use client'

import { Pill } from '@/src/shared/components/ui/Pill'
import { TableCell, TableRow } from '@/src/shared/components/ui/Table'
import { GROUP_STATUS_CONFIG, type AddCustomerGroupRow } from '../constants'

type GroupTableRowProps = {
    group: AddCustomerGroupRow
}

const GroupTableRow = ({ group }: GroupTableRowProps) => {
    const status = GROUP_STATUS_CONFIG[group.status]

    return (
        <TableRow className="[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant">
            <TableCell className="font-semibold text-on-surface">
                {group.name}
            </TableCell>
            <TableCell className="text-outline">{group.code}</TableCell>
            <TableCell>
                <Pill
                    className="border-0"
                    variant={status.variant}
                    text={status.text}
                    hasDot
                />
            </TableCell>
        </TableRow>
    )
}

export default GroupTableRow
