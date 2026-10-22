'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useGetItem } from '@/src/routes/catalog/hooks/catalog'
import { useGetItemPrice } from '@/src/routes/catalog/hooks/pricing'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import Info from './components/Info'
import OverView from './components/OverView'
import Seo from './components/Seo'
import SpesificationTabs from './components/SpesificationTabs'
import Stats from './components/Stats'
import type { ColorOption, SpecField } from './types'

const DASH = '—'

const toNumber = (value?: string | number | null) => {
    if (value === undefined || value === null || value === '') return null
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
}

const STATUS_LABEL: Record<string, string> = {
    DRAFT: 'پیش‌نویس',
    ACTIVE: 'فعال',
    HIDDEN: 'مخفی',
    ARCHIVED: 'بایگانی',
}

const AUDIENCE_LABEL: Record<string, string> = {
    ALL: 'همه مشتریان',
    GROUPS: 'گروه مشتریان',
}

const PackDetail = () => {
    const params = useParams<{ id?: string }>()
    const itemId = params?.id ?? ''
    const {
        data: item,
        isPending: isItemPending,
        isError: isItemError,
    } = useGetItem(itemId, Boolean(itemId))
    const {
        data: price,
        isPending: isPricePending,
        isError: isPriceError,
    } = useGetItemPrice(itemId, Boolean(itemId))

    const galleryImages = useMemo(() => {
        const images = item?.images ?? []
        const byKind = (kind: 'DIGIKALA' | 'MANNEQUIN' | 'HUMAN') =>
            images
                .filter((image) => image.kind === kind)
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((image) => image.url)
                .filter(Boolean)

        return {
            publicImages: byKind('DIGIKALA'),
            levelOneImages: byKind('MANNEQUIN'),
            levelTwoImages: byKind('HUMAN'),
        }
    }, [item?.images])

    if (isItemPending || isPricePending) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner className='size-6' />
            </div>
        )
    }

    if (isItemError || !item) {
        return (
            <div className='rounded-card-lg bg-surface-container-lowest px-4 py-10 text-center text-label-md text-outline'>
                دریافت جزئیات پک با خطا مواجه شد.
            </div>
        )
    }

    const salePrice = toNumber(price?.sale_price)
    const purchasePrice = toNumber(price?.purchase_price)
    const profitMargin =
        salePrice !== null && purchasePrice !== null && salePrice > 0
            ? Math.round(((salePrice - purchasePrice) / salePrice) * 100)
            : null

    const primaryImage =
        item.images.find((image) => image.is_primary)?.url ??
        item.images[0]?.url ??
        null

    const colors: ColorOption[] = item.color_hex
        ? [
            {
                label: item.color_code || item.color_hex,
                color: item.color_hex,
            },
        ]
        : []

    const sizes = item.size_code ? [item.size_code] : []

    const saleUnits = item.pack_size
        ? [`پک ${formatFaNumber(item.pack_size)} عددی`]
        : []

    const fields: SpecField[] = [
        ...(item.specs ?? []).map((spec) => ({
            label: spec.key || DASH,
            value: spec.value || DASH,
        })),
        ...(item.attribute_values ?? []).map((attribute) => ({
            label: attribute.attribute_name || attribute.attribute_code || DASH,
            value:
                attribute.value ||
                attribute.value_text ||
                (attribute.value_number != null
                    ? String(attribute.value_number)
                    : null) ||
                (attribute.value_bool != null
                    ? attribute.value_bool
                        ? 'بله'
                        : 'خیر'
                    : null) ||
                DASH,
        })),
    ]

    const labels = (item.labels ?? []).map((label) => label.name).filter(Boolean)

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <OverView
                brand={item.brand_name || DASH}
                title={item.display_name || DASH}
                category={item.category_name || DASH}
                sku={item.code || item.sku || item.base_code || DASH}
                price={
                    salePrice !== null ? formatPrice(salePrice) : undefined
                }
                description={item.description || undefined}
                image={primaryImage}
            />
            <Stats
                values={[
                    null,
                    item.components?.length ?? null,
                    salePrice,
                    profitMargin,
                ]}
                meta={[
                    {
                        label: 'موجودی کل',
                        valueClassName: 'text-success',
                    },
                    {
                        label: 'تعداد اجزا',
                        valueClassName: 'text-on-surface',
                    },
                    {
                        label: 'قیمت فروش',
                        valueClassName: 'text-on-surface',
                    },
                    {
                        label: 'حاشیه سود',
                        valueClassName: 'text-success',
                    },
                ]}
            />
            <div className='grid grid-cols-12 gap-8'>
                <div className='col-span-8 gap-4'>
                    <SpesificationTabs
                        warehouseLabel='انبار'
                        showGallery
                        gallery={galleryImages}
                        specifications={{
                            colors,
                            sizes,
                            saleUnits,
                            fields:
                                fields.length > 0
                                    ? fields
                                    : [{ label: DASH, value: DASH }],
                            labels: labels.length > 0 ? labels : [DASH],
                        }}
                        priceAndStock={{
                            sellPrice: salePrice,
                            buyPrice: purchasePrice,
                            profitMargin,
                            costPrice: null,
                            lastPurchaseAt: null,
                            lastSaleAt: null,
                            stockCount: null,
                            stockStatus: null,
                            displayStatus:
                                STATUS_LABEL[item.status] ?? item.status ?? null,
                            showInPublic: item.show_in_public,
                            publicAudience:
                                AUDIENCE_LABEL[item.audience] ??
                                item.audience ??
                                null,
                            details: [
                                {
                                    label: 'واحد اصلی',
                                    value: DASH,
                                },
                                {
                                    label: 'واحد فرعی',
                                    value: item.pack_size
                                        ? `پک ${formatFaNumber(item.pack_size)} عددی`
                                        : DASH,
                                },
                                {
                                    label: 'ضریب تبدیل',
                                    value: DASH,
                                },
                                {
                                    label: 'حداقل تعداد سفارش',
                                    value: DASH,
                                },
                                {
                                    label: 'آستانه خرید',
                                    value: DASH,
                                },
                                {
                                    label: 'سقف انباشت',
                                    value: DASH,
                                },
                                {
                                    label: 'قیمت پایه',
                                    value:
                                        toNumber(price?.base_price) !== null
                                            ? formatPrice(
                                                Number(price?.base_price)
                                            )
                                            : DASH,
                                },
                                {
                                    label: 'درصد تعدیل',
                                    value: price?.adjustment_pct
                                        ? `${formatFaNumber(price.adjustment_pct)}٪`
                                        : DASH,
                                },
                                {
                                    label: 'وضعیت قیمت',
                                    value: isPriceError
                                        ? DASH
                                        : price?.item_status || DASH,
                                },
                            ],
                        }}
                    />
                </div>
                <div className='col-span-4 flex flex-col gap-4'>
                    <Info
                        rows={[
                            { label: 'کد کالا', value: item.code || DASH },
                            {
                                label: 'کد پایه',
                                value: item.base_code || DASH,
                            },
                            { label: 'SKU', value: item.sku || DASH },
                            {
                                label: 'برند',
                                value: item.brand_name || DASH,
                            },
                            {
                                label: 'دسته',
                                value: item.category_name || DASH,
                            },
                            {
                                label: 'محصول خانواده',
                                value: item.product_name || DASH,
                            },
                            {
                                label: 'سایز',
                                value: item.size_code || DASH,
                            },
                            {
                                label: 'رنگ',
                                value: item.color_code || DASH,
                            },
                            {
                                label: 'گرید',
                                value: formatFaNumber(item.grade),
                            },
                            {
                                label: 'اندازه پک',
                                value: item.pack_size
                                    ? formatFaNumber(item.pack_size)
                                    : DASH,
                            },
                            {
                                label: 'وضعیت',
                                value:
                                    STATUS_LABEL[item.status] ??
                                    item.status ??
                                    DASH,
                            },
                        ]}
                    />
                    <Seo
                        slug={item.slug || DASH}
                        metaTitle={item.meta_title || DASH}
                    />
                </div>
            </div>
        </div>
    )
}

export default PackDetail
