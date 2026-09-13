'use client'

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/src/shared/components/ui/InputOtp'
import { useResendTimer } from '@/src/shared/hooks/useResendTimer'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { PAYMENT_OPTIONS } from '../constants'
import { useCreateOrderContext } from '../provider/CreateOrderProvider'

const OTP_RESEND_SECONDS = 38

const ConfirmStep = () => {
    const {
        selectedCustomer,
        cartCount,
        finalTotal,
        paymentType,
        otpDigits,
        setOtpDigit,
    } = useCreateOrderContext()
    const { remaining: resendSeconds, canResend, restart } = useResendTimer(
        OTP_RESEND_SECONDS
    )

    const paymentLabel =
        PAYMENT_OPTIONS.filter((option) => paymentType.includes(option.type))
            .map((option) => option.label)
            .join('+ ') || '—'

    const handleOtpChange = (value: string) => {
        for (let index = 0; index < 4; index += 1) {
            setOtpDigit(index, value[index] ?? '')
        }
    }



    return (
        <div className='flex flex-col gap-5 rounded-card-md bg-surface-container-lowest p-6' dir='rtl'>
            <div>
                <h2 className='text-title-md font-medium text-on-surface'>تایید و ثبت نهایی</h2>
                <p className='mt-1 text-label-md text-outline'>
                    جزئیات سفارش را بررسی و با کد پیامک‌شده تایید کنید.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <div className='rounded-card-sm bg-surface-container-high px-4 py-3.5'>
                    <div className='mb-1.5 text-label-sm text-outline'>مشتری</div>
                    <div className='text-label-lg font-bold text-on-surface'>
                        {selectedCustomer?.name ?? '—'}
                    </div>
                </div>
                <div className='rounded-card-sm bg-surface-container-high px-4 py-3.5'>
                    <div className='mb-1.5 text-label-sm text-outline'>تعداد اقلام</div>
                    <div className='text-label-lg font-bold text-on-surface'>
                        {formatFaNumber(cartCount)} قلم
                    </div>
                </div>
                <div className='rounded-card-sm bg-surface-container-high px-4 py-3.5'>
                    <div className='mb-1.5 text-label-sm text-outline'>نوع تسویه</div>
                    <div className='text-label-lg font-bold text-on-surface'>{paymentLabel}</div>
                </div>
                <div className='rounded-card-sm bg-primary-container px-4 py-3.5'>
                    <div className='mb-1.5 text-label-sm text-primary'>مبلغ نهایی</div>
                    <div className='text-title-md font-semibold text-primary'>
                        {formatPrice(finalTotal)}
                    </div>
                </div>
            </div>

            <div className='rounded-card-sm border-[1.5px] border-outline-variant p-5 text-center'>
                <div className='mb-1.5 text-label-lg font-semibold text-on-surface-variant'>
                    کد تایید پیامک‌شده را وارد کنید
                </div>
                <div className='mb-4 text-label-sm text-outline' dir='ltr'>
                    کد ۴ رقمی به شماره ۰۹۱۲ ••• ۲۲۰۱ ارسال شد
                </div>
                <div className='mb-3.5 flex items-center justify-center' dir='ltr'>
                    <InputOTP
                        maxLength={4}
                        value={otpDigits.join('')}
                        onChange={handleOtpChange}
                        containerClassName='justify-center'
                    >
                        <InputOTPGroup>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className='h-[58px] w-[50px] rounded-card-sm border-[1.5px] border-outline-variant bg-surface-container-lowest text-headline-sm font-bold text-on-surface first:rounded-card-sm last:rounded-card-sm'
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <button
                    type='button'
                    className='text-label-sm font-bold text-primary cursor-pointer disabled:cursor-not-allowed disabled:text-outline'
                    disabled={!canResend}
                    onClick={restart}
                >
                    ارسال مجدد کد {resendSeconds !== 0 ? (formatFaNumber(resendSeconds) + ' ثانیه') : ''}
                </button>
            </div>
        </div>
    )
}

export default ConfirmStep
