"use client"

import { Icon } from '@/src/shared/components/Icons/Icon'
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'
import CTA from './components/CTA'
import Tags from './components/Tags'
import Details from './components/Details'
import DeliveryInfo from './components/DeliveryInfo'
import ProductCarousel from './components/ProductCarousel'
import {
    PRODUCT_DETAILS,
    PRODUCT_TAGS,
    QUANTITY_ITEMS,
    SIZE_ITEMS,
} from './content/dummy'
import type { CardOut, PDPOut } from '@/src/api/types/public/catalog'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import Images from './components/Images'
import Colors from './components/Colors'
import { useProduct } from './context/Provider'

const handleToggleChange =
    (setter: (value: string) => void) => (value: string) => {
        if (value) setter(value)
    }

const moneyAmount = (amount?: string | null) => {
    const parsed = Number(amount)
    return Number.isFinite(parsed) ? parsed : 0
}

const productImages = (product: PDPOut) => {
    const urls = [
        product.cover_url,
        ...(product.items ?? []).flatMap((item) =>
            (item.images ?? []).map((image) => image.url)
        ),
    ].filter((url): url is string => Boolean(url))

    return [...new Set(urls)]
}

const productSizes = (product: PDPOut) => {
    const fromCard = product.sizes ?? []
    const fromItems = (product.items ?? [])
        .map((item) => item.size?.name || item.size?.code)
        .filter((size): size is string => Boolean(size))

    return [...new Set([...fromCard, ...fromItems])]
}

const Product = ({
    product,
    relatedProducts,
    similarProducts,
}: {
    product: PDPOut
    relatedProducts: CardOut[]
    similarProducts: CardOut[]
}) => {
    const {
        quantity,
        setQuantity,
        sizes,
        setSizes,
        isCustomPack,
    } = useProduct()
    const openModal = useModalStore((state) => state.openModal)
    const images = productImages(product)
    const sizeOptions = productSizes(product)
    const sizeItems = sizeOptions.length
        ? sizeOptions.map((size) => ({ label: size, value: size }))
        : SIZE_ITEMS
    const packItems = (product.items ?? []).filter((item) => item.is_pack)
    const quantityItems = packItems.length
        ? packItems.map((item) => ({
              label: item.display_name,
              value: item.id,
          }))
        : QUANTITY_ITEMS
    const colorItems = (product.colors ?? []).map((color) => ({
        id: color.code,
        label: color.name,
        value: color.hex_code,
    }))
    const tags = (product.labels ?? []).map((label) => ({
        id: label,
        label,
    }))
    const description = product.items?.find((item) => item.description)?.description
    const price = moneyAmount(
        product.price_summary?.original_price?.amount ??
            product.price_summary?.final_price?.amount
    )
    const discount = moneyAmount(product.price_summary?.discount_percent)
    const details = [
        { label: 'کد محصول', value: product.code },
        { label: 'برند', value: product.brand?.name ?? '' },
        { label: 'دسته‌بندی', value: product.category?.name ?? '' },
        { label: 'جنس', value: product.material?.name ?? '' },
        { label: 'خط مدل', value: product.model_line?.name ?? '' },
    ].filter((item) => item.value)

    return (
        <div className='flex flex-col gap-xl pt-2xl'>
            <div className="flex flex-col md:flex-row justify-between md:gap-10 gap-xl w-full">
                <Images
                    images={
                        images.length
                            ? images
                            : ['/images/item-1.jpg']
                    }
                />
                <div className="relative -mt-xl flex min-w-0 basis-1/2 flex-col gap-xl rounded-t-2xl p-lg">
                    <span className="text-outline">{product.brand?.name ?? 'برند'}</span>
                    <h2 className="text-title-lg font-bold text-on-surface">{product.name}</h2>
                    <div className="flex flex-col gap-3">
                        <span className="text-title-md font-normal text-on-surface-variant">تعداد</span>
                        <ToggleGroup
                            dir='rtl'
                            variant="outline"
                            type="single"
                            className='flex-wrap'
                            value={quantity}
                            onValueChange={handleToggleChange(setQuantity)}
                        >
                            {quantityItems.map((item) => (
                                <ToggleGroupItem
                                    key={item.value}
                                    className='text-title-md'
                                    value={item.value}
                                    aria-label={item.label}
                                >
                                    {item.label}
                                </ToggleGroupItem>
                            ))}
                            <ToggleGroupItem
                                className='gap-1 text-title-md'
                                value='custom-pack'
                                aria-label='پک سفارشی'
                            >
                                <Icon label='customLayer400Broken' className='size-4' />
                                <span>پک سفارشی</span>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-title-md font-normal text-on-surface-variant">سایز</span>
                            <button
                                type='button'
                                className='text-body-md text-primary'
                                onClick={() => openModal(ModalTypes.SIZE_GUIDNESS)}
                            >
                                راهنمای سایز‌بندی
                            </button>
                        </div>
                        {isCustomPack ? (
                        <ToggleGroup
                            dir='rtl'
                            variant="outline"
                            type="multiple"
                            className='flex-wrap'
                            value={sizes}
                            onValueChange={setSizes}
                        >
                            {sizeItems.map((item) => (
                                <ToggleGroupItem
                                    key={item.value}
                                    className=' text-title-md'
                                    value={item.value}
                                    aria-label={item.label}
                                >
                                    {item.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                        ) : (
                        <ToggleGroup
                            dir='rtl'
                            variant="outline"
                            type="single"
                            className='flex-wrap'
                            value={sizes[0] ?? ''}
                            onValueChange={(value) => {
                                if (value) setSizes([value])
                            }}
                        >
                            {sizeItems.map((item) => (
                                <ToggleGroupItem
                                    key={item.value}
                                    className=' text-title-md'
                                    value={item.value}
                                    aria-label={item.label}
                                >
                                    {item.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                        )}
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-title-md font-normal text-on-surface-variant">رنگ</span>
                        <Colors items={colorItems} />
                    </div>
                    <Tags tags={tags.length ? tags : PRODUCT_TAGS} />
                    <DeliveryInfo quantity={10} deliveryTime="۳ تا ۵ روز کاری" />
                    <CTA
                        discount={discount}
                        price={price}
                        quantity={product.supply?.can_order === false ? 0 : 1}
                    />
                    <Details
                        details={details.length ? details : PRODUCT_DETAILS}
                        description={description}
                    />
                </div>
            </div>
            <div className='py-[64px]'>
                <ProductCarousel title="محصولات مرتبط" products={relatedProducts} />
            </div>
            <div className='py-[64px]'>
                <ProductCarousel title="محصولات مشابه" products={similarProducts} />
            </div>
        </div>
    )
}

export default Product
