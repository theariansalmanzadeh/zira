import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getPublicProduct, listPublicRelatedProducts } from '@/src/api/public/catalog'
import Product from '@/src/routes/product/Product'
import { buildMetadata, SITE_NAME } from '@/src/shared/constants/seo'

type ProductPageProps = {
    params: Promise<{ slug: string }>
}

const loadPublicProduct = cache(async (slug: string) => {
    const result = await getPublicProduct(slug)
    return result.success ? result.data : null
})

export async function generateMetadata({
    params,
}: ProductPageProps): Promise<Metadata> {
    const { slug } = await params
    const product = await loadPublicProduct(slug)

    if (!product) {
        return buildMetadata({
            title: 'محصول',
            description: `جزئیات محصول در ${SITE_NAME}`,
            path: `/product/${slug}`,
        })
    }

    const description =
        product.items?.find((item) => item.description)?.description ||
        product.name

    return buildMetadata({
        title: product.name,
        description,
        path: `/product/${product.slug}`,
        images: product.cover_url ? [product.cover_url] : undefined,
    })
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params
    const [productResult, relatedResult, similarResult] = await Promise.all([
        getPublicProduct(slug),
        listPublicRelatedProducts(slug, { kind: 'RELATED' }),
        listPublicRelatedProducts(slug, { kind: 'SIMILAR' }),
    ])

    if (!productResult.success) notFound()

    return (
        <Product
            product={productResult.data}
            relatedProducts={relatedResult.success ? relatedResult.data.results : []}
            similarProducts={similarResult.success ? similarResult.data.results : []}
        />
    )
}
