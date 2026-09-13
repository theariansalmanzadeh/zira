import type { ComponentType } from 'react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const SupportDashboard = dynamic(
    () => import('@/src/routes/support/supportDashboard/SupportDashboard'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const TicketsList = dynamic(
    () => import('@/src/routes/support/tickets/ticketList/TicketsList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const DepartmentList = dynamic(
    () => import('@/src/routes/support/department/departmentList/DepartmentList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const SUPPORT_PAGE_COMPONENTS: Record<string, ComponentType> = {
    dashboard: SupportDashboard,
    ticket: TicketsList,
    department: DepartmentList,
}

async function SupportPage({
    searchParams,
}: {
    searchParams: Promise<{ sub?: string }>
}) {
    const { sub } = await searchParams
    const Component = SUPPORT_PAGE_COMPONENTS[sub ?? 'dashboard'] ?? SupportDashboard

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Component />
        </Suspense>
    )
}

export default SupportPage
