'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import type { CooperationLevel } from '@/src/api/types/admin/customers'
import { useUpdateCustomerTier } from '@/src/routes/customers/hooks/customers'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { BaseModalProps } from '../types'

export type ChangeCustomerLevelModalData = {
    customerId?: string
    currentLevel?: number
    expectedVersion?: number
    reason?: string
    onConfirm?: (level: number) => void
}

const CUSTOMER_LEVELS = [
    {
        value: 1,
        description: 'نمایش تصاویر پایه کاتالوگ.',
    },
    {
        value: 2,
        description:
            'نمایش تصاویر مانکنی. برای کاربران با جنسیت زن، همه تصاویر نمایش داده می‌شود.',
    },
    {
        value: 3,
        description: 'دسترسی کامل به همه تصاویر کاتالوگ.',
    },
] as const

const LEVEL_TO_COOPERATION: Record<number, CooperationLevel> = {
    1: 'BRONZE',
    2: 'SILVER',
    3: 'GOLD',
}

const ChangeCustomerLevel = ({ closeModal, data }: BaseModalProps) => {
    const params = useParams<{ id: string }>()
    const modalData =
        (data as ChangeCustomerLevelModalData | null | undefined) ?? {}
    const customerId = modalData.customerId || params?.id || ''
    const [selectedLevel, setSelectedLevel] = useState(
        modalData.currentLevel ?? 2
    )

    const { mutate: updateTier, isPending } = useUpdateCustomerTier()

    const handleSubmit = () => {
        if (!customerId) {
            modalData.onConfirm?.(selectedLevel)
            closeModal()
            return
        }

        const cooperationLevel =
            LEVEL_TO_COOPERATION[selectedLevel] ?? 'SILVER'

        updateTier(
            {
                customerId,
                body: {
                    level: cooperationLevel,
                    tier: cooperationLevel,
                    reason: modalData.reason || 'تغییر سطح مشتری',
                    expected_version: modalData.expectedVersion ?? 1,
                },
            },
            {
                onSuccess: () => {
                    modalData.onConfirm?.(selectedLevel)
                    closeModal()
                },
            }
        )
    }

    return (
        <div className="flex w-full flex-col gap-5" dir="rtl">
            <p className="text-label-md text-outline">
                سطح کاربر نوع تصاویر کاتالوگ نمایش‌داده‌شده را تعیین می‌کند.
            </p>

            <div className="flex flex-col gap-3">
                {CUSTOMER_LEVELS.map((level) => {
                    const selected = selectedLevel === level.value

                    return (
                        <button
                            key={level.value}
                            type="button"
                            onClick={() => setSelectedLevel(level.value)}
                            className={cn(
                                'flex w-full flex-row items-center gap-3 rounded-card-md border-[1.5px] p-4 text-right transition-colors',
                                selected
                                    ? 'border-primary bg-primary-hovered'
                                    : 'border-outline-variant bg-surface-container-lowest'
                            )}
                        >
                            <div className="min-w-0 flex-1">
                                <div
                                    className={cn(
                                        'text-label-lg font-bold',
                                        selected
                                            ? 'text-primary'
                                            : 'text-on-surface'
                                    )}
                                >
                                    {`سطح ${formatFaNumber(level.value)}`}
                                </div>
                                <div className="mt-1 text-label-sm leading-relaxed text-outline">
                                    {level.description}
                                </div>
                            </div>
                            <span
                                className={cn(
                                    'flex size-5 shrink-0 items-center justify-center rounded-full border-2',
                                    selected
                                        ? 'border-primary'
                                        : 'border-outline-variant'
                                )}
                            >
                                <span
                                    className={cn(
                                        'size-2.5 rounded-full',
                                        selected
                                            ? 'bg-primary'
                                            : 'bg-transparent'
                                    )}
                                />
                            </span>
                        </button>
                    )
                })}
            </div>

            <div className="flex items-center gap-3 border-t border-outline-variant pt-4">
                <Button
                    type="button"
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isPending}
                    isLoading={isPending}
                >
                    ثبت سطح
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={closeModal}
                    disabled={isPending}
                >
                    انصراف
                </Button>
            </div>
        </div>
    )
}

export default ChangeCustomerLevel
