'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { CouponCreateIn, DiscountCreateIn } from '@/src/api/types/admin/pricing'
import { useCreateCoupon } from '@/src/routes/catalog/hooks/pricing'
import { Button } from '@/src/shared/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import CashPurchaseDiscountForm from './components/CashPurchaseDiscountForm'
import CombinedDiscountForm from './components/CombinedDiscountForm'

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-4 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

const FORM_ID = {
    combined: 'combined-discount-form',
    cash: 'cash-purchase-discount-form',
} as const

type DiscountTab = keyof typeof FORM_ID

type NewDiscountProps = {
    id?: string
}

const toCouponCreatePayload = (input: DiscountCreateIn): CouponCreateIn => ({
    discount: {
        ...input,
        trigger: 'COUPON',
    },
    coupon: {},
})

const NewDiscount = (_props: NewDiscountProps) => {
    const [tab, setTab] = useState<DiscountTab>('combined')
    const { mutate: createCoupon, isPending } = useCreateCoupon()

    const handleCreateDiscount = (input: DiscountCreateIn) => {
        createCoupon(toCouponCreatePayload(input), {
            onSuccess: () => toast.success('کد تخفیف ثبت شد'),
            onError: () => toast.error('ثبت کد تخفیف انجام نشد'),
        })
    }

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <Tabs
                value={tab}
                onValueChange={(value) => setTab(value as DiscountTab)}
                dir='rtl'
                className='w-full gap-4'
            >
                <TabsList className='h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-high p-1.5'>
                    <TabsTrigger value='combined' className={tabTriggerClassName}>
                        تخفیف ترکیبی
                    </TabsTrigger>
                    <TabsTrigger value='cash' className={tabTriggerClassName}>
                        تخفیف خرید نقدی
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='combined' className='mt-0'>
                    <CombinedDiscountForm onCreate={handleCreateDiscount} />
                </TabsContent>
                <TabsContent value='cash' className='mt-0'>
                    <CashPurchaseDiscountForm
                        showSubmitButton={false}
                        onCreate={handleCreateDiscount}
                    />
                </TabsContent>
            </Tabs>
            <div className='flex justify-end'>
                <Button
                    type='submit'
                    form={FORM_ID[tab]}
                    variant='primary'
                    size='lg'
                    disabled={isPending}
                >
                    ثبت تخفیف
                </Button>
            </div>
        </div>
    )
}

export default NewDiscount
