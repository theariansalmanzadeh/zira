'use client'

import { useParams } from 'next/navigation'
import { DEFAULT_CUSTOMER_GROUP_DETAILS } from '@/src/shared/components/modals/components/CustomerGroupDetails.types'
import GroupUsers from './components/GroupUsers'
import Header from './components/Header'

const GroupDetails = () => {
    const params = useParams<{ id: string }>()

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-card-md bg-surface-container-lowest p-6">
                <Header
                    code={params.id || DEFAULT_CUSTOMER_GROUP_DETAILS.code}
                    customerCount={DEFAULT_CUSTOMER_GROUP_DETAILS.customerCount}
                    discountPercent={
                        DEFAULT_CUSTOMER_GROUP_DETAILS.discountPercent
                    }
                    marketerPercent={
                        DEFAULT_CUSTOMER_GROUP_DETAILS.marketerPercent
                    }
                />
            </div>
            <GroupUsers members={DEFAULT_CUSTOMER_GROUP_DETAILS.members} />
        </div>
    )
}

export default GroupDetails
