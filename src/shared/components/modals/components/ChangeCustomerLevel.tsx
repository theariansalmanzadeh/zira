'use client'

import { useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { BaseModalProps } from '../types'

export type ChangeCustomerLevelModalData = {
    currentLevel?: number
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

const ChangeCustomerLevel = ({ closeModal, data }: BaseModalProps) => {
    const modalData = (data as ChangeCustomerLevelModalData | null | undefined) ?? {}
    const [selectedLevel, setSelectedLevel] = useState(
        modalData.currentLevel ?? 2
    )

    const handleSubmit = () => {
        modalData.onConfirm?.(selectedLevel)
        closeModal()
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
                <Button type="button" variant="primary" onClick={handleSubmit}>
                    ثبت سطح
                </Button>
                <Button type="button" variant="ghost" onClick={closeModal}>
                    انصراف
                </Button>
            </div>
        </div>
    )
}

export default ChangeCustomerLevel
