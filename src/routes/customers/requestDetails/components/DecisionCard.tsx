'use client'

import { useParams, useRouter } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import {
    useApproveRegistrationRequest,
    useRejectRegistrationRequest,
} from '../../hooks/customers'

const DecisionCard = () => {
    const params = useParams<{ id: string }>()
    const router = useRouter()
    const requestId = params.id ?? ''

    const { mutate: approveRequest, isPending: isApproving } =
        useApproveRegistrationRequest()
    const { mutate: rejectRequest, isPending: isRejecting } =
        useRejectRegistrationRequest()

    const onApprove = () => {
        if (!requestId) return
        approveRequest(requestId, {
            onSuccess: () => {
                router.push('/admin/customers?sub=requests')
            },
        })
    }

    const onReject = () => {
        if (!requestId) return
        rejectRequest(
            {
                requestId,
                body: { reason: 'عدم تایید درخواست' },
            },
            {
                onSuccess: () => {
                    router.push('/admin/customers?sub=requests')
                },
            }
        )
    }

    const isPending = isApproving || isRejecting

    return (
        <div
            className="rounded-card-md bg-surface-container-lowest p-6"
            dir="rtl"
        >
            <div className="mb-6 flex flex-col gap-2 text-right">
                <h2 className="text-title-lg font-semibold text-on-surface">
                    تصمیم
                </h2>
                <p className="text-label-md text-outline">
                    با تایید، مشتری به لیست افزوده شده و حساب کاربری برایش ساخته
                    می‌شود.
                </p>
            </div>
            <div className="flex flex-col gap-3">
                <Button
                    type="button"
                    onClick={onApprove}
                    disabled={isPending || !requestId}
                    isLoading={isApproving}
                    className="h-12 w-full rounded-button-lg! bg-success! text-white! hover:bg-success/90!"
                >
                    <Icon
                        label="checkSm400Linear"
                        className="size-5! text-white"
                    />
                    تایید و ارسال به لیست مشتریان
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onReject}
                    disabled={isPending || !requestId}
                    isLoading={isRejecting}
                    className="h-12 w-full rounded-button-lg! border-error! text-error! hover:bg-error-container!"
                >
                    <Icon label="closeSm400Linear" className="size-5! text-error" />
                    عدم تایید درخواست
                </Button>
            </div>
        </div>
    )
}

export default DecisionCard
