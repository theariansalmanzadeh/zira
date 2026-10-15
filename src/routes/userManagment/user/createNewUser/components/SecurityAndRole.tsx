'use client'

import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { formatFaDate } from '@/src/shared/libs/formatter'
import { useListRoles } from '@/src/routes/userManagment/hooks/role'
import {
    ACCOUNT_STATUS_OPTIONS,
    USER_TYPE_OPTIONS,
} from '../constants'
import { SECURITY_AND_ROLE_FIELDS, type NewUserFormValues } from '../schema'

type SecurityAndRoleProps = {
    onContinue?: () => void
}

const FieldHint = ({ children }: { children: React.ReactNode }) => (
    <span className='mt-1.5 text-label-sm text-outline'>{children}</span>
)

const SecurityAndRole = ({ onContinue }: SecurityAndRoleProps) => {
    const {
        control,
        trigger,
        formState: { errors },
    } = useFormContext<NewUserFormValues>()
    const { data: roles } = useListRoles({ is_active: true })
    const roleOptions = useMemo(
        () =>
            (roles?.results ?? []).map((role) => ({
                label: role.name,
                value: role.id,
            })),
        [roles]
    )

    const handleContinue = async () => {
        const isValid = await trigger([...SECURITY_AND_ROLE_FIELDS])
        if (isValid) {
            onContinue?.()
        }
    }

    return (
        <div className='flex flex-col gap-6' dir='rtl'>
            <div className='flex flex-col gap-3'>
                <span className='text-label-lg text-on-surface'>
                    امنیت و نقش
                </span>
                <div className='rounded-card-md bg-surface-container-lowest p-6'>
                    <div className='grid grid-cols-3 gap-6'>
                        <Controller
                            name='username'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label='نام کاربری *'
                                    placeholder='نام کاربری'
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.username}
                                    msg={errors.username?.message}
                                />
                            )}
                        />
                        <Controller
                            name='initialPassword'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label='رمز عبور اولیه *'
                                    type='password'
                                    placeholder='حداقل ۸ کاراکتر'
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.initialPassword}
                                    msg={errors.initialPassword?.message}
                                />
                            )}
                        />
                        <Controller
                            name='userType'
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label='نوع کاربر *'
                                    value={field.value || undefined}
                                    options={USER_TYPE_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <div className='flex flex-col'>
                            <Controller
                                name='userRole'
                                control={control}
                                render={({ field }) => (
                                    <FormDropdown
                                        label='نقش کاربر *'
                                        value={field.value || undefined}
                                        options={roleOptions}
                                        onChange={field.onChange}
                                        placeholder='انتخاب نقش'
                                    />
                                )}
                            />
                            <FieldHint>
                                هر کاربر فقط یک نقش می‌تواند داشته باشد؛ نقش
                                سراسری است و شعبه ندارد.
                            </FieldHint>
                        </div>

                        <div className='flex flex-col'>
                            <Controller
                                name='roleExpirationDate'
                                control={control}
                                render={({ field }) => (
                                    <CalendarButton
                                        label='تاریخ انقضای نقش (اختیاری)'
                                        placeholder='مثلاً ۱۴۰۵/۰۶/۳۱'
                                        value={
                                            field.value
                                                ? new Date(field.value)
                                                : undefined
                                        }
                                        onChange={(date) =>
                                            field.onChange(
                                                date ? date.toISOString() : ''
                                            )
                                        }
                                    />
                                )}
                            />
                            <FieldHint>
                                در صورت خالی گذاشتن، نقش دائمی است.
                            </FieldHint>
                        </div>

                        <Controller
                            name='initialAccountStatus'
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label='وضعیت اولیه حساب *'
                                    value={field.value || undefined}
                                    options={ACCOUNT_STATUS_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <div className='flex flex-col'>
                            <Controller
                                name='accountCreationDate'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label='تاریخ ایجاد حساب'
                                        value={
                                            field.value
                                                ? formatFaDate(field.value, {
                                                      timeZone: 'UTC',
                                                  })
                                                : ''
                                        }
                                        onChange={() => {}}
                                        disabled
                                    />
                                )}
                            />
                            <FieldHint>به‌صورت خودکار ثبت می‌شود.</FieldHint>
                        </div>
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

export default SecurityAndRole
