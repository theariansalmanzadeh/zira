'use client'

import { Controller, useFormContext } from 'react-hook-form'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { cn } from '@/src/shared/libs/utils'
import {
    DURATION_OPTIONS,
    SCOPE_OPTIONS,
    STATUS_OPTIONS,
    type ScopeType,
} from '../constant'
import CodeSpecsCard from './CodeSpecsCard'
import CustomerLevelFields from './CustomerLevelFields'
import ProductList from './ProductList'
import SelectedCustomerFields from './SelectedCustomerFields'
import AdornedInput from '@/src/shared/components/ui/AdornedInput'
import type { NewDiscountFormValues } from '../schema'

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-3 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

const AllProductsScopeFields = () => {
    const { control } = useFormContext<NewDiscountFormValues>()

    return (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <Controller
                control={control}
                name='scopeMinPurchaseQty'
                render={({ field }) => (
                    <AdornedInput
                        label='حداقل تعداد خرید'
                        value={field.value}
                        onChange={field.onChange}
                        suffix='عدد'
                        msg='کمتر از این تعداد، کد اعمال نمی‌شود'
                    />
                )}
            />
            <Controller
                control={control}
                name='scopeMinCartAmount'
                render={({ field }) => (
                    <AdornedInput
                        label='حداقل مبلغ سبد خرید'
                        value={field.value}
                        onChange={field.onChange}
                        suffix='تومان'
                    />
                )}
            />
        </div>
    )
}

const ScopeCards = () => {
    const { control } = useFormContext<NewDiscountFormValues>()

    return (
        <Controller
            control={control}
            name='scope'
            render={({ field }) => (
                <div className='flex flex-col gap-4'>
                    <span className='mb-1.5 text-label-md text-on-surface-variant'>
                        دامنه اعمال <span className='text-error'>*</span>
                    </span>

                    <Tabs
                        value={field.value}
                        onValueChange={(value) => field.onChange(value as ScopeType)}
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
            )}
        />
    )
}

const DiscountFormFields = () => {
    const { control } = useFormContext<NewDiscountFormValues>()

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-3 gap-6'>
                <Controller
                    control={control}
                    name='discountPercent'
                    render={({ field }) => (
                        <div className='flex flex-col'>
                            <label className='mb-1.5 text-label-md text-on-surface-variant'>
                                درصد تخفیف
                            </label>
                            <div className='flex h-10 flex-row items-center gap-1.5 rounded-container-lg bg-surface-container-high px-3'>
                                <input
                                    type='text'
                                    value={field.value}
                                    onChange={(event) =>
                                        field.onChange(event.target.value)
                                    }
                                    className='w-full bg-transparent text-base text-on-surface outline-none md:text-sm'
                                />
                                <span className='text-outline'>%</span>
                            </div>
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name='maxDiscountCap'
                    render={({ field }) => (
                        <Input
                            label='حداکثر سقف تخفیف (تومان)'
                            placeholder='-'
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='minPurchaseQty'
                    render={({ field }) => (
                        <Input
                            label='حداقل تعداد خرید'
                            placeholder='-'
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <div className='grid grid-cols-3 gap-6'>
                <Controller
                    control={control}
                    name='startDate'
                    render={({ field }) => (
                        <CalendarButton
                            label='زمان شروع'
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='endDate'
                    render={({ field }) => (
                        <CalendarButton
                            label='زمان پایان'
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='duration'
                    render={({ field }) => (
                        <FormDropdown
                            label='مدت اعمال'
                            placeholder='انتخاب'
                            value={field.value || undefined}
                            options={DURATION_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <div className='grid grid-cols-3 gap-6'>
                <Controller
                    control={control}
                    name='status'
                    render={({ field }) => (
                        <FormDropdown
                            label='وضعیت'
                            value={field.value}
                            options={STATUS_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <hr className='border-0 border-t border-dashed border-outline-variant' />

            <div className='flex flex-col gap-6 py-2'>
                <Controller
                    control={control}
                    name='useWithOtherDiscounts'
                    render={({ field }) => (
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
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </div>
                    )}
                />

                <Controller
                    control={control}
                    name='useWithDiscountCode'
                    render={({ field }) => (
                        <div className='flex flex-row items-center justify-between gap-4'>
                            <div className='flex flex-col gap-1 text-right'>
                                <span className='text-label-lg text-on-surface'>
                                    قابل استفاده هم‌زمان با کد تخفیف
                                </span>
                                <span className='text-label-md text-outline'>
                                    ترکیب با کدهای تبلیغاتی
                                </span>
                            </div>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    )
}

const DiscountForm = ({ disabled = false }: { disabled?: boolean }) => {
    return (
        <fieldset className='w-full' dir='rtl' disabled={disabled}>
            <div className='w-full overflow-hidden rounded-card-lg bg-surface-container-lowest'>
                <Tabs defaultValue='specs' dir='rtl' className='w-full'>
                    <TabsList className='w-full justify-start overflow-x-auto overflow-y-hidden border-b-0!'>
                        <TabsTrigger value='specs' className='border-b-0!'>
                            مشخصات
                        </TabsTrigger>
                        <TabsTrigger value='limits' className='border-b-0!'>
                            محدودیت استفاده
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value='specs' className='flex flex-col gap-3 p-6 pt-xl'>
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
        </fieldset>
    )
}

export default DiscountForm
