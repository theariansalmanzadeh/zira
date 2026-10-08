'use client'

import { Table, TableBody } from '@/src/shared/components/ui/Table'
import { ADD_CUSTOMER_GROUP_DUMMY } from '../constants'
import GroupTableHeader from './GroupTableHeader'
import GroupTableRow from './GroupTableRow'

const GroupTable = () => {
    return (
        <div className="overflow-hidden rounded-card-lg bg-surface-container-high p-2">
            <Table className="min-w-[720px] border-collapse border-spacing-y-4">
                <GroupTableHeader />
                <TableBody>
                    {ADD_CUSTOMER_GROUP_DUMMY.map((group) => (
                        <GroupTableRow key={group.id} group={group} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default GroupTable
