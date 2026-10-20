'use client'

import { useParams } from 'next/navigation'
import { useGetProduct } from '@/src/routes/catalog/hooks/catalog'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import Info from './components/Info'
import OverView from './components/OverView'
import SpesificationTabs from './components/SpesificationTabs'
import Stats from './components/Stats'

const ProductDetail = () => {
    const params = useParams<{ id?: string }>()
    const productId = params?.id ?? ''
    const { data: product, isPending, isError } = useGetProduct(
        productId,
        Boolean(productId)
    )

    if (isPending) {
        return (
            <div className="flex justify-center py-16">
                <Spinner className="size-6" />
            </div>
        )
    }

    if (isError || !product) {
        return (
            <div className="rounded-card-lg bg-surface-container-lowest px-4 py-10 text-center text-label-md text-outline">
                دریافت جزئیات محصول با خطا مواجه شد.
            </div>
        )
    }

    const categoryLabel =
        product.category_path?.filter(Boolean).join(' / ') ||
        product.category_name ||
        '—'

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <OverView
                brand={product.brand_name}
                title={product.name}
                category={categoryLabel}
                sku={product.code || product.base_code}
                editHref={`/admin/catalog/addAndUpdateProduct/${product.id}`}
            />
            <Stats
                values={[
                    product.item_count ?? 0,
                    (product.size_count ?? 0) * (product.color_count ?? 0),
                    0,
                    0,
                ]}
            />
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 gap-4">
                    <SpesificationTabs />
                </div>
                <div className="col-span-4 flex flex-col gap-4">
                    <Info
                        rows={[
                            { label: 'کد کالا', value: product.code || '—' },
                            {
                                label: 'کد پایه',
                                value: product.base_code || '—',
                            },
                            { label: 'برند', value: product.brand_name || '—' },
                            {
                                label: 'دسته',
                                value: product.category_name || '—',
                            },
                            {
                                label: 'تعداد سایز',
                                value: formatFaNumber(product.size_count ?? 0),
                            },
                            {
                                label: 'تعداد رنگ',
                                value: formatFaNumber(product.color_count ?? 0),
                            },
                            {
                                label: 'تعداد قلم',
                                value: formatFaNumber(product.item_count ?? 0),
                            },
                            {
                                label: 'وضعیت',
                                value: product.status || '—',
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
