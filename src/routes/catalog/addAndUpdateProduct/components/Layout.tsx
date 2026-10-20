import React from 'react'

const ProductFieldsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
            {children}
        </div>
    )
}

export default ProductFieldsLayout