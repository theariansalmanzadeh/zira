'use client'

import { PRODUCT_ADDRESS } from '../constants'
import DisabledField from './DisabledField'

const ProductAddress = () => (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5' dir='rtl'>
        <DisabledField label='ناحیه (Zone)' value={PRODUCT_ADDRESS.zone} />
        <DisabledField label='قفسه (Rack)' value={PRODUCT_ADDRESS.rack} />
        <DisabledField label='طبقه (Shelf)' value={PRODUCT_ADDRESS.shelf} />
        <DisabledField label='جعبه (Box)' value={PRODUCT_ADDRESS.box} />
        <DisabledField label='تعداد' value={PRODUCT_ADDRESS.quantity} />
    </div>
)

export default ProductAddress
