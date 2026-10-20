'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { ModalTypes } from '@/src/shared/components/modals/types'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import { useModalStore } from '@/src/shared/store/modal-store'
import UnitList from './unitList/UnitList'

const Settings = () => {
    const { openModal } = useModalStore()

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <HeadingWithActions>
                <HeadingWithActions.Title>لیست واحدها</HeadingWithActions.Title>
                <HeadingWithActions.SubTitle>
                    مدیریت واحدهای اندازه‌گیری کالا
                </HeadingWithActions.SubTitle>
                <HeadingWithActions.ButtonWrapper>
                    <Button
                        variant="primary"
                        onClick={() => openModal(ModalTypes.ADD_UNIT)}
                    >
                        <Icon
                            label="addSm400Broken"
                            className="size-4! text-on-primary"
                        />
                        <span className="text-label-lg text-on-primary">
                            افزودن واحد جدید
                        </span>
                    </Button>
                </HeadingWithActions.ButtonWrapper>
            </HeadingWithActions>
            <UnitList />
        </div>
    )
}

export default Settings
