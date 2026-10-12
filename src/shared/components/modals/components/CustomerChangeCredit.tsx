'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { usePatchCustomerCreditPolicy } from '@/src/routes/customers/hooks/customers'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import SelectItem from '@/src/shared/components/ui/SelectItem'
import { formatPrice } from '@/src/shared/libs/formatter'
import { onlyNumber } from '@/src/shared/schema/generalSchema'
import type { BaseModalProps } from '../types'

export type GuaranteeType = 'cheque' | 'promissory'

export type CustomerChangeCreditModalData = {
    customerId?: string
    cardId?: string
    cardTitle?: string
    currentCap?: number
    expectedVersion?: number
    onConfirm?: (amount: number, guaranteeType: GuaranteeType) => void
}

const GUARANTEE_OPTIONS: {
    value: GuaranteeType
    title: string
    description: string
}[] = [
    {
        value: 'cheque',
        title: 'چک شخصی',
        description: 'چک صیادی به نام مشتری',
    },
    {
        value: 'promissory',
        title: 'سفته',
        description: 'سفته معادل مبلغ افزایش',
    },
]

const CustomerChangeCredit = ({ closeModal, data }: BaseModalProps) => {
    const params = useParams<{ id: string }>()
    const modalData =
        (data as CustomerChangeCreditModalData | null | undefined) ?? {}
    const customerId = modalData.customerId || params?.id || ''

    const [amount, setAmount] = useState<string>(
        modalData.currentCap !== undefined ? String(modalData.currentCap) : ''
    )
    const [guaranteeType, setGuaranteeType] = useState<GuaranteeType>('cheque')

    const { mutate: updateCreditPolicy, isPending } =
        usePatchCustomerCreditPolicy()

    const numericAmount = amount ? Number(amount) : 0

    const handleSubmit = () => {
        if (!customerId) {
            modalData.onConfirm?.(numericAmount, guaranteeType)
            closeModal()
            return
        }

        updateCreditPolicy(
            {
                customerId,
                body: {
                    golden_credit_amount: numericAmount,
                    reason: `تغییر اعتبار ${modalData.cardTitle ?? ''} با نوع ضمانت ${
                        guaranteeType === 'cheque' ? 'چک شخصی' : 'سفته'
                    }`,
                    expected_version: modalData.expectedVersion ?? 1,
                },
            },
            {
                onSuccess: () => {
                    modalData.onConfirm?.(numericAmount, guaranteeType)
                    closeModal()
                },
            }
        )
    }

    return (
        <div className="flex flex-col gap-5 pt-2" dir="rtl">
            <div className="flex flex-col gap-1.5">
                <Input
                    label="مبلغ اعتبار (تومان)"
                    placeholder="مثلاً ۵۰٬۰۰۰٬۰۰۰"
                    value={amount ? formatPrice(Number(amount)) : ''}
                    onChange={(val) => setAmount(onlyNumber(val))}
                />
                {modalData.currentCap !== undefined && (
                    <span className="text-label-sm text-outline">
                        سقف اعتبار فعلی: {formatPrice(modalData.currentCap)} تومان
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-label-md font-semibold text-on-surface">
                    نوع ضمانت
                </span>
                <div className="flex flex-col gap-2.5">
                    {GUARANTEE_OPTIONS.map((option) => (
                        <SelectItem
                            key={option.value}
                            title={option.title}
                            description={option.description}
                            selected={guaranteeType === option.value}
                            onClick={() => setGuaranteeType(option.value)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3 border-t border-outline-variant pt-4">
                <Button
                    type="button"
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isPending}
                    isLoading={isPending}
                >
                    ثبت تغییرات
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    disabled={isPending}
                >
                    انصراف
                </Button>
            </div>
        </div>
    )
}

export default CustomerChangeCredit
