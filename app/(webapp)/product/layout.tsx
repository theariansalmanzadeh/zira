import React from 'react'
import ProductBreadCrumb from '@/src/routes/product/components/ProductBreadCrumb'
import ProductProvider from '@/src/routes/product/context/Provider'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProductProvider>
            <ProductBreadCrumb id={'3'} />
            {children}
        </ProductProvider>
    )
}

export default layout