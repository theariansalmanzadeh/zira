import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const DepartmentDetails = dynamic(
    () => import('@/src/routes/support/department/departmentDetails/DepartmentDetails'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

export default function DepartmentDetailsPage() {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <DepartmentDetails />
        </Suspense>
    )
}
