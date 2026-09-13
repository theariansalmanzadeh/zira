'use client'

import { useRouter } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import { formatFaNumber } from '@/src/shared/libs/formatter'

export type CustomerDetailHeaderProps = {
    name?: string
    customerId?: string
    levelText?: string
    statusText?: string
    userLevel?: number
    creditScore?: number | string
    tenure?: string
}

const Header = ({
    name = 'آیدا میرزایی',
    customerId = 'CU-7362',
    levelText = 'طلایی',
    statusText = 'فعال',
    userLevel = 2,
    creditScore = 92,
    tenure = '۳٫۲ سال',
}: CustomerDetailHeaderProps) => {
    const { back } = useRouter()
    const openModal = useModalStore((state) => state.openModal)

    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <div className="flex flex-row flex-wrap items-center gap-3">
                <Button variant="ghost" onClick={() => back()}>
                    <Icon
                        label="arrowLeft400Broken"
                        className="size-4! rotate-180 text-on-surface-variant"
                    />
                    <span className="text-label-lg">بازگشت</span>
                </Button>

                <div className="flex-1" />

                <Button variant="outline">
                    <Icon label="account400Linear" className="size-4!" />
                    <span className="text-label-sm">تخصیص بازاریاب</span>
                </Button>
                <Button
                    variant="primary"
                    onClick={() => openModal(ModalTypes.EDIT_CUSTOMER)}
                >
                    <Icon label="editSquare400Linear" className="size-4! text-on-primary" />
                    <span className="text-label-sm text-on-primary">ویرایش پروفایل</span>
                </Button>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-4 rounded-card-md px-6 py-5">
                <div className="flex size-15 shrink-0 items-center justify-center rounded-[17px] bg-primary/60 text-title-lg font-bold text-on-primary">
                    {name.charAt(0)}
                </div>

                <div className="min-w-0">
                    <div className="flex flex-row flex-wrap items-center gap-2.5">
                        <h1 className="text-title-lg font-semibold text-on-surface">
                            {name}
                        </h1>
                        <span className="text-label-md text-outline" dir="ltr">
                            {customerId}
                        </span>
                    </div>
                    <div className="mt-2 flex flex-row flex-wrap items-center gap-2">
                        <Pill
                            text={levelText}
                            variant="warning"
                            hasDot
                            className="border-0"
                        />
                        <Pill
                            text={statusText}
                            variant="success"
                            hasDot
                            className="border-0"
                        />
                        <span className="text-label-sm text-outline">
                            سطح کاربر {formatFaNumber(userLevel)} از ۳
                        </span>
                    </div>
                </div>

                <div className="flex-1" />

                <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-col items-center gap-0.5 text-center">
                        <span className="text-title-md font-semibold text-on-surface">
                            {formatFaNumber(creditScore)}
                        </span>
                        <span className="text-label-sm text-outline">
                            امتیاز خوش‌حسابی
                        </span>
                    </div>
                    <div className="h-8 w-px bg-outline-variant" />
                    <div className="flex flex-col items-center gap-0.5 text-center">
                        <span className="text-title-md font-semibold text-on-surface">
                            {tenure}
                        </span>
                        <span className="text-label-sm text-outline">مدت همکاری</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
