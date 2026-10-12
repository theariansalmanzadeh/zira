"use client"

import AttributeSection from './components/AttributeSection'
import ProductFieldsLayout from './components/Layout'
import Preview from './components/Preview'
import ProductHeader from './components/ProductHeader'
import CreateProductsProvider from './provider/createProductsProvider'

const AddProducts = () => {
    return (
        <CreateProductsProvider>
        <div className='w-full rounded-card-lg p-6'>
            <ProductHeader />
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