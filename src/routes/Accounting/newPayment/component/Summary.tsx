'use client'

import { ACCOUNT_OPTIONS, PAYMENT_TYPE_OPTIONS } from '../constants'
import { useNewPayment } from '../provider/NewPaymentProvider'

const Summary = () => {
    const { sourceAccount, paymentType, paymentAmount } = useNewPayment()

    const paymentTypeLabel = PAYMENT_TYPE_OPTIONS.find(
        (option) => option.value === paymentType
    )?.label
    const sourceAccountLabel = ACCOUNT_OPTIONS.find(
        (option) => option.value === sourceAccount
    )?.label

    const displayValue = (value?: string) => value || '-'

    return (
        <div>
            <span>خلاصه</span>
            <div className="flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6">
                <div className="flex flex-row justify-between">
                    <span>نوع</span>
                    <span>{displayValue(paymentTypeLabel)}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span>حساب/صندوق مبدأ</span>
                    <span>{displayValue(sourceAccountLabel)}</span>
                </div>
                <div className="flex flex-row justify-between">
                    <span>مبلغ</span>
                    <span>{displayValue(paymentAmount)}</span>
                </div>
            </div>
        </div>
    )
}

export default Summary
