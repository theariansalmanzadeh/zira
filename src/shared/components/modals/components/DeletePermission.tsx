'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@shared/components/ui/button'
import type { BaseModalProps } from '../types'
import { useModalStore } from '@/src/shared/store/modal-store'

export type DeletePermissionModalData = {
    onConfirm?: () => void
}

export function DeletePermission({ data }: BaseModalProps) {
    const deleteData = data as DeletePermissionModalData | null | undefined

    const closeModal = useModalStore((state) => state.closeModal)
    const handleConfirm = () => {
        deleteData?.onConfirm?.()
        closeModal()
    }

    return (
        <div className="flex w-full flex-col p-6" dir="rtl">

            <div className="flex flex-col items-center gap-4 py-6 text-center">
                <AlertTriangle
                    className="size-14 stroke-primary text-primary"
                    strokeWidth={1.5}
                    aria-hidden
                />
                <h3 className="text-title-md font-medium text-on-surface">
                    آیا از حذف این دپارتمان اطمینان دارید؟
                </h3>
                <p className=" text-label-md leading-7 text-outline">
                    حذف دپارتمان دارای تیکت باز، در عملکرد سیستم اختلال ایجاد می‌کند!
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
                    variant="primary"
                    className="flex-1"
                    onClick={handleConfirm}
                >
                    بله اطمینان دارم
                </Button>
            </div>
        </div>
    )
}

export default DeletePermission
