'use client'

import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'

export type CustomerDetailHeaderProps = {
    name?: string
    customerId?: string
    levelText?: string
    statusText?: string
    status?: string
    userLevel?: number
    creditScore?: number | string
    tenure?: string
}

const statusVariant = (status?: string) => {
    if (status === 'ACTIVE') return 'success' as const
    if (status === 'PENDING') return 'warning' as const
    return 'outlined' as const
}

const Header = ({
    name = '-',
    customerId = '-',
    levelText = '-',
    statusText = '-',
    status,
    userLevel,
    creditScore = '-',
    tenure = '-',
}: CustomerDetailHeaderProps) => {
    return (
        <div
            className="flex flex-row flex-wrap items-center gap-4 rounded-card-md bg-surface-container-lowest p-6"
            dir="rtl"
        >
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
                        variant={statusVariant(status)}
                        hasDot
                        className="border-0"
                    />
                    <span className="text-label-sm text-outline">
                        سطح کاربر{' '}
                        {userLevel === undefined ? '-' : formatFaNumber(userLevel)}{' '}
                        از ۳
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
    )
}

export default Header
