'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import type { AddProductItem } from '@/src/shared/components/modals/components/addProduct'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { useNewFactorContext } from '../provider/NewFactorProvider'
import FactorItemAndPrice from './FactorItemAndPrice'

const mapAddProductToCartItem = (product: AddProductItem, unitPrice = 0) => ({
    id: product.id,
    name: product.productName,
    unitPrice,
    qty: product.quantity ?? 1,
    swatch: product.colorHex ?? '#D98EA8',
})

const ItemsStep = () => {
    const {
        cartItems,
        updateCartQty,
        removeCartItem,
        addCartItem,
    } = useNewFactorContext()
    const openModal = useModalStore((state) => state.openModal)

    const handleOpenAddProduct = () => {
        openModal(ModalTypes.ADD_PRODUCT, {
            hasQuantity: true,
            selectedIds: cartItems.map((item) => item.id),
            quantities: Object.fromEntries(
                cartItems.map((item) => [item.id, item.qty])
            ),
            onConfirm: (products: AddProductItem[]) => {
                const selectedIds = new Set(products.map((product) => product.id))

                cartItems.forEach((item) => {
                    if (!selectedIds.has(item.id)) {
                        removeCartItem(item.id)
                    }
                })

                products.forEach((product) => {
                    const existing = cartItems.find((item) => item.id === product.id)
                    if (existing) {
                        updateCartQty(product.id, product.quantity ?? existing.qty)
                        return
                    }

                    addCartItem(mapAddProductToCartItem(product))
                })
            },
        })
    }

    return (
        <div className='flex flex-col gap-5 rounded-card-md bg-surface-container-lowest p-6' dir='rtl'>
            <div className='flex flex-wrap items-start justify-between gap-3'>
                <div>
                    <h2 className='text-title-md font-medium text-on-surface'>افزودن اقلام</h2>
                    <p className='mt-1 text-label-md text-outline'>
                        کالاها را به سبد فاکتور اضافه کنید.
                    </p>
                </div>
                <Button
                    type='button'
                    variant='primary'
                    size='default'
                    className='gap-1.5'
                    onClick={handleOpenAddProduct}
                >
                    <Icon label='addSm400Broken' className='size-5!' />
                    افزودن کالا
                </Button>
            </div>

            <div className='overflow-hidden rounded-card-sm border border-outline-variant'>
                <div className='grid grid-cols-[1.7fr_120px_1fr_1fr_36px] bg-surface-container-high'>
                    <div className='px-4 py-2.5 text-label-sm font-bold text-outline'>کالا</div>
                    <div className='px-2.5 py-2.5 text-center text-label-sm font-bold text-outline'>
                        تعداد
                    </div>
                    <div className='px-2.5 py-2.5 text-left text-label-sm font-bold text-outline'>
                        قیمت واحد
                    </div>
                    <div className='px-4 py-2.5 text-left text-label-sm font-bold text-outline'>
                        جمع
                    </div>
                    <div />
                </div>

                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className='grid grid-cols-[1.7fr_120px_1fr_1fr_36px] items-center border-t border-outline-variant/50'
                    >
                        <div className='px-4 py-3'>
                            <div className='flex items-center gap-2.5'>
                                <div
                                    className='size-9 shrink-0 rounded-button-sm'
                                    style={{ backgroundColor: item.swatch }}
                                />
                                <span className='text-label-md font-semibold text-on-surface'>
                                    {item.name}
                                </span>
                            </div>
                        </div>
                        <div className='px-2.5 py-3'>
                            <div className='flex items-center justify-center gap-1.5'>
                                <button
                                    type='button'
                                    className='flex size-7 items-center justify-center rounded-button-sm border border-outline-variant text-outline'
                                    onClick={() => updateCartQty(item.id, item.qty - 1)}
                                >
                                    −
                                </button>
                                <span className='w-7 text-center text-label-lg font-bold text-on-surface'>
                                    {formatFaNumber(item.qty)}
                                </span>
                                <button
                                    type='button'
                                    className='flex size-7 items-center justify-center rounded-button-sm border border-outline-variant text-outline'
                                    onClick={() => updateCartQty(item.id, item.qty + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='px-2.5 py-3 text-left text-label-lg text-outline'>
                            {formatPrice(item.unitPrice)}
                        </div>
                        <div className='px-4 py-3 text-left text-label-lg font-bold text-on-surface'>
                            {formatPrice(item.qty * item.unitPrice)}
                        </div>
                        <div className='px-1 py-3'>
                            <IconButton
                                icon='delete300Linear'
                                iconClassName='size-4! text-outline'
                                onClick={() => removeCartItem(item.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <FactorItemAndPrice />
        </div>
    )
}

export default ItemsStep
