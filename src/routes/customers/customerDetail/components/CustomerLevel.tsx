'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/src/shared/components/ui/button'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import { cn } from '@shared/libs/utils'

const LEVEL_LABELS = ['سطح ۱', 'سطح ۲', 'سطح ۳'] as const

const LEVEL_NOTES: Record<number, string> = {
    1: 'سطح ۱: نمایش تصاویر پایه کاتالوگ.',
    2: 'سطح ۲: نمایش تصاویر مانکنی. برای کاربران با جنسیت زن، همه تصاویر نمایش داده می‌شود.',
    3: 'سطح ۳: دسترسی کامل به همه تصاویر کاتالوگ.',
}

type CustomerLevelProps = {
    userLevel?: number
}

const CustomerLevel = ({ userLevel: initialUserLevel = 0 }: CustomerLevelProps) => {
    const params = useParams<{ id: string }>()
    const openModal = useModalStore((state) => state.openModal)
    const [userLevel, setUserLevel] = useState(initialUserLevel)

    useEffect(() => {
        setUserLevel(initialUserLevel)
    }, [initialUserLevel])

    const handleChangeLevel = () => {
        openModal(ModalTypes.CHANGE_CUSTOMER_LEVEL, {
            customerId: params?.id,
            currentLevel: userLevel,
            onConfirm: (level: number) => setUserLevel(level),
        })
    }

    return (
        <div className="rounded-card-md border border-outline-variant bg-surface-container-lowest p-5">
            <div className="mb-1.5 flex flex-row items-center justify-between gap-2">
                <h3 className="text-title-sm font-semibold text-on-surface">
                    سطح کاربر
                </h3>
                <Button
                    size="sm"
                    variant="ghost"
                    className="text-label-sm font-bold text-primary"
                    onClick={handleChangeLevel}
                >
                    تغییر سطح
                </Button>
            </div>
            <p className="mb-3 text-label-sm text-outline">
                سطح کاربر نوع تصاویر کاتالوگ نمایش‌داده‌شده را تعیین می‌کند.
            </p>

            <div className="flex flex-row items-center gap-2">
                {LEVEL_LABELS.map((label, index) => {
                    const level = index + 1
                    const filled = level <= userLevel

                    return (
                        <div key={label} className="flex-1 text-center">
                            <div
                                className={cn(
                                    'h-1.5 rounded',
                                    filled
                                        ? 'bg-primary'
                                        : 'bg-surface-container-highest'
                                )}
                            />
                            <div
                                className={cn(
                                    'mt-1.5 text-[10px] font-bold',
                                    filled ? 'text-primary' : 'text-outline'
                                )}
                            >
                                {label}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-3 rounded-[10px] bg-surface-container-high px-3 py-2.5 text-label-sm leading-relaxed text-on-surface-variant">
                {LEVEL_NOTES[userLevel] ?? '-'}
            </div>
        </div>
    )
}

export default CustomerLevel
