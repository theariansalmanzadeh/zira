'use client'

import { useState } from 'react'
import type { BaseModalProps } from '../../types'
import { ModalTypes } from '../../types'
import { useModalStore } from '@shared/store/modal-store'
import { DEFAULT_GROUP_DETAILS, DEFAULT_GROUP_USERS } from './constants'
import Sidebar from './components/Sidebar'
import DetailsTab from './components/DetailsTab'
import UsersTab from './components/UsersTab'
import type { GroupSettingModalData, GroupSettingTab } from './types'

export type { GroupSettingModalData, GroupDetails, GroupUser } from './types'

export function GroupSetting({ closeModal, data }: BaseModalProps) {
    const modalData = data as GroupSettingModalData | null | undefined
    const openModal = useModalStore((state) => state.openModal)

    const [activeTab, setActiveTab] = useState<GroupSettingTab>(
        modalData?.defaultTab ?? 'details'
    )

    const details = modalData?.details ?? DEFAULT_GROUP_DETAILS
    const users = modalData?.users ?? DEFAULT_GROUP_USERS

    return (
        <div
            className="flex w-full min-w-[720px] flex-col gap-4 rounded-2xl bg-surface-container-lowest px-6 py-4.5"
            dir="rtl"
        >
            <div className="flex min-h-[420px] gap-4">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

                {activeTab === 'details' ? (
                    <DetailsTab details={details} onEdit={modalData?.onEdit} />
                ) : (
                    <UsersTab
                        users={users}
                        onAddUser={
                            modalData?.onAddUser ??
                            (() =>
                                openModal(ModalTypes.SELECT_USER_AND_GROUPS, {
                                    hasOnlyUsers: true,
                                })
                            )
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default GroupSetting
