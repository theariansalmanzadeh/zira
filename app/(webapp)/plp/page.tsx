import type { Metadata } from 'next'
import { Suspense } from 'react'
import PlpPageView from '@/src/routes/productsList/components/PlpPageView'
import { buildMetadata, SITE_NAME } from '@/src/shared/constants/seo'
import PlpSkeleton from '@/src/shared/components/loading/PlpSkeleton'

type PlpSearchParams = {
    q?: string
    brand?: string
    cat?: string
}

const CATEGORY_LABELS: Record<string, string> = {
    women: 'زنانه',
    men: 'مردانه',
    boys: 'پسرانه',
}

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<PlpSearchParams>
}): Promise<Metadata> {
    const { q, brand, cat } = await searchParams
    const categoryLabel = cat ? CATEGORY_LABELS[cat] : undefined

    const title = q
        ? `جستجو برای ${q}`
        : brand
          ? `محصولات ${brand}`
          : categoryLabel
            ? `محصولات ${categoryLabel}`
            : 'لیست محصولات'

    const description = q
        ? `نتایج جستجوی «${q}» در ${SITE_NAME}`
        : brand
          ? `خرید محصولات برند ${brand} از ${SITE_NAME}`
          : categoryLabel
            ? `خرید محصولات ${categoryLabel} از ${SITE_NAME}`
            : `لیست محصولات ${SITE_NAME}؛ لباس زیر، لباس خواب و پوشاک زنانه و مردانه`

    const query = new URLSearchParams()
    if (q) query.set('q', q)
    if (brand) query.set('brand', brand)
    if (cat) query.set('cat', cat)
    const queryString = query.toString()

    return buildMetadata({
        title,
        description,
        path: queryString ? `/plp?${queryString}` : '/plp',
    })
}

export default function PlpPage() {
    return (
        <Suspense fallback={<PlpSkeleton />}>
            <PlpPageView />
        </Suspense>
    )
}
