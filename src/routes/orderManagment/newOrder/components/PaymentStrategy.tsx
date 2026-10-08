'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { cn } from '@shared/libs/utils'
import { PAYMENT_OPTIONS } from '../constants'
import { useCreateOrderContext } from '../provider/CreateOrderProvider'
import CashPaymentCard from './CashPaymentCard'
import ChequeInputCard from './ChequeInputCard'
import CreditPaymentCard from './CreditPaymentCard'

const PaymentStrategy = () => {
    const {
        paymentType,
        setPaymentType,
        cheques,
        addCheque,
        removeCheque,
        updateCheque,
        cashPayments,
        addCashPayment,
        removeCashPayment,
        updateCashPayment,
        cacheInfo,
        setCacheInfo,
    } = useCreateOrderContext()

    return (
        <div className='flex flex-col gap-5 rounded-card-md bg-surface-container-lowest p-6' dir='rtl'>
            <div>
                <h2 className='text-title-md font-medium text-on-surface'>نوع تسویه</h2>
                <p className='mt-1 text-label-md text-outline'>
                    روش پرداخت سفارش را انتخاب کنید.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                {PAYMENT_OPTIONS.map((option) => {
                    const selected = paymentType.includes(option.type)

                    return (
                        <button
                            key={option.type}
                            type='button'
                            onClick={() =>
                                setPaymentType(
                                    selected
                                        ? paymentType.filter((type) => type !== option.type)
                                        : [...paymentType, option.type]
                                )
                            }
                            className={cn(
                                'flex flex-col items-center gap-2.5 rounded-card-sm border-[1.5px] px-3.5 py-5 transition-colors',
                                selected
                                    ? 'border-primary bg-primary-hovered'
                                    : 'border-outline-variant bg-surface-container-lowest hover:border-primary/40'
                            )}
                        >
                            <div
                                className={cn(
                                    'flex size-11 items-center justify-center rounded-card-sm text-[21px]',
                                    option.iconBgClassName,
                                    option.iconFgClassName
                                )}
                            >
                                {option.icon}
                            </div>
                            <span
                                className={cn(
                                    'text-label-lg font-bold',
                                    selected ? 'text-primary' : 'text-on-surface'
                                )}
                            >
                                {option.label}
                            </span>
                            <span className='text-center text-label-sm leading-relaxed text-outline'>
                                {option.sub}
                            </span>
                        </button>
                    )
                })}
            </div>

            {paymentType.includes('cash') && (
                <div className='flex flex-col gap-3.5'>
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                        <div className='text-label-lg font-semibold text-on-surface-variant'>
                            اطلاعات نقدی
                        </div>
                        <Button
                            type='button'
                            variant='primary'
                            size='default'
                            className='gap-1.5'
                            onClick={addCashPayment}
                        >
                            <Icon label='addSm400Broken' className='size-5!' />
                            افزودن پرداخت نقدی
                        </Button>
                    </div>
                    {cashPayments.map((payment) => (
                        <CashPaymentCard
                            key={payment.id}
                            value={payment}
                            onChange={(info) => updateCashPayment(payment.id, info)}
                            onRemove={
                                cashPayments.length > 1
                                    ? () => removeCashPayment(payment.id)
                                    : undefined
                            }
                        />
                    ))}
                </div>
            )}

            {paymentType.includes('cheque') && (
                <div className='flex flex-col gap-3.5'>
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                        <div className='text-label-lg font-semibold text-on-surface-variant'>
                            اطلاعات چک
                        </div>
                        <Button
                            type='button'
                            variant='primary'
                            size='default'
                            className='gap-1.5'
                            onClick={addCheque}
                        >
                            <Icon label='addSm400Broken' className='size-5!' />
                            افزودن چک
                        </Button>
                    </div>
                    {cheques.map((cheque) => (
                        <ChequeInputCard
                            key={cheque.id}
                            value={cheque}
                            onChange={(info) => updateCheque(cheque.id, info)}
                            onRemove={
                                cheques.length > 1
                                    ? () => removeCheque(cheque.id)
                                    : undefined
                            }
                        />
                    ))}
                </div>
            )}

            {paymentType.includes('credit') && (
                <div className='flex flex-col gap-3.5'>
                    <div className='text-label-lg font-semibold text-on-surface-variant'>
                        اطلاعات اعتبار
                    </div>
                    <CreditPaymentCard amount={cacheInfo} onChange={setCacheInfo} />
                </div>
            )}
        </div>
    )
}

export default PaymentStrategy
