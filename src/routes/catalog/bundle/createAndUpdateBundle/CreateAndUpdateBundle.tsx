'use client'

import ActionButtons from './components/ActionButtons'
import Form from './components/Form'
import Pricing from './components/Pricing'
import ProductList from './components/ProductList'
import { useGetBundle } from './hook/useGetBundle'
import BundleProvider from './provider/bundleProvider'

type CreateAndUpdateBundleProps = {
    id?: string
}

const CreateAndUpdateBundleContent = ({ id }: CreateAndUpdateBundleProps) => {
    useGetBundle(id)

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="flex flex-col gap-4 lg:col-span-8">
                    <Form />
                    <ProductList />
                </div>
                <div className="flex flex-col gap-4 lg:col-span-4">
                    <Pricing />
                    <ActionButtons id={id} />
                </div>
            </div>
        </div>
    )
}

const CreateAndUpdateBundle = ({ id }: CreateAndUpdateBundleProps) => (
    <BundleProvider initialId={id}>
        <CreateAndUpdateBundleContent id={id} />
    </BundleProvider>
)

export default CreateAndUpdateBundle
