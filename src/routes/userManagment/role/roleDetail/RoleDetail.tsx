'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import DetailLayout from '@/src/shared/layouts/detailLayout/DetailLayout'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import TableHeader from '../../components/TableHeader'
import TableRow from '../../components/TableRow'
import RoleDetailInfo from './components/RoleDetailInfo'
import { TABLE_COLOUMN } from '../../constants'
import {
    useGetRole,
    useListRoleAssignments,
} from '@/src/routes/userManagment/hooks/role'
import { useListStaffUsers } from '@/src/routes/userManagment/hooks/user'
import type { UserStatus } from '@/src/routes/userManagment/utils'

const RoleDetail = () => {
    const pathname = usePathname()
    const id = pathname.split('/').pop() ?? ''
    const { data: role, isPending, isError } = useGetRole(id)
    const { data: assignments, isPending: isAssignmentsPending } =
        useListRoleAssignments({ role_id: id }, Boolean(id))
    const { data: staffUsers } = useListStaffUsers()

    const users = useMemo(() => {
        const staffById = new Map(
            (staffUsers?.results ?? []).map((user) => [user.id, user])
        )

        return (assignments?.results ?? []).map((assignment) => {
            const user = staffById.get(assignment.user_id)
            const name = user
                ? `${user.first_name} ${user.last_name}`.trim() || user.username
                : assignment.user_id

            return {
                id: assignment.id,
                userId: assignment.user_id,
                data: {
                    userName: name,
                    userCode: user?.personnel_code || user?.username || '—',
                    roles: role?.name || '—',
                    permissions: '—',
                    status: (assignment.is_active
                        ? 'active'
                        : 'inactive') as UserStatus,
                },
            }
        })
    }, [assignments?.results, role?.name, staffUsers?.results])

    if (isPending) {
        return <TableLoadingSkeleton isPending rows={4} />
    }

    if (isError || !role) {
        return (
            <div className="rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline">
                دریافت اطلاعات نقش با خطا مواجه شد.
            </div>
        )
    }

    return (
        <DetailLayout topContent={<RoleDetailInfo role={role} />} header="لیست کاربران">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                hasHeaderActions={false}
                hasSearch={false}
                hasFilter={false}
                hasExpand={false}
                hasSort={false}
                hasTableSettings={false}
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    {isAssignmentsPending ? (
                        <TableLoadingSkeleton isPending rows={4} />
                    ) : (
                        <Table className="border-collapse border-spacing-y-4">
                            <TableHeader />
                            <TableBody>
                                {users.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        data={item.data}
                                        detailHref={`/admin/user-management/user-details/${encodeURIComponent(item.userId)}`}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </TableListLayout>
        </DetailLayout>
    )
}

export default RoleDetail
