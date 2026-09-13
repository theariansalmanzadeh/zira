import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const DepartmentList = dynamic(
    () => import('@/src/routes/support/department/departmentList/DepartmentList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function DepartmentListPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <DepartmentList />
        </Suspense>
    )
}
