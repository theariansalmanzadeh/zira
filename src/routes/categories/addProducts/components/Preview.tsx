import ProductInfoCard from '@/src/shared/components/ui/ProductInfoCard'
import React from 'react'

const Preview = () => {
    return (
        <div className='w-full'>
            <span className='text-outline text-label-lg mb-3'>
                پیش‌نمایش محصول
            </span>
            <ProductInfoCard />
        </div>
    )
}

export default Preview