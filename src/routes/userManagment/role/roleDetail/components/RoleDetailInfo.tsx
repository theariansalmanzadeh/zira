'use client'

import { useMemo } from 'react'
import type { Role } from '@/src/api/types/admin/role'
import { useListDepartments } from '@/src/routes/userManagment/hooks/departments'

type RoleDetailFieldProps = {
    label: string
    value: string
}

const RoleDetailField = ({ label, value }: RoleDetailFieldProps) => (
    <div className="flex min-w-0 flex-col gap-1 text-right">
        <span className="text-label-md text-on-surface">{label}</span>
        <span className="text-label-lg text-outline">{value}</span>
    </div>
)

const RoleDetailInfo = ({ role }: { role: Role }) => {
    const { data: departments } = useListDepartments()

    const departmentName = useMemo(() => {
        if (!role.department) return '—'
        return (
            departments?.results.find((item) => item.id === role.department)
                ?.name ?? role.department
        )
    }, [departments?.results, role.department])

    return (
        <div className="rounded-card-md bg-surface-container-lowest p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <RoleDetailField label="سطح نقش" value={String(role.level)} />
                <RoleDetailField label="بخش مربوطه" value={departmentName} />
                <RoleDetailField
                    label="توضیحات"
                    value={role.description || '—'}
                />
            </div>

            <hr className="my-6 border-0 border-t border-dashed border-outline-variant" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <RoleDetailField label="کد نقش" value={role.code || '—'} />
                <RoleDetailField label="نام نقش" value={role.name || '—'} />
            </div>
        </div>
    )
}

export default RoleDetailInfo
