'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@components/ui/button'
import type { BaseModalProps } from '../../types'

export type DeleteGroupModalData = {
    onConfirm?: () => void
}

export function DeleteGroup({ closeModal, data }: BaseModalProps) {
    const deleteData = data as DeleteGroupModalData | null | undefined

    const handleConfirm = () => {
        deleteData?.onConfirm?.()
        closeModal()
    }

    return (
        <div className="flex w-full flex-col p-6" dir="rtl">
            <h2 className="text-title-md font-bold text-on-surface">حذف گروه</h2>

            <div className="flex flex-col items-center gap-4 py-6 text-center">
                <AlertTriangle
                    className="size-14 stroke-primary text-primary"
                    strokeWidth={1.5}
                    aria-hidden
                />
                <h3 className="text-title-md font-bold text-on-surface">
                    آیا از حذف این گروه اطمینان دارید؟
                </h3>
                <p className="max-w-md text-label-md leading-7 text-outline">
                    حذف گروه دارای کاربر، ممکن است در عملکرد سیستم اختلال ایجاد کند!
                </p>
            </div>

            <div className="flex w-full gap-3 pt-6">
                <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 text-on-surface-variant"
                    onClick={closeModal}
                >
                    بازگشت
                </Button>
                <Button
                    type="button"
                    className="flex-1 rounded-xl bg-primary text-on-primary hover:bg-primary/90"
                    onClick={handleConfirm}
                >
                    بله اطمینان دارم
                </Button>
            </div>
        </div>
    )
}
