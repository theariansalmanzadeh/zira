import { Table, TableBody } from '@/src/shared/components/ui/Table'
import React from 'react'
import TableHeader from './components/TableHeader'
import DepartmentRow from './components/TableRow'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { TABLE_COLOUMN } from './constants'

const DepartmentList = () => {
    return (
        <div className='flex flex-col gap-3'>
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
            >
                <div className='bg-surface-container-high rounded-card-lg p-2'>
                    <Table className='border-spacing-y-4 border-collapse' >
                        <TableHeader />
                        <TableBody>
                            <DepartmentRow data={{ name: 'دپارتمان 1', id: '1', deputy: 'محمد حسین محمدی', lastTimeAnswered: 1718198400, status: 'active' }} />
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </div>
    )
}

export default DepartmentList