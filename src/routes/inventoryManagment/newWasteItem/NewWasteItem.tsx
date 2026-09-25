'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import DocumentFileUpload from '@/src/routes/contentManagment/liecense/new/components/DocumentFileUpload'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import {
    BOX_OPTIONS,
    PRODUCT_TYPE_OPTIONS,
    RACK_OPTIONS,
    RESPONSIBLE_OPTIONS,
    SHELF_OPTIONS,
    UNIT_OPTIONS,
    WAREHOUSE_OPTIONS,
    ZONE_OPTIONS,
    buildWarehouseAddress,
} from './constants'
import {
    NEW_WASTE_ITEM_DEFAULTS,
    newWasteItemSchema,
    type NewWasteItemFormValues,
} from './schema'

const formatFileSize = (file?: File | null) => {
    if (!file) return undefined
    const kb = file.size / 1024
    if (kb < 1024) return `${Math.round(kb)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
}

const NewWasteItem = () => {
    const { control, handleSubmit } = useForm<NewWasteItemFormValues>({
        resolver: zodResolver(newWasteItemSchema),
        defaultValues: NEW_WASTE_ITEM_DEFAULTS,
    })

    const [zoneId, rackId, shelfId, boxId] = useWatch({
        control,
        name: ['zoneId', 'rackId', 'shelfId', 'boxId'],
    })

    const generatedAddress = buildWarehouseAddress(
        zoneId,
        rackId,
        shelfId,
        boxId
    )

    const onSubmit = (_values: NewWasteItemFormValues) => {}

    return (
        <form
            className='grid grid-cols-4 gap-4 rounded-card-lg bg-surface-container-lowest p-6'
            dir='rtl'
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className='col-span-4 text-title-md font-bold text-on-surface'>
                مشخصات کالا
            </h2>
            <Controller
                name='productType'
                control={control}
                render={({ field }) => (
                    <FormDropdown
                        label='نوع محصول'
                        value={field.value}
                        options={PRODUCT_TYPE_OPTIONS}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                name='productCode'
                control={control}
                render={({ field }) => (
                    <Input
                        label='کد محصول'
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                name='productName'
                control={control}
                render={({ field }) => (
                    <Input
                        label='نام محصول'
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                name='unit'
                control={control}
                render={({ field }) => (
                    <FormDropdown
                        label='واحد'
                        value={field.value}
                        options={UNIT_OPTIONS}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                name='quantity'
                control={control}
                render={({ field }) => (
                    <Input
                        label='تعداد'
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                name='date'
                control={control}
                render={({ field }) => (
                    <CalendarButton
                        label='تاریخ'
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />

            <h2 className='col-span-4 mt-2 text-title-md font-bold text-on-surface'>
                محل و مسئول
            </h2>
            <Controller
                name='warehouseId'
                control={control}
                render={({ field }) => (
                    <FormDropdown
                        label='نام انبار'
                        value={field.value}
                        options={WAREHOUSE_OPTIONS}
                        onChange={field.onChange}
                    />
                )}
            />

            <div className='col-span-4 flex flex-col gap-4 rounded-card-lg border border-outline-variant bg-surface-container-high/40 p-4'>
                <span className='text-label-lg font-medium text-on-surface'>
                    آدرس کالا در انبار (انتخاب مرحله‌ای)
                </span>
                <div className='grid grid-cols-4 gap-3'>
                    <Controller
                        name='zoneId'
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label='ناحیه (Zone)'
                                value={field.value}
                                options={ZONE_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name='rackId'
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label='قفسه (Rack)'
                                value={field.value}
                                options={RACK_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name='shelfId'
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label='طبقه (Shelf)'
                                value={field.value}
                                options={SHELF_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        name='boxId'
                        control={control}
                        render={({ field }) => (
                            <FormDropdown
                                label='جعبه (Box)'
                                value={field.value}
                                options={BOX_OPTIONS}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
                <div className='border-t border-dashed border-outline-variant' />
                <div className='flex flex-row items-center gap-3'>
                    <span className='text-label-md text-on-surface-variant'>
                        آدرس تولید شده
                    </span>
                    {generatedAddress ? (
                        <Pill
                            text={generatedAddress}
                            variant='success'
                            className='border-0'
                        />
                    ) : null}
                </div>
            </div>

            <Controller
                name='responsibleId'
                control={control}
                render={({ field }) => (
                    <FormDropdown
                        label='نام مسئول انبار'
                        value={field.value}
                        options={RESPONSIBLE_OPTIONS}
                        onChange={field.onChange}
                    />
                )}
            />

            <div className='col-span-4 mt-2 flex flex-col gap-3'>
                <h2 className='text-title-md font-bold text-on-surface'>
                    مستندات و توضیحات
                </h2>
                <span className='text-label-md text-on-surface-variant'>
                    تصویر کالای آسیب‌دیده
                </span>
                <Controller
                    name='image'
                    control={control}
                    render={({ field }) => (
                        <DocumentFileUpload
                            fileName={field.value?.name}
                            fileSize={formatFileSize(field.value)}
                            onChange={(file) => field.onChange(file ?? null)}
                        />
                    )}
                />
                <label className='text-label-md text-on-surface-variant'>
                    توضیحات
                </label>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            value={field.value}
                            onChange={(event) =>
                                field.onChange(event.target.value)
                            }
                            placeholder='وضعیت کالا و دلایل از بین رفتن کیفیت...'
                            className='min-h-28 rounded-card-lg border border-outline-variant bg-surface-container-lowest'
                        />
                    )}
                />
            </div>
        </form>
    )
}

export default NewWasteItem
