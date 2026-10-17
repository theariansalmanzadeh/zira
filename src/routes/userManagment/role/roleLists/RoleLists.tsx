'use client'

import { useMemo } from 'react'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import type { Role } from '@/src/api/types/admin/role'
import { useListRoles } from '../../hooks/role'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    ROLE_LIST_TABLE_COLUMNS,
    type RoleListRowData,
} from './constants'

const mapRoleToRow = (role: Role): RoleListRowData => ({
    id: role.id,
    code: role.code,
    name: role.name,
    department: role.department || '—',
    type: role.is_system ? 'system' : 'custom',
    status: role.is_active ? 'active' : 'inactive',
    createdAt: role.created_at,
})

const RoleLists = () => {
    const { data, isPending, isError } = useListRoles()

    const roles = useMemo(
        () => (data?.results ?? []).map(mapRoleToRow),
        [data]
    )

    return (
        <TableListLayout
            TableColoumn={ROLE_LIST_TABLE_COLUMNS}
            hasHeaderActions={false}
        >
            <div className='rounded-card-lg bg-surface-container-high p-2'>
                {isPending ? (
                    <TableLoadingSkeleton isPending rows={6} />
                ) : isError ? (
                    <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                        دریافت لیست نقش‌ها با خطا مواجه شد.
                    </div>
                ) : roles.length === 0 ? (
                    <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                        نقشی یافت نشد.
                    </div>
                ) : (
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow key={role.id} data={role} />
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </TableListLayout>
    )
}

export default RoleLists
