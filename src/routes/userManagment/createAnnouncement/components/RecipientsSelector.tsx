'use client'

import { cn } from '@/src/shared/libs/utils'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import type { SelectAnnouncementUserItem } from '@/src/shared/components/modals/components/selectUsers/types'
import { DEFAULT_USERS } from '@/src/shared/components/modals/components/selectUsers/constants'

type RecipientsSelectorProps = {
    users?: SelectAnnouncementUserItem[]
    selectedUsers: SelectAnnouncementUserItem[]
    onUsersChange: (users: SelectAnnouncementUserItem[]) => void
}

const RecipientsSelector = ({
    users = DEFAULT_USERS,
    selectedUsers,
    onUsersChange,
}: RecipientsSelectorProps) => {
    const openModal = useModalStore((state) => state.openModal)

    const selectedIds = new Set(selectedUsers.map((user) => user.id))
    const isAllSelected =
        users.length > 0 && users.every((user) => selectedIds.has(user.id))
    const isPartialSelected = selectedUsers.length > 0 && !isAllSelected

    const selectAllUsers = () => {
        onUsersChange(users)
    }

    const openUsersModal = () => {
        openModal(ModalTypes.SELECT_USERS, {
            users,
            selectedIds: selectedUsers.map((user) => user.id),
            onConfirm: (nextUsers: SelectAnnouncementUserItem[]) => {
                onUsersChange(nextUsers)
            },
        })
    }

    return (
        <div className='flex flex-col gap-1.5' dir='rtl'>
            <span className='text-label-md text-on-surface-variant'>
                گیرندگان <span className='text-error'>*</span>
            </span>
            <div className='grid grid-cols-2 gap-2'>
                <button
                    type='button'
                    onClick={selectAllUsers}
                    className={cn(
                        'flex flex-col items-center justify-center gap-1 rounded-card-md border px-2 py-3 transition-colors',
                        isAllSelected
                            ? 'border-primary bg-primary-container/40 text-primary'
                            : 'border-outline-variant bg-surface-container-lowest text-on-surface'
                    )}
                >
                    <span
                        className={cn(
                            'text-label-md',
                            isAllSelected ? 'text-primary/80' : 'text-outline'
                        )}
                    >
                        {formatFaNumber(users.length)} نفر
                    </span>
                    <span className='text-label-lg font-semibold'>همه کاربران</span>
                </button>

                <button
                    type='button'
                    onClick={openUsersModal}
                    className={cn(
                        'flex flex-col items-center justify-center gap-1 rounded-card-md border px-2 py-3 transition-colors',
                        isPartialSelected
                            ? 'border-primary bg-primary-container/40 text-primary'
                            : 'border-outline-variant bg-surface-container-lowest text-on-surface'
                    )}
                >
                    <span
                        className={cn(
                            'text-label-md',
                            isPartialSelected
                                ? 'text-primary/80'
                                : 'text-outline'
                        )}
                    >
                        {selectedUsers.length > 0
                            ? `${formatFaNumber(selectedUsers.length)} نفر`
                            : 'انتخاب کاربر'}
                    </span>
                    <span className='text-label-lg font-semibold'>
                        کاربران منتخب
                    </span>
                </button>
            </div>
        </div>
    )
}

export default RecipientsSelector
