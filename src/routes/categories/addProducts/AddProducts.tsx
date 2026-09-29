"use client"

import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import React from 'react'
import AttributeSection from './components/AttributeSection'
import ProductFieldsLayout from './components/Layout'
import Preview from './components/Preview'
import { useRouter } from 'next/navigation'
import CreateProductsProvider from './provider/createProductsProvider'

const AddProducts = () => {
    const { back } = useRouter()
    return (
        <CreateProductsProvider>
        <div className='w-full rounded-card-lg p-6'>

            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center gap-2'>
                    <IconButton icon='rightArrow' onClick={() => back()} iconClassName='size-6' variant="ghost" />
                    <span className='text-on-surface text-title-lg font-bold'>ایجاد محصول جدید</span>
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
                    <AttributeSection />
                </div>
                <div className='col-span-4'>
                    <Preview />
                </div>
            </ProductFieldsLayout>
        </div>
        </CreateProductsProvider>
    )
}

export default AddProducts