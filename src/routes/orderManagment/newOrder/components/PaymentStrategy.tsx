'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Input } from '@/src/shared/components/ui/Input'
import { cn } from '@shared/libs/utils'
import { PAYMENT_OPTIONS } from '../constants'
import { useCreateOrderContext } from '../provider/CreateOrderProvider'

const PaymentStrategy = () => {
    const {
        paymentType,
        setPaymentType,
        chequeInfo,
        setChequeInfo,
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

            {paymentType.includes('cheque') && (
                <div className='rounded-card-sm bg-surface-container-high p-5'>
                    <div className='mb-3.5 text-label-lg font-semibold text-on-surface-variant'>
                        اطلاعات چک
                    </div>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                        <Input
                            label='شماره چک'
                            value={chequeInfo.chequeNumber}
                            onChange={(value) => setChequeInfo({ chequeNumber: value })}
                            placeholder='۱۲۳۴۵۶'
                            dir='ltr'
                            className='text-right'
                        />
                        <Input
                            label='تاریخ سررسید'
                            value={chequeInfo.dueDate}
                            onChange={(value) => setChequeInfo({ dueDate: value })}
                            placeholder='۱۴۰۴/۱۰/۱۵'
                        />
                        <div className='sm:col-span-2'>
                            <Input
                                label='بانک'
                                value={chequeInfo.bank}
                                onChange={(value) => setChequeInfo({ bank: value })}
                                placeholder='ملت'
                            />
                        </div>
                    </div>
                </div>
            )}

            {paymentType.includes('credit') && (
                <div className='flex items-center gap-3 rounded-card-sm bg-info-container px-4 py-4 text-label-md leading-relaxed text-info'>
                    <div className='flex size-10 shrink-0 items-center justify-center rounded-card-sm bg-surface-container-lowest text-info'>
                        <Icon label='heapSnapshot400Linear' className='size-5!' />
                    </div>
                    <div>
                        سقف اعتبار مشتری{' '}
                        <b>۲۰۰٬۰۰۰٬۰۰۰</b> تومان — مانده پس از این سفارش{' '}
                        <b>۵۸٬۰۰۰٬۰۰۰</b> تومان
                    </div>
                </div>
            )}
        </div>
    )
}

export default PaymentStrategy
