"use client"

import AttributeSection from './components/AttributeSection'
import ProductFieldsLayout from './components/Layout'
import Preview from './components/Preview'
import ProductActions from './components/ProductActions'
import CreateProductsProvider from './provider/createProductsProvider'

const AddProducts = () => {
    return (
        <CreateProductsProvider>
        <div className='w-full rounded-card-lg p-6'>
            <ProductFieldsLayout>
                <div className='col-span-8'>
                    <AttributeSection />
                </div>
                <div className='col-span-4'>
                    <Preview />
                    <ProductActions />
                </div>
            </ProductFieldsLayout>
        </div>
        </CreateProductsProvider>
    )
}

export default AddProducts