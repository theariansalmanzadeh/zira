'use client'

import { useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import {
    useGetCustomerProfile,
    useUpdateCustomerProfile,
} from '@/src/routes/customers/hooks/customers'
import type { CustomerProfile } from '@/src/api/types/admin/customers'
import type { BaseModalProps } from '../types'
import {
    editCustomerSchema,
    type EditCustomerFormValues,
} from './editCustomer/schema'

export type { EditCustomerFormValues }
export { editCustomerSchema }

export type EditCustomerModalData = {
    customerId?: string
    firstName?: string
    lastName?: string
    gender?: string
    username?: string
    nationalId?: string
    licenseNumber?: string
    mobile1?: string
    mobile2?: string
    landline?: string
    referrerName?: string
    address?: string
    onSave?: (values: EditCustomerFormValues) => void
}

const GENDER_OPTIONS = [
    { label: 'زن', value: 'female' },
    { label: 'مرد', value: 'male' },
]

const mapProfileToFormValues = (
    profile?: CustomerProfile | null,
    modalData?: EditCustomerModalData
): EditCustomerFormValues => {
    const [managerFirstName = '', ...managerLastNameParts] = (
        profile?.manager_name ?? ''
    ).split(' ')
    const managerLastName = managerLastNameParts.join(' ')

    const rawGender = (
        profile?.identity?.gender ??
        modalData?.gender ??
        ''
    ).toLowerCase()
    const gender =
        rawGender === 'male' || rawGender === 'مرد' ? 'male' : 'female'

    return {
        firstName:
            profile?.identity?.first_name ||
            managerFirstName ||
            modalData?.firstName ||
            '',
        lastName:
            profile?.identity?.last_name ||
            managerLastName ||
            modalData?.lastName ||
            '',
        gender,
        username: profile?.code || modalData?.username || '',
        nationalId:
            profile?.identity?.national_id || modalData?.nationalId || '',
        licenseNumber:
            profile?.business_license_no || modalData?.licenseNumber || '',
        mobile1:
            profile?.phone ||
            profile?.identity?.mobile ||
            modalData?.mobile1 ||
            '',
        mobile2: profile?.mobile_2 || modalData?.mobile2 || '',
        landline: profile?.phone || modalData?.landline || '',
        referrerName: profile?.referrer_name || modalData?.referrerName || '',
        address: profile?.store_name || modalData?.address || '',
    }
}

const EditCustomer = ({ closeModal, data }: BaseModalProps) => {
    const params = useParams<{ id: string }>()
    const modalData = useMemo(
        () => (data as EditCustomerModalData | null | undefined) ?? {},
        [data]
    )
    const customerId = modalData.customerId || params?.id || ''

    const { data: profile } = useGetCustomerProfile(
        customerId,
        Boolean(customerId)
    )
    const { mutate: updateProfile, isPending: isUpdating } =
        useUpdateCustomerProfile()

    const initialDefaultValues = useMemo(
        () => mapProfileToFormValues(profile, modalData),
        [profile, modalData]
    )

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm({
        resolver: zodResolver(editCustomerSchema),
        defaultValues: initialDefaultValues,
    })

    useEffect(() => {
        if (profile) {
            reset(mapProfileToFormValues(profile, modalData))
        }
    }, [profile, reset, modalData])

    const onSubmit = (formValues: EditCustomerFormValues) => {
        if (!customerId) {
            modalData.onSave?.(formValues)
            closeModal()
            return
        }

        const managerName =
            `${formValues.firstName} ${formValues.lastName}`.trim()

        updateProfile(
            {
                customerId,
                body: {
                    manager_name: managerName,
                    store_name: formValues.address,
                    business_license_no: formValues.licenseNumber,
                    phone: formValues.mobile1 || formValues.landline,
                    mobile_2: formValues.mobile2,
                    referrer_name: formValues.referrerName,
                    expected_version: profile?.version ?? 1,
                },
            },
            {
                onSuccess: () => {
                    modalData.onSave?.(formValues)
                    closeModal()
                },
            }
        )
    }

    const isPending = isUpdating || isSubmitting

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-5"
            dir="rtl"
        >
            <div className="grid grid-cols-2 gap-4">
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label="نام"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                            wrapperClassName="w-full"
                        />
                    )}
                />
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label="نام خانوادگی"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                            wrapperClassName="w-full"
                        />
                    )}
                />
                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label="جنسیت"
                            value={field.value}
                            options={GENDER_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    name="username"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label="نام کاربری"
                            value={field.value}
                            onChange={field.onChange}
                            dir="ltr"
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                            wrapperClassName="w-full"
                        />
                    )}
                />
                <Controller
                    name="nationalId"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label="کد ملی"
                            value={field.value}
                            onChange={field.onChange}
                            inputMode="numeric"
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                            wrapperClassName="w-full"
                        />
                    )}
                />
                <Controller
                    name="licenseNumber"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label="شماره پروانه کسب"
                            value={field.value}
                            onChange={field.onChange}
                            inputMode="numeric"
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                            wrapperClassName="w-full"
                        />
                    )}
                />
                <Controller
                    name="mobile1"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label="موبایل ۱"
                            value={field.value}
                            onChange={field.onChange}
                            dir="ltr"
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                            wrapperClassName="w-full"
                        />
                    )}
                />
                <Controller
                    name="mobile2"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label="موبایل ۲"
                            value={field.value}
                            onChange={field.onChange}
                            dir="ltr"
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                            wrapperClassName="w-full"
                        />
                    )}
                />
                <Controller
                    name="landline"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label="تلفن ثابت"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                            wrapperClassName="w-full"
                        />
                    )}
                />
                <Controller
                    name="referrerName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label="نام معرف"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                            wrapperClassName="w-full"
                        />
                    )}
                />
                <div className="col-span-2">
                    <Controller
                        name="address"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                label="آدرس"
                                value={field.value}
                                onChange={field.onChange}
                                error={Boolean(fieldState.error)}
                                msg={fieldState.error?.message}
                                wrapperClassName="w-full"
                            />
                        )}
                    />
                </div>
            </div>

            <div className="flex flex-row items-center gap-3 border-t border-outline-variant pt-4">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isPending}
                    isLoading={isPending}
                >
                    ذخیره تغییرات
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
        </form>
    )
}

export default EditCustomer
