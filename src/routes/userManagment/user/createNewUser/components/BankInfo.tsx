'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { formatPrice } from '@/src/shared/libs/formatter'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'
import { BANK_OPTIONS } from '@/src/shared/constants/bank'
import { BANK_INFO_FIELDS, type NewUserFormValues } from '../schema'

const toDigits = (value: string) => toEnglishDigits(value).replace(/\D/g, '')

const formatBankValue = (value: string) => {
    const digits = toDigits(value)
    if (!digits) return ''

    return digits
        .split('')
        .map((digit, index) => {
            const formatted = formatPrice(Number(digit))
            const remaining = digits.length - index
            return remaining > 1 && remaining % 3 === 1
                ? `${formatted},`
                : formatted
        })
        .join('')
}

type BankInfoProps = {
    onContinue?: () => void
    onBack?: () => void
}

const BankInfo = ({ onContinue, onBack }: BankInfoProps) => {
    const {
        control,
        trigger,
        formState: { errors },
    } = useFormContext<NewUserFormValues>()

    const handleContinue = async () => {
        const isValid = await trigger([...BANK_INFO_FIELDS])
        if (isValid) {
            onContinue?.()
        }
    }

    return (
        <div className='flex flex-col gap-6' dir='rtl'>
            <div className='flex flex-col gap-3'>
                <span className='text-label-lg text-on-surface'>
                    اطلاعات بانکی
                </span>
                <div className='rounded-card-md bg-surface-container-lowest p-6'>
                    <div className='grid grid-cols-2 gap-6'>
                        <Controller
                            name='bankName'
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label='نام بانک *'
                                    value={field.value || undefined}
                                    options={BANK_OPTIONS}
                                    onChange={field.onChange}
                                    placeholder='انتخاب بانک'
                                />
                            )}
                        />
                        <Controller
                            name='accountNumber'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label='شماره حساب *'
                                    placeholder='شماره حساب'
                                    value={formatBankValue(field.value)}
                                    onChange={(value) => field.onChange(toDigits(value))}
                                    inputMode='numeric'
                                    error={!!errors.accountNumber}
                                    msg={errors.accountNumber?.message}
                                />
                            )}
                        />
                        <Controller
                            name='cardNumber'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label='شماره کارت *'
                                    placeholder='۱۶ رقم'
                                    value={formatBankValue(field.value)}
                                    onChange={(value) => field.onChange(toDigits(value))}
                                    inputMode='numeric'
                                    error={!!errors.cardNumber}
                                    msg={errors.cardNumber?.message}
                                />
                            )}
                        />
                        <Controller
                            name='shebaNumber'
                            control={control}
                            render={({ field }) => (
                                <div className='flex flex-col'>
                                    <span className='mb-1.5 text-label-md text-on-surface-variant'>
                                        شماره شبا *
                                    </span>
                                    <div className='flex flex-row items-start gap-2'>
                                        <Input
                                            containerClassName='min-w-0 flex-1'
                                            placeholder='۲۴ رقم'
                                            dir='ltr'
                                            value={formatBankValue(
                                                field.value.replace(/^IR/i, '')
                                            )}
                                            onChange={(value) =>
                                                field.onChange(
                                                    toDigits(value).replace(
                                                        /^IR/i,
                                                        ''
                                                    )
                                                )
                                            }
                                            error={!!errors.shebaNumber}
                                            msg={errors.shebaNumber?.message}
                                        />
                                        <div className='flex shrink-0 items-center rounded-container-lg px-3 py-3 text-label-lg text-on-surface'>
                                            IR
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>

            {onContinue ? (
                <div className='flex flex-row-reverse gap-3'>
                    <Button
                        type='button'
                        variant='primary'
                        size='lg'
                        className='w-full text-label-lg'
                        onClick={handleContinue}
                    >
                        ادامه
                    </Button>
                    {onBack ? (
                        <Button
                            type='button'
                            variant='outline'
                            size='lg'
                            className='text-label-lg'
                            onClick={onBack}
                        >
                            بازگشت
                        </Button>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}

export default BankInfo
