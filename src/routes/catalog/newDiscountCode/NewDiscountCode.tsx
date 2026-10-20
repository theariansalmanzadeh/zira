'use client'

import ProductFieldsLayout from '../addAndUpdateProduct/components/Layout'
import ActionButtons from './components/ActionButtons'
import DiscountCodeForm from './components/NewDiscountCodeForm'
import PreviewCode from './components/PreviewCode'

const NewDiscountCode = () => {
    return (
        <div className='w-full rounded-card-lg p-6'>
            <ProductFieldsLayout>
                <div className='col-span-8'>
                    <span className='text-label-lg text-outline'>نوع</span>
                    <div className='mt-3'>
                        <DiscountCodeForm />
                    </div>
                </div>
                <div className='col-span-4'>
                    <PreviewCode />
                    <ActionButtons />
                </div>
            </ProductFieldsLayout>
        </div>
    )
}

export default NewDiscountCode
