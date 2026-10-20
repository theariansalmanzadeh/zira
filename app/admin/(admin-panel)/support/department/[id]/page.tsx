import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getDepartment } from '@/src/api/admin/departments'
import {
    getSupportCalendar,
    listDepartmentAssignees,
    listSupportDepartments,
    listTickets,
} from '@/src/api/admin/support'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const DepartmentDetails = dynamic(
    () =>
        import(
            '@/src/routes/support/department/departmentDetails/DepartmentDetails'
        ),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

type DepartmentDetailsPageProps = {
    params: Promise<{ id: string }>
}

const DepartmentDetailsPage = async ({ params }: DepartmentDetailsPageProps) => {
    const { id } = await params
    const [
        departmentsResult,
        assigneesResult,
        calendarResult,
        departmentResult,
        ticketsResult,
    ] = await Promise.all([
        listSupportDepartments(),
        listDepartmentAssignees(id),
        getSupportCalendar(),
        getDepartment(id),
        listTickets({ department_id: id, page: 1, page_size: 20 }),
    ])

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <DepartmentDetails
                id={id}
                departments={
                    departmentsResult.success
                        ? departmentsResult.data.results
                        : []
                }
                assignees={
                    assigneesResult.success
                        ? assigneesResult.data.results
                        : []
                }
                calendar={calendarResult.success ? calendarResult.data : null}
                departmentRecord={
                    departmentResult.success ? departmentResult.data : null
                }
                ticketsPage={ticketsResult.success ? ticketsResult.data : null}
                isTicketsError={!ticketsResult.success}
            />
        </Suspense>
    )
}

export default DepartmentDetailsPage
