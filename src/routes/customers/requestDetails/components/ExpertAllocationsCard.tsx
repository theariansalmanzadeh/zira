'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { RegistrationRequestStatus } from '@/src/api/types/admin/customers'
import { useAssignCustomerMarketer } from '@/src/routes/customers/hooks/customers'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import {
    MARKETER_OPTIONS_DUMMY,
    MARKETER_PERCENT_OPTIONS,
    type MarketerOption,
} from '../constants'

type ExpertAllocationsCardProps = {
    customerId?: string
    status?: RegistrationRequestStatus
    marketers?: MarketerOption[]
    percentOptions?: readonly number[]
}

const ExpertAllocationsCard = ({
    customerId = '',
    status,
    marketers = MARKETER_OPTIONS_DUMMY,
    percentOptions = MARKETER_PERCENT_OPTIONS,
}: ExpertAllocationsCardProps) => {
    const { mutate: assignMarketer, isPending } = useAssignCustomerMarketer()
    const [selectedMarketerId, setSelectedMarketerId] = useState(
        marketers[0]?.id ?? ''
    )
    const [selectedPercent, setSelectedPercent] = useState<number>(
        percentOptions.includes(3) ? 3 : (percentOptions[0] ?? 0)
    )
    const isActive = status === 'APPROVED'

    const handleAssign = () => {
        if (!customerId || !selectedMarketerId) return
        assignMarketer(
            {
                customerId,
                body: {
                    marketer_id: selectedMarketerId,
                    percent: selectedPercent,
                },
            },
            {
                onSuccess: () => {
                    toast.success('بازاریاب تخصیص داده شد')
                },
            }
        )
    }

    return (
        <div
            className="rounded-card-md bg-surface-container-lowest p-6"
            dir="rtl"
        >
            <div className="mb-6 flex flex-col gap-2 text-right">
                <div className="flex flex-row items-center justify-between gap-3">
                    <h2 className="text-title-lg font-semibold text-on-surface">
                        تخصیص‌های کارشناس
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-container px-2.5 py-1 text-label-sm text-on-primary-container">
                        <Icon
                            label="security400Linear"
                            className="size-4! text-primary"
                        />
                        فقط ادمین
                    </span>
                </div>
                <p className="text-label-md text-outline">
                    این مقادیر را کارشناس تعیین می‌کند؛ مشتری در زمان ثبت‌نام
                    آن‌ها را نمی‌بیند.
                </p>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <span className="text-label-md font-medium text-on-surface">
                        تخصیص بازاریاب
                    </span>
                    <div className="flex flex-col gap-2">
                        {marketers.map((marketer) => {
                            const selected = marketer.id === selectedMarketerId
                            return (
                                <button
                                    key={marketer.id}
                                    type="button"
                                    onClick={() =>
                                        setSelectedMarketerId(marketer.id)
                                    }
                                    className={cn(
                                        'flex w-full items-center gap-3 rounded-card-md border px-3 py-2.5 text-right transition-colors',
                                        selected
                                            ? 'border-primary bg-primary-container text-primary'
                                            : 'border-outline-variant bg-surface-container-lowest text-on-surface'
                                    )}
                                >
                                    <Avatar size="sm">
                                        <AvatarFallback
                                            className={cn(
                                                'text-label-sm',
                                                selected
                                                    ? 'bg-primary text-on-primary'
                                                    : 'bg-surface-container-highest text-on-surface-variant'
                                            )}
                                        >
                                            {marketer.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-label-lg font-medium">
                                        {marketer.name}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <span className="text-label-md font-medium text-on-surface">
                        درصد بازاریاب
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                        {percentOptions.map((percent) => {
                            const selected = percent === selectedPercent
                            return (
                                <button
                                    key={percent}
                                    type="button"
                                    onClick={() => setSelectedPercent(percent)}
                                    className={cn(
                                        'rounded-card-md border px-2 py-3 text-center text-label-lg font-medium transition-colors',
                                        selected
                                            ? 'border-primary bg-primary-container text-primary'
                                            : 'border-outline-variant bg-surface-container-lowest text-on-surface'
                                    )}
                                >
                                    ٪{formatFaNumber(percent)}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {isActive && (
                    <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        className="w-full text-label-lg"
                        disabled={!customerId || !selectedMarketerId}
                        isLoading={isPending}
                        onClick={handleAssign}
                    >
                        تخصیص بازاریاب
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ExpertAllocationsCard
