'use client'

import TableRow, { type TableRowProps } from './TableRow'

const AdminTableRow = ({ data }: Omit<TableRowProps, 'showAdminFields'>) => {
    return <TableRow data={data} showAdminFields />
}

export default AdminTableRow
