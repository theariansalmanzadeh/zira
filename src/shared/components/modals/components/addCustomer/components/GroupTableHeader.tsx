'use client'

import { TableHead, TableHeader, TableRow } from '@/src/shared/components/ui/Table'
import { GROUP_TABLE_HEADERS } from '../constants'

const GroupTableHeader = () => {
    return (
        <TableHeader className="rounded-xl">
            <TableRow className="hover:bg-transparent [&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline">
                {GROUP_TABLE_HEADERS.map((label) => (
                    <TableHead key={label}>{label}</TableHead>
                ))}
            </TableRow>
        </TableHeader>
    )
}

export default GroupTableHeader
