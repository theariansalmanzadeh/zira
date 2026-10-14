'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
    useCreateCoupon,
    useGetCoupon,
    useUpdateCoupon,
} from '@/src/routes/catalog/hooks/pricing'
import { Button } from '@/src/shared/components/ui/button'
import { Spinner } from '@/src/shared/components/ui/spinner'
import ProductFieldsLayout from '../addProducts/components/Layout'
import DiscountForm from './components/DiscountForm'
import PreviewDiscount from './components/PreviewDiscount'
import {
    NEW_DISCOUNT_DEFAULT_VALUES,
    newDiscountSchema,
    type NewDiscountFormValues,
} from './schema'
import {
    toCreateCouponRequest,
    toUpdateCouponRequest,
} from './utils/toCreateCouponRequest'

const toDate = (value?: string | null) => {
    if (!value) return undefined
    const [year, month, day] = value.slice(0, 10).split('-').map(Number)
    if (!year || !month || !day) return undefined
    return new Date(year, month - 1, day)
}

type NewDiscountProps = {
    id?: string
}

const NewDiscount = ({ id }: NewDiscountProps) => {
    const { push } = useRouter()
    const [loadedCouponId, setLoadedCouponId] = useState<string | null>(null)
    const { data: coupon, isPending: isCouponPending } = useGetCoupon(
        id ?? '',
        Boolean(id)
    )
    const { mutate: createCoupon, isPending: isCreating } = useCreateCoupon()
    const { mutate: updateCoupon, isPending: isUpdating } = useUpdateCoupon()
    const isPending = isCreating || isUpdating
    const methods = useForm<NewDiscountFormValues>({
        resolver: zodResolver(newDiscountSchema),
        defaultValues: NEW_DISCOUNT_DEFAULT_VALUES,
        mode: 'onSubmit',
    })

    if (coupon && loadedCouponId !== coupon.id) {
        setLoadedCouponId(coupon.id)
        methods.reset({
            ...NEW_DISCOUNT_DEFAULT_VALUES,
            discountCode: coupon.code_text,
            endDate: toDate(coupon.expires_at),
            minCartAmount: coupon.min_amount ?? '',
            minPurchaseQty: coupon.min_qty ?? '',
            status: coupon.status === 'ACTIVE' ? 'active' : 'inactive',
        })
    }

    const onSubmit = (values: NewDiscountFormValues) => {
        const onSuccess = () => {
            toast.success(id ? 'کد تخفیف به‌روزرسانی شد' : 'کد تخفیف ایجاد شد')
            push('/admin/catalog?sub=discounts')
        }
        const onError = () => {
            toast.error(
                id ? 'به‌روزرسانی کد تخفیف انجام نشد' : 'ایجاد کد تخفیف انجام نشد'
            )
        }

        if (id) {
            updateCoupon(
                { couponId: id, body: toUpdateCouponRequest(values) },
                { onSuccess, onError }
            )
            return
        }

        createCoupon(toCreateCouponRequest(values), { onSuccess, onError })
    }

    if (id && isCouponPending) {
        return (
            <div className='flex justify-center py-10'>
                <Spinner className='size-6' />
            </div>
        )
    }

    return (
        <FormProvider {...methods}>
            <form
                id='new-discount-form'
                className='w-full rounded-card-lg p-6'
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <ProductFieldsLayout>
                    <div className='col-span-8'>
                        <div className='mt-3'>
                            <DiscountForm disabled={isPending} />
                        </div>
                    </div>
                    <div className='col-span-4'>
                        <PreviewDiscount />
                        <Button
                            type='submit'
                            variant='primary'
                            size='lg'
                            className='mt-4 w-full'
                            disabled={isPending}
                            isLoading={isPending}
                        >
                            ذخیره پیش‌نویس
                        </Button>
                    </div>
                </ProductFieldsLayout>
            </form>
        </FormProvider>
    )
}

export default NewDiscount
