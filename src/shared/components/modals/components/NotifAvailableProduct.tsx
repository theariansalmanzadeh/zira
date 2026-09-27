'use client'

import { Button } from '@/src/shared/components/ui/button'
import type { BaseModalProps } from '../types'

const NotifAvailableProduct = ({ closeModal }: BaseModalProps) => {
    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <p className="text-label-md text-on-surface-variant">
                این کالا فعلاً ناموجود است. موجود که شد به شما اطلاع می‌دهیم.
            </p>
            <Button type="button" variant="primary" onClick={closeModal}>
                متوجه شدم
            </Button>
        </div>
    )
}

export default NotifAvailableProduct
