'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { BANK_OPTIONS } from '../constants'
import { BANK_INFO_FIELDS, type NewUserFormValues } from '../schema'

type BankInfoProps = {
    onContinue?: () => void
}

const BankInfo = ({ onContinue }: BankInfoProps) => {
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
                                    value={field.value}
                                    onChange={field.onChange}
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
                                    value={field.value}
                                    onChange={field.onChange}
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
                                <Input
                                    label='شماره شبا *'
                                    placeholder='IR...'
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.shebaNumber}
                                    msg={errors.shebaNumber?.message}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            {onContinue ? (
                <Button
                    type='button'
                    variant='primary'
                    size='lg'
                    className='w-full text-label-lg'
                    onClick={handleContinue}
                >
                    ادامه
                </Button>
            ) : null}
        </div>
    )
}

export default BankInfo
