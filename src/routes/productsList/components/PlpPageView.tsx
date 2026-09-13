'use client'

import { useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import PlpSkeleton from '@/src/shared/components/loading/PlpSkeleton'
import ProductsList from '@/src/routes/productsList/ProductsList'

const PlpPageView = () => {
    const [showSkeleton, setShowSkeleton] = useState(false)

    return (
        <div className="flex w-full flex-col gap-sm bg-surface-container-lowest p-lg" dir="rtl">
            <Button
                type="button"
                variant="outline"
                className="w-fit"
                onClick={() => setShowSkeleton((prev) => !prev)}
            >
                {showSkeleton ? 'نمایش محصولات' : 'نمایش اسکلتون'}
            </Button>
            {showSkeleton ? <PlpSkeleton /> : <ProductsList />}
        </div>
    )
}

export default PlpPageView
