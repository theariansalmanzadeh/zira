'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { cn } from '@shared/libs/utils'
import {
    useGetCustomerProfile,
    useUpdateCustomerBlacklist,
    useUpdateCustomerStatus,
} from '@/src/routes/customers/hooks/customers'

export type UserStatus = 'active' | 'inactive' | 'blocked'

export const STATUS_OPTIONS: {
    value: UserStatus
    label: string
    sub: string
}[] = [
    {
        value: 'active',
        label: 'فعال',
        sub: 'دسترسی کامل به ثبت سفارش',
    },
    {
        value: 'inactive',
        label: 'غیرفعال',
        sub: 'حساب موقتاً غیرفعال',
    },
    {
        value: 'blocked',
        label: 'مسدود به دلایل مالی',
        sub: 'ثبت سفارش اعتباری ممنوع',
    },
]

type CustomerStatusProps = {
    customerId?: string
    initialStatus?: UserStatus
}

const CustomerStatus = ({
    customerId: propCustomerId,
    initialStatus,
}: CustomerStatusProps) => {
    const params = useParams<{ id: string }>()
    const customerId = propCustomerId || params?.id || ''

    const { data: profile } = useGetCustomerProfile(
        customerId,
        Boolean(customerId)
    )

    const derivedStatus: UserStatus = profile?.is_blacklisted
        ? 'blocked'
        : profile?.status?.toUpperCase() === 'INACTIVE'
          ? 'inactive'
          : initialStatus ?? 'active'

    const [status, setStatus] = useState<UserStatus>(derivedStatus)

    useEffect(() => {
        if (profile) {
            if (profile.is_blacklisted) {
                setStatus('blocked')
            } else if (profile.status?.toUpperCase() === 'INACTIVE') {
                setStatus('inactive')
            } else {
                setStatus('active')
            }
        }
    }, [profile])

    const { mutate: updateStatus, isPending: isStatusPending } =
        useUpdateCustomerStatus()
    const { mutate: updateBlacklist, isPending: isBlacklistPending } =
        useUpdateCustomerBlacklist()

    const isPending = isStatusPending || isBlacklistPending

    const handleStatusChange = (newStatus: UserStatus) => {
        if (!customerId || newStatus === status || isPending) return

        const expectedVersion = profile?.version ?? 1

        if (newStatus === 'blocked') {
            updateBlacklist(
                {
                    customerId,
                    body: {
                        flag: true,
                        reason: 'مسدود به دلایل مالی',
                        expected_version: expectedVersion,
                    },
                },
                {
                    onSuccess: () => {
                        setStatus('blocked')
                    },
                }
            )
        } else {
            if (profile?.is_blacklisted) {
                updateBlacklist({
                    customerId,
                    body: {
                        flag: false,
                        reason: 'رفع مسدودی',
                        expected_version: expectedVersion,
                    },
                })
            }

            updateStatus(
                {
                    customerId,
                    body: {
                        status: newStatus === 'active' ? 'ACTIVE' : 'INACTIVE',
                        reason:
                            newStatus === 'active'
                                ? 'فعال‌سازی کاربر'
                                : 'غیرفعال‌سازی کاربر',
                        expected_version: expectedVersion,
                    },
                },
                {
                    onSuccess: () => {
                        setStatus(newStatus)
                    },
                }
            )
        }
    }

    return (
        <div className="rounded-card-md border border-outline-variant bg-surface-container-lowest p-5">
            <h3 className="text-title-sm font-semibold text-on-surface">
                وضعیت کاربر
            </h3>
            <p className="mt-1.5 mb-3.5 text-label-sm text-outline">
                تغییر وضعیت بر دسترسی ثبت سفارش اثر می‌گذارد.
            </p>

            {isPending ? (
                <div className="flex flex-col gap-2">
                    {STATUS_OPTIONS.map((option) => (
                        <div
                            key={option.value}
                            className="flex h-15.5 w-full animate-pulse items-center gap-2.5 rounded-[11px] bg-surface-container-high p-3"
                        >
                            <div className="size-4.5 shrink-0 rounded-full bg-surface-container-highest" />
                            <div className="flex flex-1 flex-col gap-1.5">
                                <div className="h-3.5 w-16 rounded bg-surface-container-highest" />
                                <div className="h-2.5 w-36 rounded bg-surface-container-highest" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {STATUS_OPTIONS.map((option) => {
                        const selected = status === option.value
                        const isActiveOption = option.value === 'active'

                        return (
                            <button
                                key={option.value}
                                type="button"
                                disabled={isPending}
                                onClick={() => handleStatusChange(option.value)}
                                className={cn(
                                    'flex w-full flex-row items-center gap-2.5 rounded-[11px] border-[1.5px] p-3 text-right transition-colors',
                                    selected && isActiveOption
                                        ? 'border-success bg-success-container/40'
                                        : selected
                                          ? 'border-primary bg-primary-hovered'
                                          : 'border-outline-variant bg-surface-container-lowest'
                                )}
                            >
                                <span
                                    className={cn(
                                        'flex size-4.5 shrink-0 items-center justify-center rounded-full border-2',
                                        selected && isActiveOption
                                            ? 'border-success'
                                            : selected
                                              ? 'border-primary'
                                              : 'border-outline-variant'
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'size-2.5 rounded-full',
                                            selected && isActiveOption
                                                ? 'bg-success'
                                                : selected
                                                  ? 'bg-primary'
                                                  : 'bg-transparent'
                                        )}
                                    />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div
                                        className={cn(
                                            'text-label-md font-bold',
                                            selected && isActiveOption
                                                ? 'text-success'
                                                : 'text-on-surface'
                                        )}
                                    >
                                        {option.label}
                                    </div>
                                    <div className="mt-0.5 text-label-sm text-outline">
                                        {option.sub}
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default CustomerStatus
