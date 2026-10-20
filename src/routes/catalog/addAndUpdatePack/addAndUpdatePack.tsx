'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { ItemCreateIn } from '@/src/api/types/admin/catalog'
import {
    useCreateItem,
    useSetItemImages,
} from '@/src/routes/catalog/hooks/catalog'
import { Button } from '@/src/shared/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import AdditionalSettingsTab from './components/AdditionalSettingsTab'
import DomainTab from './components/DomainTab'
import GalleryTab from './components/GalleryTab'
import InfoTab from './components/InfoTab'
import Pricing from './components/pricing'
import SalesRulesTab from './components/SalesRulesTab'
import {
    ADD_AND_UPDATE_PACK_DEFAULT_VALUES,
    addAndUpdatePackSchema,
    type AddAndUpdatePackFormValues,
} from './schema'
import { toSetItemImagesPayload } from './utils/toSetItemImagesPayload'

const toOptional = (value?: string | null) => {
    const trimmed = value?.trim()
    return trimmed ? trimmed : null
}

const toOptionalNumber = (value?: string | null) => {
    const trimmed = value?.trim()
    if (!trimmed) return null
    const parsed = Number(trimmed)
    return Number.isFinite(parsed) ? parsed : null
}

const toCreateItemBody = (values: AddAndUpdatePackFormValues): ItemCreateIn => {
    const policy = {
        min_order_qty: toOptionalNumber(values.min_order_qty),
        max_order_qty: toOptionalNumber(values.max_order_qty),
        max_preorder_qty: toOptionalNumber(values.max_preorder_qty),
    }
    const hasPolicy = Object.values(policy).some((value) => value !== null)

    return {
        product_id: values.product_id,
        variation_pattern: values.variation_pattern,
        unit_id: values.unit_id,
        components: values.components,
        display_name: toOptional(values.display_name),
        base_code: toOptional(values.base_code),
        description: toOptional(values.description),
        slug: toOptional(values.slug),
        meta_title: toOptional(values.meta_title),
        meta_description: toOptional(values.meta_description),
        show_in_public: values.show_in_public,
        allow_preorder: values.allow_preorder,
        status: values.status,
        visibility: {
            audience: values.audience,
            group_ids:
                values.audience === 'GROUPS' ? values.group_ids : undefined,
        },
        policy: hasPolicy ? policy : null,
    }
}

const AddAndUpdatePack = () => {
    const methods = useForm<AddAndUpdatePackFormValues>({
        resolver: zodResolver(addAndUpdatePackSchema),
        defaultValues: ADD_AND_UPDATE_PACK_DEFAULT_VALUES,
        mode: 'onChange',
    })
    const { mutateAsync: createItem, isPending: isCreating } = useCreateItem()
    const { mutateAsync: setItemImages, isPending: isUploadingImages } =
        useSetItemImages()
    const isPending = isCreating || isUploadingImages

    const onSubmit = async (values: AddAndUpdatePackFormValues) => {
        try {
            const item = await createItem(toCreateItemBody(values))
            const imagesPayload = toSetItemImagesPayload(values.gallery)

            if (imagesPayload) {
                await setItemImages({
                    itemId: item.id,
                    body: imagesPayload,
                })
            }

            toast.success('آیتم با موفقیت ایجاد شد')
            methods.reset(ADD_AND_UPDATE_PACK_DEFAULT_VALUES)
        } catch {
            toast.error('ایجاد آیتم انجام نشد')
        }
    }

    return (
        <FormProvider {...methods}>
            <form
                className='flex w-full flex-col gap-4'
                dir='rtl'
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <Tabs
                    defaultValue='gallery'
                    dir='rtl'
                    className='w-full rounded-card-lg bg-surface-container-lowest p-1'
                >
                    <TabsList className='h-auto w-full justify-start overflow-x-auto overflow-y-hidden border-b-4 border-outline-variant px-2 pb-0'>
                        {(
                            [
                                ['gallery', 'گالری'],
                                ['domain', 'دامنه نمایش'],
                                ['info', 'اطلاعات پایه'],
                                ['pricing', 'قیمت‌گذاری'],
                                ['sales-rules', 'قوانین فروش'],
                                ['seo', 'سئو'],
                            ] as const
                        ).map(([value, label]) => (
                            <TabsTrigger
                                key={value}
                                value={value}
                                className='mb-[-4px] data-[state=active]:mb-[-4px] data-[state=active]:[&:after]:bottom-0 data-[state=active]:[&:after]:h-1'
                            >
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value='gallery' className='p-4 pt-xl'>
                        <GalleryTab />
                    </TabsContent>
                    <TabsContent value='domain' className='p-4 pt-xl'>
                        <DomainTab />
                    </TabsContent>
                    <TabsContent value='info' className='p-4 pt-xl'>
                        <InfoTab />
                    </TabsContent>
                    <TabsContent value='pricing' className='p-4 pt-xl'>
                        <Pricing />
                    </TabsContent>
                    <TabsContent value='sales-rules' className='p-4 pt-xl'>
                        <SalesRulesTab />
                    </TabsContent>
                    <TabsContent value='seo' className='p-4 pt-xl'>
                        <AdditionalSettingsTab />
                    </TabsContent>
                </Tabs>

                <div className='flex justify-end'>
                    <Button type='submit' variant='primary' disabled={isPending}>
                        {isPending ? 'در حال ثبت...' : 'ثبت آیتم'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default AddAndUpdatePack
