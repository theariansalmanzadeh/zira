'use client'

import InfoCardField from '@/src/shared/components/infoCard/components/InfoCardField'
import { DEFAULT_CUSTOMER_GROUP_DETAILS } from '@/src/shared/components/modals/components/CustomerGroupDetails.types'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { formatFaNumber } from '@/src/shared/libs/formatter'

type HeaderProps = {
    code?: string
    name?: string
    userLevel?: string
    marketerName?: string
    chequeLevel?: string
    goldLevel?: string
    userStatus?: string
    customerCount?: number
    discountPercent?: number
    marketerPercent?: number
}

const Header = ({
    code = DEFAULT_CUSTOMER_GROUP_DETAILS.code,
    name = DEFAULT_CUSTOMER_GROUP_DETAILS.name,
    userLevel = DEFAULT_CUSTOMER_GROUP_DETAILS.userLevel,
    marketerName = DEFAULT_CUSTOMER_GROUP_DETAILS.marketerName,
    chequeLevel = DEFAULT_CUSTOMER_GROUP_DETAILS.chequeLevel,
    goldLevel = DEFAULT_CUSTOMER_GROUP_DETAILS.goldLevel,
    userStatus = DEFAULT_CUSTOMER_GROUP_DETAILS.userStatus,
    customerCount = DEFAULT_CUSTOMER_GROUP_DETAILS.customerCount,
    discountPercent = DEFAULT_CUSTOMER_GROUP_DETAILS.discountPercent,
    marketerPercent = DEFAULT_CUSTOMER_GROUP_DETAILS.marketerPercent,
}: HeaderProps) => {
    return (
        <div className="flex flex-col gap-6" dir="rtl">
            <div className="grid grid-cols-4 gap-6 py-2">
                <InfoCardField label="کد گروه" value={code} />
                <InfoCardField label="نام گروه" value={name} />
                <InfoCardField label="سطح کاربران گروه" value={userLevel} />
                <div className="flex flex-col gap-3 text-right">
                    <span className="text-label-md text-outline">نام بازاریاب</span>
                    <div className="flex flex-row items-center gap-2">
                        <Avatar size="sm">
                            <AvatarFallback className="bg-surface-container-highest text-label-sm text-on-surface-variant">
                                {marketerName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-label-lg text-on-surface-variant">
                            {marketerName}
                        </span>
                    </div>
                </div>
                <InfoCardField label="سطح اعتبار چک" value={chequeLevel} />
                <InfoCardField label="سطح اعتبار طلایی" value={goldLevel} />
                <InfoCardField label="وضعیت کاربران گروه" value={userStatus} />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-card-md bg-surface-container-high px-3 py-3 text-center">
                    <div className="text-title-lg font-semibold text-on-surface">
                        {formatFaNumber(customerCount)}
                    </div>
                    <div className="mt-1 text-label-md text-outline">
                        تعداد مشتری
                    </div>
                </div>
                <div className="rounded-card-md bg-primary-container px-3 py-3 text-center">
                    <div className="text-title-lg font-semibold text-primary">
                        ٪{formatFaNumber(discountPercent)}
                    </div>
                    <div className="mt-1 text-label-md text-primary">
                        تخفیف فعال
                    </div>
                </div>
                <div className="rounded-card-md bg-info-container px-3 py-3 text-center">
                    <div className="text-title-lg font-semibold text-info">
                        ٪{formatFaNumber(marketerPercent)}
                    </div>
                    <div className="mt-1 text-label-md text-info">
                        درصد بازاریاب
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
