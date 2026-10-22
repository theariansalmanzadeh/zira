'use client'

import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import DetailLayout from '@/src/shared/layouts/detailLayout/DetailLayout'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import {
    ToggleGroup,
    ToggleGroupItem,
} from '@/src/shared/components/ui/ToggleGroup'
import TableHeader from '../../components/TableHeader'
import TableRow from '../../components/TableRow'
import RoleDetailInfo from './components/RoleDetailInfo'
import RolePermissionMatrix from './components/RolePermissionMatrix'
import { TABLE_COLOUMN } from '../../constants'
import {
    useGetRole,
    useListRoleAssignments,
} from '@/src/routes/userManagment/hooks/role'
import { useListStaffUsers } from '@/src/routes/userManagment/hooks/user'
import type { UserStatus } from '@/src/routes/userManagment/utils'

const ROLE_DETAIL_TABS = [
    { label: 'لیست کاربران', value: 'users' },
    { label: 'ماتریس دسترسی‌ها', value: 'matrix' },
] as const

type RoleDetailTab = (typeof ROLE_DETAIL_TABS)[number]['value']

const RoleDetail = () => {
    const pathname = usePathname()
    const id = pathname.split('/').pop() ?? ''
    const [tab, setTab] = useState<RoleDetailTab>('users')
    const { data: role, isPending, isError } = useGetRole(id)
    const { data: assignments, isPending: isAssignmentsPending } =
        useListRoleAssignments({ role_id: id }, Boolean(id) && tab === 'users')
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
            <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                دریافت اطلاعات نقش با خطا مواجه شد.
            </div>
        )
    }

    return (
        <DetailLayout
            topContent={<RoleDetailInfo role={role} />}
            header={
                tab === 'users' ? 'لیست کاربران' : 'ماتریس دسترسی‌ها'
            }
        >
            <div className='mb-4'>
                <ToggleGroup
                    type='single'
                    value={tab}
                    variant='filled'
                    className='w-fit rounded-container-md! bg-surface-container-high p-1.5'
                    onValueChange={(value) => {
                        if (value === 'users' || value === 'matrix') {
                            setTab(value)
                        }
                    }}
                >
                    {ROLE_DETAIL_TABS.map((item) => (
                        <ToggleGroupItem key={item.value} value={item.value}>
                            {item.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            {tab === 'users' ? (
                <TableListLayout
                    TableColoumn={TABLE_COLOUMN}
                    hasHeaderActions={false}
                    hasSearch={false}
                    hasFilter={false}
                    hasExpand={false}
                    hasSort={false}
                    hasTableSettings={false}
                >
                    <div className='rounded-card-lg bg-surface-container-high p-2'>
                        {isAssignmentsPending ? (
                            <TableLoadingSkeleton isPending rows={4} />
                        ) : (
                            <Table className='border-collapse border-spacing-y-4'>
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
            ) : (
                <RolePermissionMatrix roleId={id} />
            )}
        </DetailLayout>
    )
}

export default RoleDetail
