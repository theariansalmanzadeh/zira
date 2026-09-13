'use client'

import { useState, type ChangeEvent } from 'react'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { cn } from '@/src/shared/libs/utils'
import { formatPrice } from '@/src/shared/libs/formatter'
import {
    DURATION_OPTIONS,
    SCOPE_OPTIONS,
    STATUS_OPTIONS,
    type ScopeType,
} from '../constant'
import CodeSpecsCard, { RequiredLabel } from './CodeSpecsCard'
import CustomerLevelFields from './CustomerLevelFields'
import ProductList from './ProductList'
import SelectedCustomerFields from './SelectedCustomerFields'
import AdornedInput from '@/src/shared/components/ui/AdornedInput'

const handleInputChange =
    (setter: (value: string) => void) =>
        (value: string | ChangeEvent<HTMLInputElement>) => {
            setter(typeof value === 'string' ? value : value.target.value)
        }

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-3 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

const AllProductsScopeFields = () => {
    const [minPurchaseQty, setMinPurchaseQty] = useState('0')
    const [minCartAmount, setMinCartAmount] = useState('0')

    return (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <AdornedInput
                label='حداقل تعداد خرید'
                value={minPurchaseQty}
                onChange={setMinPurchaseQty}
                suffix='عدد'
                msg='کمتر از این تعداد، کد اعمال نمی‌شود'
            />
            <AdornedInput
                label='حداقل مبلغ سبد خرید'
                value={minCartAmount}
                onChange={setMinCartAmount}
                suffix='تومان'
            />
        </div>
    )
}

const ScopeCards = () => {
    const [scope, setScope] = useState<ScopeType>('all-products')

    return (
        <div className='flex flex-col gap-4'>
            <RequiredLabel>دامنه اعمال</RequiredLabel>

            <Tabs
                value={scope}
                onValueChange={(value) => setScope(value as ScopeType)}
                dir='rtl'
                className='w-full gap-4'
            >
                <TabsList
                    className={cn(
                        'h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-high p-1.5'
                    )}
                >
                    {SCOPE_OPTIONS.map((option) => (
                        <TabsTrigger
                            key={option.value}
                            value={option.value}
                            className={tabTriggerClassName}
                        >
                            {option.title}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value='all-products' className='mt-2'>
                    <AllProductsScopeFields />
                </TabsContent>

                <TabsContent value='selected-products' className='mt-2'>
                    <ProductList />
                </TabsContent>

                <TabsContent value='selected-customers' className='mt-2'>
                    <SelectedCustomerFields />
                </TabsContent>

                <TabsContent value='customer-level' className='mt-2'>
                    <CustomerLevelFields />
                </TabsContent>
            </Tabs>
        </div>
    )
}

const DiscountFormFields = () => {
    const [discountPercent, setDiscountPercent] = useState('')
    const [maxDiscountCap, setMaxDiscountCap] = useState('')
    const [minPurchaseQty, setMinPurchaseQty] = useState('')
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [duration, setDuration] = useState<string>()
    const [status, setStatus] = useState('active')
    const [useWithOtherDiscounts, setUseWithOtherDiscounts] = useState(true)
    const [useWithDiscountCode, setUseWithDiscountCode] = useState(false)

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-3 gap-6'>
                <div className='flex flex-col'>
                    <label className='mb-1.5 text-label-md text-on-surface-variant'>درصد تخفیف</label>
                    <div className='bg-surface-container-high flex h-10 flex-row items-center gap-1.5 rounded-container-lg px-3'>
                        <input
                            type='text'
                            value={discountPercent}
                            onChange={(event) => setDiscountPercent(event.target.value)}
                            className='w-full bg-transparent text-base text-on-surface outline-none md:text-sm'
                        />
                        <span className='text-outline'>%</span>
                    </div>
                </div>
                <Input
                    label='حداکثر سقف تخفیف (تومان)'
                    placeholder='-'
                    value={formatPrice(Number(maxDiscountCap))}
                    onChange={handleInputChange(setMaxDiscountCap)}
                />
                <Input
                    label='حداقل تعداد خرید'
                    placeholder='-'
                    value={formatPrice(Number(minPurchaseQty))}
                    onChange={handleInputChange(setMinPurchaseQty)}
                />
            </div>

            <div className='grid grid-cols-3 gap-6'>
                <CalendarButton
                    label='زمان شروع'
                    value={startDate}
                    onChange={setStartDate}
                />
                <CalendarButton
                    label='زمان پایان'
                    value={endDate}
                    onChange={setEndDate}
                />
                <FormDropdown
                    label='مدت اعمال'
                    placeholder='انتخاب'
                    value={duration}
                    options={DURATION_OPTIONS}
                    onChange={setDuration}
                />
            </div>

            <div className='grid grid-cols-3 gap-6'>
                <FormDropdown
                    label='وضعیت'
                    value={status}
                    options={STATUS_OPTIONS}
                    onChange={setStatus}
                />
            </div>

            <hr className='border-0 border-t border-dashed border-outline-variant' />

            <div className='flex flex-col gap-6 py-2'>
                <div className='flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-label-lg text-on-surface'>
                            قابل استفاده هم‌زمان با سایر تخفیف‌ها
                        </span>
                        <span className='text-label-md text-outline'>
                            اگر خاموش باشد، بهترین تخفیف اعمال می‌شود
                        </span>
                    </div>
                    <Switch
                        checked={useWithOtherDiscounts}
                        onCheckedChange={setUseWithOtherDiscounts}
                    />
                </div>

                <div className='flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-label-lg text-on-surface'>
                            قابل استفاده هم‌زمان با کد تخفیف
                        </span>
                        <span className='text-label-md text-outline'>ترکیب با کدهای تبلیغاتی</span>
                    </div>
                    <Switch
                        checked={useWithDiscountCode}
                        onCheckedChange={setUseWithDiscountCode}
                    />
                </div>
            </div>
        </div>
    )
}

const DiscountForm = () => {
    return (
        <div className='w-full' dir='rtl'>
            <div className='w-full rounded-card-lg overflow-hidden bg-surface-container-lowest'>
                <Tabs defaultValue='specs' dir='rtl' className='w-full'>
                    <TabsList className='w-full justify-start overflow-x-auto overflow-y-hidden border-b-0!'>
                        <TabsTrigger value='specs' className='border-b-0!'>
                            مشخصات
                        </TabsTrigger>
                        <TabsTrigger value='limits' className='border-b-0!'>
                            محدودیت استفاده
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value='specs' className='flex flex-col gap-3 pt-xl p-6'>
                        <CodeSpecsCard />
                        <div className='rounded-card-lg bg-surface-container-lowest'>
                            <ScopeCards />
                        </div>
                    </TabsContent>

                    <TabsContent value='limits' className='p-6'>
                        <DiscountFormFields />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default DiscountForm
