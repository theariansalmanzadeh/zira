import type { Metadata } from 'next'
import Product from '@/src/routes/product/Product'
import { getPlpProductById } from '@/src/routes/productsList/constants'
import { buildMetadata, SITE_NAME } from '@/src/shared/constants/seo'

type ProductPageProps = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({
    params,
}: ProductPageProps): Promise<Metadata> {
    const { id } = await params
    const product = getPlpProductById(id)

    if (!product) {
        return buildMetadata({
            title: 'محصول',
            description: `جزئیات محصول در ${SITE_NAME}`,
            path: `/product/${id}`,
        })
    }

    return buildMetadata({
        title: product.title,
        description: product.description,
        path: `/product/${product.href}`,
        images: [product.image],
    })
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params
    const product = getPlpProductById(id)

    return <Product product={product} />
}
