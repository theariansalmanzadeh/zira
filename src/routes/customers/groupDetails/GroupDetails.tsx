'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useGetCustomerGroup, useListCustomerGroupMembers } from '../hooks/customers'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { Spinner } from '@/src/shared/components/ui/spinner'
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
                    <div className="flex justify-center py-10">
                        <Spinner className="size-6" />
                    </div>
                ) : isGroupError || !headerProps ? (
                    <TableEmptyState title="دریافت اطلاعات گروه با خطا مواجه شد." />
                ) : (
                    <Header {...headerProps} />
                )}
            </div>
            {isMembersPending ? (
                <div className="flex justify-center rounded-card-md bg-surface-container-lowest py-10">
                    <Spinner className="size-6" />
                </div>
            ) : isMembersError ? (
                <div className="rounded-card-md bg-surface-container-lowest">
                    <TableEmptyState title="دریافت اعضای گروه با خطا مواجه شد." />
                </div>
            ) : (
                <GroupUsers groupId={groupId} members={members} />
            )}
        </div>
    )
}

export default GroupDetails
