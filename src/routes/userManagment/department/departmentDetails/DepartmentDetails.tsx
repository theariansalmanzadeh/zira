'use client'

import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import { usePathname, useRouter } from 'next/navigation'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useGetDepartment } from '@/src/routes/userManagment/hooks/departments'
import DepartmentHeaderCard from './components/DepartmentHeaderCard'
import { TABLE_COLOUMN } from './constants'

const DepartmentDetails = () => {
    const pathname = usePathname()
    const { push } = useRouter()
    const id = pathname.split('/').pop() ?? ''
    const openModal = useModalStore((state) => state.openModal)
    const { data: department, isPending, isError } = useGetDepartment(id)

    if (isPending) {
        return <TableLoadingSkeleton isPending rows={4} />
    }

    if (isError || !department) {
        return (
            <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                دریافت اطلاعات دپارتمان با خطا مواجه شد.
            </div>
        )
    }

    return (
        <>
            <DepartmentHeaderCard
                title={department.name}
                identifier={department.code}
                status={department.is_active ? 'فعال' : 'غیرفعال'}
                statusVariant={department.is_active ? 'success' : 'tonal'}
                relatedSection={{ label: 'کد', value: department.code || '—' }}
                manager={{ label: 'مسئول دپارتمان', value: '—' }}
                experts={{ label: 'کارشناسان', value: '—' }}
                slaResponse={{ label: 'پاسخ SLA', value: '—' }}
                responseHours={{ label: 'ساعت پاسخگویی', value: '—' }}
                description={{
                    label: 'توضیحات',
                    value: department.description || '—',
                }}
                onSettings={() =>
                    push(`/admin/user-management/department/edit/${department.id}`)
                }
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
