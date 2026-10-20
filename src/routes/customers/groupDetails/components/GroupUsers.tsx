'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import type { AddCustomerRow } from '@/src/shared/components/modals/components/addCustomer/constants'
import { ModalTypes } from '@/src/shared/components/modals/types'
import {
    DEFAULT_CUSTOMER_GROUP_DETAILS,
    type CustomerGroupMember,
} from '@/src/shared/components/modals/components/CustomerGroupDetails.types'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { useModalStore } from '@/src/shared/store/modal-store'
import { cn } from '@shared/libs/utils'
import type { ListCustomerGroupMembersParams } from '@/src/api/types/admin/customers'
import {
    customerKeys,
    useAddCustomerGroupMembers,
    useRemoveCustomerGroupMember,
} from '../../hooks/customers'

type GroupUsersProps = {
    groupId: string
    members?: CustomerGroupMember[]
    params?: ListCustomerGroupMembersParams
}

const GroupUsers = ({
    groupId,
    members = DEFAULT_CUSTOMER_GROUP_DETAILS.members,
    params,
}: GroupUsersProps) => {
    const queryClient = useQueryClient()
    const openModal = useModalStore((state) => state.openModal)
    const { mutate: addMembers, isPending } = useAddCustomerGroupMembers()
    const { mutate: removeMember, isPending: isRemovePending } =
        useRemoveCustomerGroupMember()
    const [removingId, setRemovingId] = useState<string | null>(null)

    const handleAddCustomers = (customers: AddCustomerRow[]) => {
        if (!groupId || customers.length === 0) return

        addMembers({
            groupId,
            body: {
                customer_ids: customers.map((customer) => customer.id),
            },
        })
    }

    const handleRemoveMember = (member: CustomerGroupMember) => {
        const membershipId = member.membershipId || member.code
        if (!groupId || !membershipId) return

        setRemovingId(membershipId)

        removeMember(
            { groupId, membershipId, params },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: customerKeys.groups.members(groupId, params),
                    })
                },
                onSettled: () => {
                    setRemovingId(null)
                },
            }
        )
    }

    return (
        <div className="rounded-card-md bg-surface-container-lowest p-6">
            <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-title-sm font-semibold text-on-surface">
                    اعضای گروه{' '}
                    <span className="text-label-md font-normal text-outline">
                        ({formatFaNumber(members?.length || 0)} نفر در این
                        نمونه)
                    </span>
                </h3>
                <Button
                    type="button"
                    variant="primary-outline"
                    size="sm"
                    className="shrink-0 gap-1.5"
                    disabled={!groupId || isPending}
                    onClick={() =>
                        openModal(ModalTypes.ADD_CUSTOMER, {
                            hasGroup: false,
                            onChange: handleAddCustomers,
                        })
                    }
                >
                    <Icon label="addSm400Broken" className="size-5!" />
                    افزودن کاربر
                </Button>
            </div>
            <div className="overflow-hidden rounded-card-md border border-outline-variant">
                {members.length === 0 ? (
                    <TableEmptyState title="عضوی در این گروه ثبت نشده است." />
                ) : null}
                {members.map((member, index) => {
                    const memberKey = member.membershipId || member.code
                    const isRemoving =
                        isRemovePending && removingId === memberKey

                    return (
                        <div
                            key={memberKey}
                            className={cn(
                                'flex items-center gap-3 px-3.5 py-2.5',
                                index < members.length - 1 &&
                                    'border-b border-outline-variant/60'
                            )}
                        >
                            <div
                                className="flex size-8 shrink-0 items-center justify-center rounded-full text-label-md font-bold text-white"
                                style={{ backgroundColor: member.avatarColor }}
                            >
                                {member.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-label-md font-semibold text-on-surface">
                                    {member.name}
                                </div>
                                <div
                                    className="mt-0.5 text-left text-label-sm text-outline"
                                    dir="ltr"
                                >
                                    {member.code}
                                </div>
                            </div>
                            <span className="rounded-lg bg-surface-container-high px-2 py-0.5 text-[10.5px] font-bold text-on-surface-variant">
                                {member.level}
                            </span>
                            <Pill
                                text={member.status}
                                variant={
                                    member.status === 'فعال' ? 'success' : 'tonal'
                                }
                                className="border-0 text-[10.5px]"
                            />
                            <IconButton
                                icon="closeSm400Linear"
                                variant="ghost"
                                className="size-8! shrink-0 text-outline hover:text-error"
                                iconClassName="size-4.5!"
                                onClick={() => handleRemoveMember(member)}
                                disabled={isRemoving}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GroupUsers
