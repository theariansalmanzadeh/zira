'use client'

import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import type { BundlePolicy } from '@/src/api/types/admin/catalog'
import { useBundle } from '../provider'

const BUNDLE_POLICY_OPTIONS: { value: BundlePolicy; label: string }[] = [
    {
        value: 'SLOW_WITH_FAST',
        label: 'فروش اقلام کم‌گردش همراه پرفروش',
    },
    {
        value: 'GIFT_PACK',
        label: 'پک هدیه مناسبتی',
    },
    {
        value: 'SEASON_CLEARANCE',
        label: 'تسویه موجودی پایان فصل',
    },
    {
        value: 'BASKET_BOOST',
        label: 'افزایش سبد خرید',
    },
]

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4 flex items-center gap-2">
        <span className="h-4 w-1 shrink-0 rounded-full bg-primary" />
        <h3 className="text-title-md font-bold text-on-surface">{children}</h3>
    </div>
)

const Form = () => {
    const {
        name,
        setName,
        code,
        policy,
        setPolicy,
        description,
        setDescription,
        isEditing,
    } = useBundle()

    return (
        <div
            className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
        >
            <SectionTitle>مشخصات باندل</SectionTitle>

            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                        label="نام باندل *"
                        value={name}
                        onChange={setName}
                        placeholder="مثال: پک راحتی زمستانه"
                    />
                    <Input
                        label="کد باندل"
                        value={code}
                        readOnly
                        disabled={isEditing}
                        className="text-outline"
                    />
                </div>

                <FormDropdown
                    label="سیاست باندل"
                    placeholder="انتخاب سیاست"
                    value={policy}
                    options={BUNDLE_POLICY_OPTIONS}
                    onChange={(val) => setPolicy(val as BundlePolicy)}
                />

                <div className="flex flex-col gap-1.5">
                    <label className="text-label-md text-on-surface-variant">
                        توضیحات
                    </label>
                    <Textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="توضیح کوتاه درباره این پک و منطق قیمت‌گذاری آن"
                        className="min-h-28"
                    />
                </div>
            </div>
        </div>
    )
}

export default Form
