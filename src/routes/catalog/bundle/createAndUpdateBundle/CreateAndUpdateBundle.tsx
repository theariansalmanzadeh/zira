'use client'

import { Spinner } from '@/src/shared/components/ui/spinner'
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
    const { isPending, isError } = useGetBundle(id)

    if (id && isPending) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner className='size-6' />
            </div>
        )
    }

    if (id && isError) {
        return (
            <div className='rounded-card-md bg-surface-container-lowest px-4 py-6 text-center text-label-md text-outline'>
                دریافت اطلاعات باندل با خطا مواجه شد.
            </div>
        )
    }

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-12'>
                <div className='flex flex-col gap-4 lg:col-span-8'>
                    <Form />
                    <ProductList />
                </div>
                <div className='flex flex-col gap-4 lg:col-span-4'>
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
