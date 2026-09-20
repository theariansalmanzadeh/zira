'use client'

import {
    type Dispatch,
    type SetStateAction,
    useState,
    type ChangeEvent,
} from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { Button } from '@/src/shared/components/ui/button'
import {
    INSURANCE_STATUS_OPTIONS,
    MANAGER_OPTIONS,
    WAREHOUSE_STATUS_OPTIONS,
} from '../constants'

const handleInputChange =
    (setter: (value: string) => void) =>
        (value: string | ChangeEvent<HTMLInputElement>) => {
            setter(typeof value === 'string' ? value : value.target.value)
        }

type FormSectionProps = {
    title: string
    children: React.ReactNode
}

const FormSection = ({ title, children }: FormSectionProps) => (
    <div className='flex flex-col gap-4'>
        <h2 className='text-title-md font-semibold text-on-surface'>{title}</h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>{children}</div>
    </div>
)

type ManagerFormProps = {
    setActiveStep: Dispatch<SetStateAction<number>>
}

const ManagerForm = ({ setActiveStep }: ManagerFormProps) => {
    const [managerId, setManagerId] = useState<string>()
    const [managerMobile, setManagerMobile] = useState('')
    const [managerAddress, setManagerAddress] = useState('')
    const [insuranceStatus, setInsuranceStatus] = useState('insured')
    const [insuranceNumber, setInsuranceNumber] = useState('INS-40128')
    const [insuranceExpiry, setInsuranceExpiry] = useState<Date | undefined>(
        new Date('2027-01-21')
    )
    const [warehouseStatus, setWarehouseStatus] = useState('active')

    return (
        <div
            className='flex flex-col gap-8 rounded-card-md bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <FormSection title='مسئول انبار'>
                <FormDropdown
                    label='نام مسئول انبار'
                    placeholder='انتخاب کاربر'
                    value={managerId}
                    options={MANAGER_OPTIONS}
                    onChange={setManagerId}
                />
                <Input
                    label='موبایل مسئول انبار'
                    placeholder='+98 912 000 0000'
                    value={managerMobile}
                    onChange={handleInputChange(setManagerMobile)}
                />
                <div className='col-span-1 flex flex-col sm:col-span-2'>
                    <label className='mb-1.5 text-label-md text-on-surface-variant'>
                        آدرس مسئول انبار
                    </label>
                    <Textarea
                        placeholder='آدرس محل سکونت مسئول انبار'
                        value={managerAddress}
                        onChange={(event) =>
                            setManagerAddress(event.target.value)
                        }
                        className='min-h-28 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-3'
                    />
                </div>
            </FormSection>

            <FormSection title='بیمه و وضعیت'>
                <FormDropdown
                    label='وضعیت بیمه'
                    placeholder='انتخاب'
                    value={insuranceStatus}
                    options={INSURANCE_STATUS_OPTIONS}
                    onChange={setInsuranceStatus}
                />
                <Input
                    label='شماره بیمه‌نامه'
                    placeholder='INS-40128'
                    value={insuranceNumber}
                    onChange={handleInputChange(setInsuranceNumber)}
                />
                <CalendarButton
                    label='تاریخ انقضای بیمه'
                    value={insuranceExpiry}
                    onChange={setInsuranceExpiry}
                />
                <FormDropdown
                    label='وضعیت انبار'
                    placeholder='انتخاب'
                    value={warehouseStatus}
                    options={WAREHOUSE_STATUS_OPTIONS}
                    onChange={setWarehouseStatus}
                />
            </FormSection>

            <div className='flex gap-3'>
                <Button
                    type='button'
                    variant='primary'
                    size='lg'
                    className='w-full text-label-lg'
                    onClick={() => setActiveStep(3)}
                >
                    ادامه
                </Button>
                <Button
                    type='button'
                    variant='outline'
                    size='lg'
                    className='text-label-lg'
                    onClick={() => setActiveStep(1)}
                >
                    بازگشت
                </Button>
            </div>
        </div>
    )
}

export default ManagerForm
