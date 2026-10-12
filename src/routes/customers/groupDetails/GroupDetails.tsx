'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useGetCustomerGroup, useListCustomerGroupMembers } from '../hooks/customers'
import GroupUsers from './components/GroupUsers'
import Header from './components/Header'
import { mapGroupToHeader, mapMemberToRow } from './utils/groupMaps'

const GroupDetails = () => {
    const params = useParams<{ id: string }>()
    const groupId = params.id ?? ''

    const {
        data: group,
        isPending: isGroupPending,
        isError: isGroupError,
    } = useGetCustomerGroup(groupId)

    const {
        data: membersData,
        isPending: isMembersPending,
        isError: isMembersError,
    } = useListCustomerGroupMembers(groupId)

    const headerProps = useMemo(
        () => (group ? mapGroupToHeader(group) : null),
        [group]
    )

    const members = useMemo(
        () => (membersData?.results ?? []).map(mapMemberToRow),
        [membersData]
    )

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-card-md bg-surface-container-lowest p-6">
                {isGroupPending ? (
                    <div className="py-6 text-center text-label-md text-outline">
                        در حال دریافت اطلاعات گروه...
                    </div>
                ) : isGroupError || !headerProps ? (
                    <div className="py-6 text-center text-label-md text-outline">
                        دریافت اطلاعات گروه با خطا مواجه شد.
                    </div>
                ) : (
                    <Header {...headerProps} />
                )}
            </div>
            {isMembersPending ? (
                <div className="rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline">
                    در حال دریافت اعضای گروه...
                </div>
            ) : isMembersError ? (
                <div className="rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline">
                    دریافت اعضای گروه با خطا مواجه شد.
                </div>
            ) : (
                <GroupUsers groupId={groupId} members={members} />
            )}
        </div>
    )
}

export default GroupDetails
