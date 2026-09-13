import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const CreateDepartment = dynamic(
    () => import('@/src/routes/support/department/createDepartment/CreateDepartment'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const NewDepartmentPage = () => {
    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <CreateDepartment />
        </Suspense>
    )
}

export default NewDepartmentPage
