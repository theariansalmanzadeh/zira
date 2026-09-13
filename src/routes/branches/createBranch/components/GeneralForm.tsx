"use client"

import { Dispatch, SetStateAction, useState, type ChangeEvent } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown, {
    type FormDropdownOption,
} from '@/src/shared/components/ui/FormDropdown'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import { Calendar } from '@/src/shared/components/ui/Calendar'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'

const MANAGER_OPTIONS: FormDropdownOption[] = [
    { label: 'نام کاربر ۱', value: 'user-1' },
    { label: 'نام کاربر ۲', value: 'user-2' },
    { label: 'نام کاربر ۳', value: 'user-3' },
]

const PROVINCE_OPTIONS: FormDropdownOption[] = [
    { label: 'تهران', value: 'tehran' },
    { label: 'اصفهان', value: 'isfahan' },
    { label: 'فارس', value: 'fars' },
]

const CITY_OPTIONS: FormDropdownOption[] = [
    { label: 'تهران', value: 'tehran' },
    { label: 'کرج', value: 'karaj' },
    { label: 'شیراز', value: 'shiraz' },
]

const PHONE_PLACEHOLDER = '+98 --- ---- ---'
const BRANCH_CODE = 'BR-5318_92'

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
    <div className='flex flex-col gap-3'>
        <span className='text-label-lg font-bold text-outline'>{title}</span>
        <div className='grid grid-cols-2 gap-6'>{children}</div>
    </div>
)

const GeneralForm = ({ setActiveStep }: { setActiveStep: Dispatch<SetStateAction<number>> }) => {
    const [branchName, setBranchName] = useState('')
    const [branchManager, setBranchManager] = useState<string>()
    const [activityStartDate, setActivityStartDate] = useState('')
    const [province, setProvince] = useState<string>()
    const [city, setCity] = useState<string>()
    const [postalAddress, setPostalAddress] = useState('')
    const [plaque, setPlaque] = useState('')
    const [unit, setUnit] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [landlinePhone, setLandlinePhone] = useState('')

    return (
        <div className='flex flex-col gap-6 bg-surface-container-lowest p-6 rounded-card-md' dir='rtl'>
            <FormSection title='عمومی'>
                <Input
                    label='نام شعبه'
                    placeholder='نام شعبه'
                    value={branchName}
                    onChange={handleInputChange(setBranchName)}
                />
                <div className='flex flex-col'>
                    <span className='mb-1.5 text-label-md text-on-surface-variant'>
                        کد شعبه
                    </span>
                    <CopyableInput
                        value={BRANCH_CODE}
                        onCopy={() => { }}
                        readOnly
                        groupClassName='bg-surface-container-high h-10 rounded-container-lg border-0'
                    />
                </div>
                <FormDropdown
                    label='مسئول شعبه'
                    value={branchManager}
                    options={MANAGER_OPTIONS}
                    onChange={setBranchManager}
                />
                <CalendarButton
                    label='تاریخ شروع فعالیت'
                    placeholder='انتخاب تاریخ'

                />
            </FormSection>

            <FormSection title='نشانی'>
                <FormDropdown
                    label='شهر'
                    value={city}
                    options={CITY_OPTIONS}
                    onChange={setCity}
                />
                <FormDropdown
                    label='استان'
                    value={province}
                    options={PROVINCE_OPTIONS}
                    onChange={setProvince}
                />
                <div className='col-span-2'>
                    <Input
                        label='آدرس پستی'
                        value={postalAddress}
                        onChange={handleInputChange(setPostalAddress)}
                    />
                </div>
                <Input
                    label='پلاک'
                    value={plaque}
                    onChange={handleInputChange(setPlaque)}
                />
                <Input
                    label='واحد'
                    value={unit}
                    onChange={handleInputChange(setUnit)}
                />
                <Input
                    label='کد پستی'
                    value={postalCode}
                    onChange={handleInputChange(setPostalCode)}
                />
                <Input
                    label='تلفن ثابت'
                    placeholder={PHONE_PLACEHOLDER}
                    value={landlinePhone}
                    onChange={handleInputChange(setLandlinePhone)}
                />
                <div className='col-span-2 flex flex-col gap-1.5'>
                    <span className='text-label-md text-on-surface-variant'>
                        انتخاب موقعیت روی نقشه *
                    </span>
                    <div className='bg-surface-container-high min-h-48 w-full rounded-container-lg' />
                </div>
            </FormSection>

            <Button
                type='button'
                variant='primary'
                size='lg'
                className='w-full text-label-lg'
                onClick={() => setActiveStep(2)}
            >
                ادامه
            </Button>
        </div>
    )
}

export default GeneralForm
