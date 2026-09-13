'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { ModalTypes } from '@/src/shared/components/modals/types'
import {
    DEFAULT_CUSTOMER_GROUP_DETAILS,
    type CustomerGroupMember,
} from '@/src/shared/components/modals/components/CustomerGroupDetails.types'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { useModalStore } from '@/src/shared/store/modal-store'
import { cn } from '@shared/libs/utils'

type GroupUsersProps = {
    members?: CustomerGroupMember[]
}

const GroupUsers = ({
    members = DEFAULT_CUSTOMER_GROUP_DETAILS.members,
}: GroupUsersProps) => {
    const openModal = useModalStore((state) => state.openModal)

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
                    onClick={() => openModal(ModalTypes.ADD_CUSTOMER)}
                >
                    <Icon label="addSm400Broken" className="size-5!" />
                    افزودن کاربر
                </Button>
            </div>
            <div className="overflow-hidden rounded-card-md border border-outline-variant">
                {members.map((member, index) => (
                    <div
                        key={member.code}
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GroupUsers
