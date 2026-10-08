'use client'

import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import { usePathname, useRouter } from 'next/navigation'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import DepartmentHeaderCard from './components/DepartmentHeaderCard'
import { TABLE_COLOUMN } from './constants'

const DepartmentDetails = () => {
    const pathname = usePathname()
    const { push } = useRouter()
    const id = pathname.split('/').pop()
    const openModal = useModalStore((state) => state.openModal)

    return (
        <>
            <DepartmentHeaderCard
                identifier={id}
                onSettings={() => {
                    if (!id) return
                    push(`/admin/user-management/department/edit/${id}`)
                }}
                onAddUser={() => openModal(ModalTypes.SELECT_USER_AND_GROUPS)}
            />
            <TableListLayout TableColoumn={TABLE_COLOUMN}>
                <div className='bg-surface-container-high rounded-card-lg p-2'>
                    <Table>
                        <TableHeader />
                        <TableBody>
                            <TableRow
                                data={{
                                    id: '1',
                                    idVariant: 'success',
                                    contact: '09123456789',
                                    subject: 'تیکت 1',
                                    department: 'دپارتمان 1',
                                    status: 'open',
                                    lastActivity: '2021-01-01',
                                }}
                            />
                        </TableBody>
                    </Table>
                </div>
            </TableListLayout>
        </>
    )
}

export default DepartmentDetails
