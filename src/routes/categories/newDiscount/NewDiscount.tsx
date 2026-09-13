"use client"

import ProductFieldsLayout from '../addProducts/components/Layout'
import DiscountForm from './components/DiscountForm'
import PreviewDiscount from './components/PreviewDiscount'

const NewDiscount = () => {
    return (
        <div className='w-full rounded-card-lg p-6'>
            <ProductFieldsLayout>
                <div className='col-span-8'>
                    <div className='mt-3'>
                        <DiscountForm />
                    </div>
                </div>
                <div className='col-span-4'>
                    <PreviewDiscount />
                </div>
            </ProductFieldsLayout>
        </div>
    )
}

export default NewDiscount
