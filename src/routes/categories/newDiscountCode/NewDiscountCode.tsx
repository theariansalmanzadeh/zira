'use client'

import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import React from 'react'
import ProductFieldsLayout from '../addProducts/components/Layout'
import DiscountCodeForm from './components/NewDiscountCodeForm'
import PreviewCode from './components/PreviewCode'
import { useRouter } from 'next/navigation'

const NewDiscountCode = () => {
    const { back } = useRouter()

    return (
        <div className='w-full rounded-card-lg p-6'>
            <div className='flex flex-row justify-between items-center mb-6'>
                <div className='flex flex-row items-center gap-2'>
                    <IconButton icon='rightArrow' onClick={() => back()} iconClassName='size-6' variant="ghost" />
                    <span className='text-on-surface text-title-lg font-medium'>ایجاد محصول جدید</span>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <Button variant='primary' size='default'>ذخیره پیش‌نویس</Button>
                    <Button variant='default' size='default'>
                        ذخیره و انتشار
                    </Button>
                </div>
            </div>
            <ProductFieldsLayout>
                <div className='col-span-8'>
                    <span className='text-label-lg text-outline'>
                        نوع
                    </span>
                    <div className='mt-3'>
                        <DiscountCodeForm />
                    </div>
                </div>
                <div className='col-span-4'>
                    <PreviewCode />
                </div>
            </ProductFieldsLayout>
        </div>
    )
}

export default NewDiscountCode