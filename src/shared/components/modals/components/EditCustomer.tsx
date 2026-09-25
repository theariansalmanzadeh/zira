'use client'

import { useState } from 'react'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import type { BaseModalProps } from '../types'

export type EditCustomerModalData = {
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

export type EditCustomerFormValues = {
    firstName: string
    lastName: string
    gender: string
    username: string
    nationalId: string
    licenseNumber: string
    mobile1: string
    mobile2: string
    landline: string
    referrerName: string
    address: string
}

const GENDER_OPTIONS = [
    { label: 'زن', value: 'female' },
    { label: 'مرد', value: 'male' },
]

const DEFAULT_VALUES: EditCustomerFormValues = {
    firstName: 'آیدا',
    lastName: 'میرزایی',
    gender: 'female',
    username: 'cu-7362',
    nationalId: '0072345689',
    licenseNumber: '0228451',
    mobile1: '+98 912 673 2123',
    mobile2: '+98 935 120 8845',
    landline: '021 2284 5510',
    referrerName: 'بهرام اکبری',
    address: 'تهران، ولنجک، خیابان ۱۹، پلاک ۸، واحد ۳',
}

const EditCustomer = ({ closeModal, data }: BaseModalProps) => {
    const modalData = (data as EditCustomerModalData | null | undefined) ?? {}
    const [values, setValues] = useState<EditCustomerFormValues>({
        firstName: modalData.firstName ?? DEFAULT_VALUES.firstName,
        lastName: modalData.lastName ?? DEFAULT_VALUES.lastName,
        gender: modalData.gender ?? DEFAULT_VALUES.gender,
        username: modalData.username ?? DEFAULT_VALUES.username,
        nationalId: modalData.nationalId ?? DEFAULT_VALUES.nationalId,
        licenseNumber: modalData.licenseNumber ?? DEFAULT_VALUES.licenseNumber,
        mobile1: modalData.mobile1 ?? DEFAULT_VALUES.mobile1,
        mobile2: modalData.mobile2 ?? DEFAULT_VALUES.mobile2,
        landline: modalData.landline ?? DEFAULT_VALUES.landline,
        referrerName: modalData.referrerName ?? DEFAULT_VALUES.referrerName,
        address: modalData.address ?? DEFAULT_VALUES.address,
    })

    const updateField =
        (field: keyof EditCustomerFormValues) => (value: string) => {
            setValues((prev) => ({ ...prev, [field]: value }))
        }

    const handleSave = () => {
        modalData.onSave?.(values)
        closeModal()
    }

    return (
        <div className="flex w-full flex-col gap-5" dir="rtl">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="نام"
                    value={values.firstName}
                    onChange={updateField('firstName')}
                    wrapperClassName="w-full"
                />
                <Input
                    label="نام خانوادگی"
                    value={values.lastName}
                    onChange={updateField('lastName')}
                    wrapperClassName="w-full"
                />
                <FormDropdown
                    label="جنسیت"
                    value={values.gender}
                    options={GENDER_OPTIONS}
                    onChange={updateField('gender')}
                />
                <Input
                    label="نام کاربری"
                    value={values.username}
                    onChange={updateField('username')}
                    dir="ltr"
                    wrapperClassName="w-full"
                />
                <Input
                    label="کد ملی"
                    value={values.nationalId}
                    onChange={updateField('nationalId')}
                    inputMode="numeric"
                    wrapperClassName="w-full"
                />
                <Input
                    label="شماره پروانه کسب"
                    value={values.licenseNumber}
                    onChange={updateField('licenseNumber')}
                    inputMode="numeric"
                    wrapperClassName="w-full"
                />
                <Input
                    label="موبایل ۱"
                    value={values.mobile1}
                    onChange={updateField('mobile1')}
                    dir="ltr"
                    wrapperClassName="w-full"
                />
                <Input
                    label="موبایل ۲"
                    value={values.mobile2}
                    onChange={updateField('mobile2')}
                    dir="ltr"
                    wrapperClassName="w-full"
                />
                <Input
                    label="تلفن ثابت"
                    value={values.landline}
                    onChange={updateField('landline')}
                    wrapperClassName="w-full"
                />
                <Input
                    label="نام معرف"
                    value={values.referrerName}
                    onChange={updateField('referrerName')}
                    wrapperClassName="w-full"
                />
                <div className="col-span-2">
                    <Input
                        label="آدرس"
                        value={values.address}
                        onChange={updateField('address')}
                        wrapperClassName="w-full"
                    />
                </div>
            </div>

            <div className="flex flex-row items-center gap-3 border-t border-outline-variant pt-4">
                <Button type="button" variant="primary" onClick={handleSave}>
                    ذخیره تغییرات
                </Button>
                <Button type="button" variant="outline" onClick={closeModal}>
                    انصراف
                </Button>
            </div>
        </div>
    )
}

export default EditCustomer
