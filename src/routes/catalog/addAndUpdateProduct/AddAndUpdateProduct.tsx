'use client'

import { Spinner } from '@/src/shared/components/ui/spinner'
import AttributeSection from './components/AttributeSection'
import ProductFieldsLayout from './components/Layout'
import Preview from './components/Preview'
import ProductActions from './components/ProductActions'
import CreateProductsProvider, {
    useCreateProducts,
} from './provider/createProductsProvider'

type AddAndUpdateProductProps = {
    id?: string
}

const AddAndUpdateProductContent = () => {
    const { isLoadingProduct } = useCreateProducts()

    if (isLoadingProduct) {
        return (
            <div className="flex justify-center py-16">
                <Spinner className="size-6" />
            </div>
        )
    }

    return (
        <div className="w-full rounded-card-lg p-6">
            <ProductFieldsLayout>
                <div className="col-span-8">
                    <AttributeSection />
                </div>
                <div className="col-span-4">
                    <Preview />
                    <ProductActions />
                </div>
            </ProductFieldsLayout>
        </div>
    )
}

const AddAndUpdateProduct = ({ id }: AddAndUpdateProductProps) => {
    return (
        <CreateProductsProvider productId={id}>
            <AddAndUpdateProductContent />
        </CreateProductsProvider>
    )
}

export default AddAndUpdateProduct
