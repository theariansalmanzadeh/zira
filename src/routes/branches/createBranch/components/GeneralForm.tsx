'use client'

import { Dispatch, SetStateAction, type ChangeEvent } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown, {
    type FormDropdownOption,
} from '@/src/shared/components/ui/FormDropdown'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { useCreateBranchContext } from '../provider/CreateBranchProvider'

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

type FormSectionProps = {
    title: string
    children: React.ReactNode
}

const FormSection = ({ title, children }: FormSectionProps) => (
    <div className="flex flex-col gap-3">
        <span className="text-label-lg font-bold text-outline">{title}</span>
        <div className="grid grid-cols-2 gap-6">{children}</div>
    </div>
)

type GeneralFormProps = {
    setActiveStep?: Dispatch<SetStateAction<number>>
}

const GeneralForm = ({ setActiveStep: propSetActiveStep }: GeneralFormProps) => {
    const {
        generalData,
        updateGeneralData,
        setActiveStep: contextSetActiveStep,
    } = useCreateBranchContext()

    const setActiveStep = propSetActiveStep || contextSetActiveStep

    const handleInputChange =
        (field: keyof typeof generalData) =>
            (value: string | ChangeEvent<HTMLInputElement>) => {
                const nextVal = typeof value === 'string' ? value : value.target.value
                updateGeneralData({ [field]: nextVal })
            }

    return (
        <div
            className="flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6"
            dir="rtl"
        >
            <FormSection title="عمومی">
                <Input
                    label="نام شعبه"
                    placeholder="نام شعبه"
                    value={generalData.branchName}
                    onChange={handleInputChange('branchName')}
                />
                <div className="flex flex-col">
                    <span className="mb-1.5 text-label-md text-on-surface-variant">
                        کد شعبه
                    </span>
                    <CopyableInput
                        value={generalData.branchCode}
                        onChange={handleInputChange('branchCode')}
                        onCopy={() => { }}
                        readOnly={false}
                        groupClassName="bg-surface-container-high! h-10 rounded-container-lg border-0"
                    />
                </div>
                <FormDropdown
                    label="مسئول شعبه"
                    value={generalData.branchManager}
                    options={MANAGER_OPTIONS}
                    onChange={(branchManager) =>
                        updateGeneralData({ branchManager })
                    }
                />
                <CalendarButton
                    label="تاریخ شروع فعالیت"
                    placeholder="انتخاب تاریخ"
                    value={generalData.activityStartDate}
                    onChange={(date) =>
                        updateGeneralData({ activityStartDate: date })
                    }
                />
            </FormSection>

            <FormSection title="نشانی">
                <FormDropdown
                    label="شهر"
                    value={generalData.city}
                    options={CITY_OPTIONS}
                    onChange={(city) => updateGeneralData({ city })}
                />
                <FormDropdown
                    label="استان"
                    value={generalData.province}
                    options={PROVINCE_OPTIONS}
                    onChange={(province) => updateGeneralData({ province })}
                />
                <div className="col-span-2">
                    <Input
                        label="آدرس پستی"
                        value={generalData.postalAddress}
                        onChange={handleInputChange('postalAddress')}
                    />
                </div>
                <Input
                    label="پلاک"
                    value={generalData.plaque}
                    onChange={handleInputChange('plaque')}
                />
                <Input
                    label="واحد"
                    value={generalData.unit}
                    onChange={handleInputChange('unit')}
                />
                <Input
                    label="کد پستی"
                    value={generalData.postalCode}
                    onChange={handleInputChange('postalCode')}
                />
                <Input
                    label="تلفن ثابت"
                    placeholder={PHONE_PLACEHOLDER}
                    value={generalData.landlinePhone}
                    onChange={handleInputChange('landlinePhone')}
                />
                {/* <div className="col-span-2 flex flex-col gap-1.5">
                    <span className="text-label-md text-on-surface-variant">
                        انتخاب موقعیت روی نقشه *
                    </span>
                    <div className="min-h-48 w-full rounded-container-lg bg-surface-container-high" />
                </div> */}
            </FormSection>

            <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-full text-label-lg"
                onClick={() => setActiveStep(2)}
            >
                ادامه
            </Button>
        </div>
    )
}

export default GeneralForm
