'use client'

import { useMemo } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { useListDepartments } from '@/src/routes/userManagment/hooks/departments'
import TableHeader from '@/src/routes/support/tickets/components/TableHeader'
import DepartmentRow from './components/TableRow'
import { TABLE_COLOUMN } from './constants'

const DepartmentList = () => {
    const { data, isPending, isError } = useListDepartments()

    const departments = useMemo(
        () =>
            (data?.results ?? []).map((department) => ({
                id: department.id,
                name: department.name,
                code: department.code,
            })),
        [data]
    )

    return (
        <div className='flex flex-col gap-3'>
            <TableListLayout TableColoumn={TABLE_COLOUMN} hasHeaderActions={false}>
                <div className='rounded-card-lg bg-surface-container-high p-2'>
                    {isPending ? (
                        <TableLoadingSkeleton isPending rows={6} />
                    ) : isError ? (
                        <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                            دریافت لیست دپارتمان‌ها با خطا مواجه شد.
                        </div>
                    ) : departments.length === 0 ? (
                        <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                            دپارتمانی یافت نشد.
                        </div>
                    ) : (
                        <Table className='border-collapse border-spacing-y-4'>
                            <TableHeader />
                            <TableBody>
                                {departments.map((department) => (
                                    <DepartmentRow
                                        key={department.id}
                                        data={department}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </TableListLayout>
        </div>
    )
}

export default DepartmentList
