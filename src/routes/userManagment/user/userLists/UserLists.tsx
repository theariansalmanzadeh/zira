'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { formatFaDateTime } from '@/src/shared/libs/formatter'
import type { StaffUser } from '@/src/api/types/admin/user'
import { useListStaffUsers } from '../../hooks/user'
import TableHeader from '../../components/TableHeader'
import TableRow from './components/TableRow'
import {
    USER_LIST_TABLE_COLUMNS,
    USER_LIST_TOGGLE_BUTTONS,
    type UserListRowData,
} from './constants'
import type { UserStatus } from '../../utils'

const CAT_TO_STATUS: Record<string, UserStatus> = {
    active: 'active',
    inactive: 'inactive',
    locked: 'locked',
}

const mapApiStatus = (status: string, isActive: boolean): UserStatus => {
    const normalized = status.toLowerCase()
    if (normalized === 'locked' || normalized === 'lock') return 'locked'
    if (normalized === 'inactive' || normalized === 'disabled' || !isActive) {
        return 'inactive'
    }
    return 'active'
}

const mapUserToRow = (user: StaffUser): UserListRowData => ({
    id: user.id,
    personnelCode: user.personnel_code || '—',
    firstName: user.first_name || '—',
    lastName: user.last_name || '—',
    mobile: user.phone_number,
    role: user.job_title || user.user_type || '—',
    status: mapApiStatus(user.status, user.is_active),
    lastLogin: user.last_login_at
        ? formatFaDateTime(user.last_login_at)
        : '—',
})

const UserLists = () => {
    const searchParams = useSearchParams()
    const category = searchParams.get('cat')
    const { data, isPending, isError } = useListStaffUsers()

    const users = useMemo(() => {
        const rows = (data?.results ?? []).map(mapUserToRow)
        const status = category ? CAT_TO_STATUS[category] : undefined
        if (!status) return rows
        return rows.filter((user) => user.status === status)
    }, [data, category])

    return (
        <TableListLayout
            TableColoumn={USER_LIST_TABLE_COLUMNS}
            hasHeaderActions
            toggleButtonValue={[...USER_LIST_TOGGLE_BUTTONS]}
            value={category ?? 'all'}
        >
            <div className='rounded-card-lg bg-surface-container-high p-2'>
                {isPending ? (
                    <TableLoadingSkeleton isPending rows={6} />
                ) : isError ? (
                    <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                        دریافت لیست کاربران با خطا مواجه شد.
                    </div>
                ) : users.length === 0 ? (
                    <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                        کاربری یافت نشد.
                    </div>
                ) : (
                    <Table className='border-collapse border-spacing-y-4'>
                        <TableHeader />
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} data={user} />
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
            <TablePagination
                className='mt-2'
                page={data?.page}
                totalAmount={data?.total ?? users.length}
            />
        </TableListLayout>
    )
}

export default UserLists
