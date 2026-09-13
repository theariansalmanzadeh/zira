'use client'

import { useId, useState } from 'react'
import AdornedInput from '@/src/shared/components/ui/AdornedInput'
import { Input } from '@/src/shared/components/ui/Input'
import { Tabs, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { cn } from '@/src/shared/libs/utils'
import { CODE_TYPE_TABS, type CodeType } from '../constant'

export const RequiredLabel = ({
    htmlFor,
    children,
}: {
    htmlFor?: string
    children: React.ReactNode
}) => (
    <label
        htmlFor={htmlFor}
        className='mb-1.5 text-label-md text-on-surface-variant'
    >
        {children} <span className='text-error'>*</span>
    </label>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className='mb-4 flex items-center gap-2'>
        <span className='h-4 w-1 shrink-0 rounded-full bg-primary' />
        <h3 className='text-title-md font-bold text-on-surface'>{children}</h3>
    </div>
)

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-3 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

const CodeSpecsCard = () => {
    const codeInputId = useId()
    const [discountCode, setDiscountCode] = useState('WELCOME15')
    const [codeType, setCodeType] = useState<CodeType>('free-shipping')
    const [amount, setAmount] = useState('15')
    const [minCartAmount, setMinCartAmount] = useState('0')

    const amountSuffix = codeType === 'amount' ? 'تومان' : '%'

    return (
        <div className='rounded-card-lg bg-surface-container-lowest'>
            <SectionTitle>مشخصات کد</SectionTitle>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div className='flex flex-col'>
                    <RequiredLabel htmlFor={codeInputId}>کد تخفیف</RequiredLabel>
                    <Input
                        id={codeInputId}
                        value={discountCode}
                        onChange={setDiscountCode}
                        msg='فقط حروف و اعداد انگلیسی'
                    />
                </div>

                <div className='flex flex-col'>
                    <RequiredLabel>نوع</RequiredLabel>
                    <Tabs
                        value={codeType}
                        onValueChange={(value) => setCodeType(value as CodeType)}
                        dir='rtl'
                        className='w-full gap-0'
                    >
                        <TabsList
                            className={cn(
                                'h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-high p-1.5'
                            )}
                        >
                            {CODE_TYPE_TABS.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={tabTriggerClassName}
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                <AdornedInput
                    label='مقدار'
                    required
                    value={amount}
                    onChange={setAmount}
                    suffix={amountSuffix}
                />

                <AdornedInput
                    label='حداقل مبلغ سبد'
                    value={minCartAmount}
                    onChange={setMinCartAmount}
                    suffix='تومان'
                />
            </div>
        </div>
    )
}

export default CodeSpecsCard
