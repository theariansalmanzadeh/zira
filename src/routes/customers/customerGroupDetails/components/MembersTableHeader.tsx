'use client'

import {
    TableHead,
    TableHeader as UiHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { MEMBER_TABLE_HEADERS } from '../constants'

const MembersTableHeader = () => {
    return (
        <UiHeader className="bg-surface-container-high">
            <TableRow className="border-b border-outline-variant hover:bg-transparent [&>*]:text-label-sm [&>*]:font-bold [&>*]:text-outline">
                {MEMBER_TABLE_HEADERS.map((label, index) => (
                    <TableHead key={label || `actions-${index}`}>
                        {label}
                    </TableHead>
                ))}
            </TableRow>
        </UiHeader>
    )
}

export default MembersTableHeader
