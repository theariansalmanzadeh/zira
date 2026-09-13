'use client'

import { useState } from 'react'
import type { BaseModalProps } from '../../types'
import { ModalTypes } from '../../types'
import { useModalStore } from '@shared/store/modal-store'
import { DEFAULT_DEPARTMENT_DETAILS, DEFAULT_DEPARTMENT_EXPERTS } from './constants'
import Sidebar from './components/Sidebar'
import DetailsTab from './components/DetailsTab'
import ExpertsTab from './components/ExpertsTab'
import type { DepartmentSettingModalData, DepartmentSettingTab } from './types'

export type {
    DepartmentSettingModalData,
    DepartmentDetails,
    DepartmentExpert,
} from './types'

export function DepartmentSetting({ data }: BaseModalProps) {
    const modalData = data as DepartmentSettingModalData | null | undefined
    const openModal = useModalStore((state) => state.openModal)

    const [activeTab, setActiveTab] = useState<DepartmentSettingTab>(
        modalData?.defaultTab ?? 'details'
    )

    const details = modalData?.details ?? DEFAULT_DEPARTMENT_DETAILS
    const experts = modalData?.experts ?? DEFAULT_DEPARTMENT_EXPERTS

    return (
        <div className="flex w-full min-w-[720px] flex-col gap-4 bg-surface-container-lowest py-4.5 px-6 rounded-2xl" dir="rtl">
            <div className="flex min-h-[420px] gap-4">
                <Sidebar
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                {activeTab === 'details' ? (
                    <DetailsTab details={details} onEdit={modalData?.onEdit} />
                ) : (
                    <ExpertsTab
                        experts={experts}
                        onAddExpert={
                            modalData?.onAddExpert ??
                            (() => openModal(ModalTypes.SELECT_USER_AND_GROUPS))
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default DepartmentSetting
