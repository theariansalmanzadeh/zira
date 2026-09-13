'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import DetailLayout from '@/src/shared/layouts/detailLayout/DetailLayout'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import { usePathname } from 'next/navigation'

const GroupDetails = () => {
    const pathname = usePathname()
    const id = pathname.split('/').pop() ?? 'GR-5318_92'
    const openModal = useModalStore((state) => state.openModal)

    return (
        <>
            <div className="flex flex-row items-center justify-between gap-3">
                <div className="flex flex-col items-start gap-1">
                    <div className="flex flex-row items-center gap-3">
                        <span className="text-label-lg font-bold text-on-surface">
                            عنوان گروه
                        </span>
                        <Pill text="فعال" variant="success" />
                    </div>
                    <span className="text-label-sm text-outline">{id}</span>
                </div>

                <div className="flex flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={() => openModal(ModalTypes.GROUP_SETTINGS)}
                    >
                        تنظیمات
                        <Icon label="tune300Linear" className="size-6!" />
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() =>
                            openModal(ModalTypes.SELECT_USER_AND_GROUPS, {
                                hasOnlyUsers: true,
                            })
                        }
                    >
                        <Icon label="addSm400Linear" className="size-6!" />
                        افزودن کاربر
                    </Button>
                </div>
            </div>

            <DetailLayout header="لیست کاربران">
                <div>GroupDetails</div>
            </DetailLayout>
        </>
    )
}

export default GroupDetails
