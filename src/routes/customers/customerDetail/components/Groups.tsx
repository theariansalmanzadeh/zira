'use client'

import { useParams } from 'next/navigation'
import { useListCustomerGroupMemberships } from '@/src/routes/customers/hooks/customers'
import { displayValue } from '../display'

const Groups = () => {
    const params = useParams<{ id: string }>()
    const customerId = params.id ?? ''
    const { data } = useListCustomerGroupMemberships(customerId)
    const groups = data?.results ?? []

    return (
        <div
            className="grid grid-cols-1 gap-3 rounded-card-md bg-surface-container-lowest p-4 sm:grid-cols-2 lg:grid-cols-3"
            dir="rtl"
        >
            {groups.length === 0 ? (
                <p className="text-label-lg text-outline">-</p>
            ) : (
                groups.map((group) => (
                    <div
                        key={group.membership_id}
                        className="flex flex-col gap-2 rounded-card-md bg-surface-container-high p-3"
                    >
                        <h3 className="text-title-lg font-medium text-on-surface">
                            {displayValue(group.group_name)}
                        </h3>
                        <span className="text-label-md text-outline">
                            {displayValue(group.group_code)}
                        </span>
                    </div>
                ))
            )}
        </div>
    )
}

export default Groups
