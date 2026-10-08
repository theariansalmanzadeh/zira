'use client'

import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { Controller, useFormContext } from 'react-hook-form'
import {
    EDUCATION_OPTIONS,
    GENDER_OPTIONS,
    MARITAL_STATUS_OPTIONS,
} from '../constants'
import { IDENTITY_FIELDS, type NewUserFormValues } from '../schema'

type IdentityFormProps = {
    onContinue?: () => void
}

const IdentityForm = ({ onContinue }: IdentityFormProps) => {
    const {
        control,
        trigger,
        formState: { errors },
    } = useFormContext<NewUserFormValues>()

    const handleContinue = async () => {
        const isValid = await trigger([...IDENTITY_FIELDS])
        if (isValid) {
            onContinue?.()
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <span className="text-label-lg text-on-surface">
                    اطلاعات هویتی
                </span>
                <div className="rounded-card-md bg-surface-container-lowest p-6">
                    <div className="grid grid-cols-2 gap-6 items-end">
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="نام *"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.firstName}
                                    msg={errors.firstName?.message}
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="نام خانوادگی *"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.lastName}
                                    msg={errors.lastName?.message}
                                />
                            )}
                        />
                        <Controller
                            name="nationalId"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="کد ملی *"
                                    value={field.value}
                                    onChange={field.onChange}
                                    inputMode="numeric"
                                    error={!!errors.nationalId}
                                    msg={errors.nationalId?.message}
                                />
                            )}
                        />
                        <Controller
                            name="birthCertificateNumber"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="شماره شناسنامه *"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.birthCertificateNumber}
                                    msg={errors.birthCertificateNumber?.message}
                                />
                            )}
                        />
                        <Controller
                            name="placeOfIssue"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="محل صدور *"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.placeOfIssue}
                                    msg={errors.placeOfIssue?.message}
                                />
                            )}
                        />
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="جنسیت *"
                                    value={field.value}
                                    options={GENDER_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="fatherName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="نام پدر *"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.fatherName}
                                    msg={errors.fatherName?.message}
                                />
                            )}
                        />
                        <Controller
                            name="birthDate"
                            control={control}
                            render={({ field }) => (
                                <CalendarButton
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
                        <Controller
                            name="maritalStatus"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="وضعیت تاهل *"
                                    value={field.value}
                                    options={MARITAL_STATUS_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="childrenCount"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="تعداد فرزند *"
                                    type="number"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.childrenCount}
                                    msg={errors.childrenCount?.message}
                                />
                            )}
                        />
                        <Controller
                            name="education"
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label="آخرین مدرک تحصیلی *"
                                    value={field.value}
                                    options={EDUCATION_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="socialSecurityNumber"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="شماره تامین اجتماعی"
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                    error={!!errors.socialSecurityNumber}
                                    msg={errors.socialSecurityNumber?.message}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            {onContinue ? (
                <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="w-full text-label-lg"
                    onClick={handleContinue}
                >
                    ادامه
                </Button>
            ) : null}
        </div>
    )
}

export default IdentityForm
