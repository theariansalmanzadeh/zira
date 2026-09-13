'use client'

import { useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/src/shared/components/ui/Dialog'
import DeliveryAndDateBody from './DeliveryAndDateBody'

const DeliveryAndDate = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="rounded-container-xl bg-surface-container-lowest p-6">
                <Button
                    type="button"
                    variant="primary"
                    className="w-full rounded-full py-3"
                    onClick={() => setOpen(true)}
                >
                    <span className="text-label-lg text-on-primary">
                        انتخاب شیوه و زمان تحویل سفارش
                    </span>
                </Button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    dir="rtl"
                    showCloseButton
                    className="max-h-[90vh] w-full max-w-[640px] overflow-y-auto rounded-card-lg border-0 px-6 py-5 sm:max-w-[640px]"
                >
                    <DialogHeader className="mb-2">
                        <DialogTitle className="text-right text-title-md font-medium text-on-surface">
                            شیوه و زمان تحویل سفارش
                        </DialogTitle>
                    </DialogHeader>

                    <DeliveryAndDateBody
                        onConfirm={() => {
                            setOpen(false)
                        }}
                        isPhysicalDelivery={true}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DeliveryAndDate
