'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/src/shared/components/ui/Input'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Button } from '@/src/shared/components/ui/button'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import type { InventoryProductItem } from '@/src/shared/components/modals/components/inventoryProducts'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import SelectedItemsTable from './components/SelectedItemsTable'
import {
    WAREHOUSE_CODE_BY_VALUE,
    WAREHOUSE_OPTIONS,
} from './constants'
import {
    CHANGE_ADDRESS_FORM_DEFAULT_VALUES,
    changeAddressFormSchema,
    mapProductsToFormItems,
    type ChangeAddressFormValues,
} from './schema'

const ChangeAddressForm = () => {
    const openModal = useModalStore((state) => state.openModal)
    const methods = useForm<ChangeAddressFormValues>({
        resolver: zodResolver(changeAddressFormSchema),
        defaultValues: CHANGE_ADDRESS_FORM_DEFAULT_VALUES,
        mode: 'onSubmit',
    })
    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = methods

    const warehouseId = watch('warehouseId')
    const items = watch('items')
    const warehouseCode =
        WAREHOUSE_CODE_BY_VALUE[warehouseId] ??
        CHANGE_ADDRESS_FORM_DEFAULT_VALUES.warehouseCode

    const handleWarehouseChange = (value: string) => {
        setValue('warehouseId', value, { shouldValidate: true })
        setValue(
            'warehouseCode',
            WAREHOUSE_CODE_BY_VALUE[value] ?? warehouseCode,
            { shouldValidate: true }
        )
    }

    const handleOpenProductsModal = () => {
        openModal(ModalTypes.INVENTORY_PRODUCTS, {
            warehouseName: WAREHOUSE_OPTIONS.find(
                (option) => option.value === warehouseId
            )?.label,
            selectedIds: items.map((item) => item.id),
            onConfirm: (products: InventoryProductItem[]) => {
                setValue('items', mapProductsToFormItems(products, items), {
                    shouldValidate: true,
                    shouldDirty: true,
                })
            },
        })
    }

    const onSubmit = (_values: ChangeAddressFormValues) => {
        // Submit wiring can be connected to API later.
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-6'
                dir='rtl'
            >
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <Input
                        label='کد انبار'
                        value={warehouseCode}
                        readOnly
                        wrapperClassName='bg-surface-container-high'
                    />
                    <FormDropdown
                        label='نام انبار'
                        value={warehouseId}
                        options={WAREHOUSE_OPTIONS}
                        onChange={handleWarehouseChange}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-label-md text-on-surface-variant'>
                        انتخاب محصول
                    </span>
                    <button
                        type='button'
                        onClick={handleOpenProductsModal}
                        className='flex w-full flex-row items-center justify-between rounded-container-lg border border-dashed border-primary/50 bg-surface-container-lowest px-4 py-3 text-right transition-colors hover:bg-primary/5'
                    >
                        <span className='text-label-lg text-on-surface-variant'>
                            {items.length > 0
                                ? `${formatFaNumber(items.length)} کالا انتخاب شده`
                                : 'محصولی انتخاب نشده است'}
                        </span>
                        <span className='text-label-md font-medium text-primary'>
                            انتخاب از موجودی انبار
                        </span>
                    </button>
                    <p className='text-label-sm text-outline'>
                        فهرست کامل کالاهای موجود در این انبار با جستجو و فیلتر
                        باز می‌شود؛ امکان انتخاب چند کالا وجود دارد.
                    </p>
                    {errors.items?.message && (
                        <span className='text-label-sm text-error'>
                            {errors.items.message}
                        </span>
                    )}
                    {errors.items?.root?.message && (
                        <span className='text-label-sm text-error'>
                            {errors.items.root.message}
                        </span>
                    )}
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-label-md text-on-surface-variant'>
                        اقلام انتخاب شده
                    </span>
                    <SelectedItemsTable />
                </div>

                <div className='flex flex-col gap-3 border-t border-outline-variant/40 pt-4'>
                    <span className='text-label-lg font-medium text-on-surface'>
                        آدرس جدید در انبار (انتخاب مرحله‌ای)
                    </span>
                    <div className='min-h-24 rounded-container-lg bg-surface-container-high' />
                </div>

                <Button type='submit' variant='primary' className='self-end'>
                    ثبت تغییر آدرس
                </Button>
            </form>
        </FormProvider>
    )
}

export default ChangeAddressForm
