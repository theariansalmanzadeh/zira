'use client'

import DocumentHeader from './components/DocumentHeader'
import { PRODUCT_TURNOVER_DETAIL_DUMMY } from './constants'

const ProductTurnoverDetail = () => {
    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <DocumentHeader {...PRODUCT_TURNOVER_DETAIL_DUMMY} />
        </div>
    )
}

export default ProductTurnoverDetail
