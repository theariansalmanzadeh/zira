'use client'

import { Medal } from 'lucide-react'

type CreditPaymentCardProps = {
    amount: number
    onChange: (amount: number) => void
}

const CreditPaymentCard = ({ amount, onChange }: CreditPaymentCardProps) => {
    return (
        <div className='flex flex-col gap-4 rounded-card-sm border border-outline-variant bg-surface-container-lowest p-4'>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex size-10 shrink-0 items-center justify-center rounded-card-sm bg-[#FBF0E2] text-[#C8841A]'>
                    <Medal className='size-5' />
                </div>
                <div className='flex min-w-0 flex-1 flex-col gap-1 text-right'>
                    <span className='text-label-lg font-bold text-on-surface'>
                        اعتبار طلایی (حساب باز)
                    </span>
                    <span className='text-label-md text-outline'>
                        سقف در دسترس: ۲۸٬۰۰۰٬۰۰۰ تومان
                    </span>
                </div>
            </div>

            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2 text-label-md'>
                    <span className='font-medium text-[#C8841A]'>حداکثر سقف</span>
                    <span className='text-outline-variant'>|</span>
                    <span className='text-outline'>صفر</span>
                </div>
                <div className='flex items-center gap-2'>
                    <input
                        type='text'
                        inputMode='numeric'
                        value={amount || ''}
                        onChange={(event) =>
                            onChange(Number(event.target.value.replace(/\D/g, '')) || 0)
                        }
                        placeholder='•'
                        className='h-9 w-28 rounded-full border border-outline-variant bg-surface-container-lowest px-3 text-center text-label-md text-on-surface outline-none placeholder:text-outline'
                    />
                    <span className='text-label-md text-outline'>تومان</span>
                </div>
            </div>
        </div>
    )
}

export default CreditPaymentCard
