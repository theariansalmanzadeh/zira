'use client'

import { useParams } from 'next/navigation'
import { useGetProduct } from '@/src/routes/catalog/hooks/catalog'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import Info from './components/Info'
import OverView from './components/OverView'
import SpesificationTabs from './components/SpesificationTabs'
import Stats from './components/Stats'
import type { ColorOption, SpecField } from './types'

const DASH = '—'

const STATUS_LABEL: Record<string, string> = {
    DRAFT: 'پیش‌نویس',
    ACTIVE: 'فعال',
    ARCHIVED: 'بایگانی',
}

const attributeValue = (attribute: {
    value?: string | null
    value_text?: string
    value_number?: string | null
    value_bool?: boolean | null
}) =>
    attribute.value ||
    attribute.value_text ||
    (attribute.value_number != null ? String(attribute.value_number) : null) ||
    (attribute.value_bool != null
        ? attribute.value_bool
            ? 'بله'
            : 'خیر'
        : null) ||
    DASH

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
        DASH

    const colors: ColorOption[] = (product.colors ?? []).map((color) => ({
        label: color.name || color.code || DASH,
        color: color.hex_code || '#BFBFBF',
    }))

    const sizes = (product.sizes ?? []).map(
        (size) => size.name || size.code || DASH
    )

    const fields: SpecField[] = [
        {
            label: 'جنس',
            value: product.material_name || DASH,
        },
        {
            label: 'مدل',
            value: product.model_line_name || DASH,
        },
        ...(product.attribute_values ?? []).map((attribute) => ({
            label:
                attribute.attribute_name || attribute.attribute_code || DASH,
            value: attributeValue(attribute),
        })),
    ]

    const displayStatus =
        STATUS_LABEL[product.status] ?? product.status ?? null

    return (
        <div className="flex w-full flex-col gap-4" dir="rtl">
            <OverView
                brand={product.brand_name || DASH}
                title={product.name || DASH}
                category={categoryLabel}
                sku={product.code || product.base_code || DASH}
                editHref={`/admin/catalog/addAndUpdateProduct/${product.id}`}
            />
            <Stats
                values={[
                    product.item_count ?? 0,
                    (product.size_count ?? 0) * (product.color_count ?? 0),
                    null,
                    null,
                ]}
            />
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 gap-4">
                    <SpesificationTabs
                        specifications={{
                            colors,
                            sizes,
                            saleUnits: [],
                            fields:
                                fields.length > 0
                                    ? fields
                                    : [{ label: DASH, value: DASH }],
                            labels: [],
                        }}
                        priceAndStock={{
                            sellPrice: null,
                            buyPrice: null,
                            profitMargin: null,
                            costPrice: null,
                            lastPurchaseAt: null,
                            lastSaleAt: null,
                            stockCount: null,
                            stockStatus: null,
                            displayStatus,
                            showInPublic: null,
                            publicAudience: null,
                            details: [
                                {
                                    label: 'برند',
                                    value: product.brand_name || DASH,
                                },
                                {
                                    label: 'دسته',
                                    value: product.category_name || DASH,
                                },
                                {
                                    label: 'جنس',
                                    value: product.material_name || DASH,
                                },
                                {
                                    label: 'مدل',
                                    value: product.model_line_name || DASH,
                                },
                                {
                                    label: 'تعداد سایز',
                                    value: formatFaNumber(
                                        product.size_count ??
                                            product.sizes?.length ??
                                            0
                                    ),
                                },
                                {
                                    label: 'تعداد رنگ',
                                    value: formatFaNumber(
                                        product.color_count ??
                                            product.colors?.length ??
                                            0
                                    ),
                                },
                                {
                                    label: 'تعداد قلم',
                                    value: formatFaNumber(
                                        product.item_count ?? 0
                                    ),
                                },
                                {
                                    label: 'وضعیت',
                                    value: displayStatus || DASH,
                                },
                            ],
                        }}
                    />
                </div>
                <div className="col-span-4 flex flex-col gap-4">
                    <Info
                        rows={[
                            { label: 'کد کالا', value: product.code || DASH },
                            {
                                label: 'کد پایه',
                                value: product.base_code || DASH,
                            },
                            {
                                label: 'برند',
                                value: product.brand_name || DASH,
                            },
                            {
                                label: 'دسته',
                                value: product.category_name || DASH,
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
                                value: displayStatus || DASH,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
