'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/src/shared/components/ui/button'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { cn } from '@/src/shared/libs/utils'
import type { IconLabel } from '@/src/shared/types/icon'
import type { BaseModalProps } from '@/src/shared/components/modals/types'

export type AddProductItem = {
    id: string
    productName: string
    imgUrl?: string
    sku: string
    brand: string
    category: string
    stock: string
    status: 'active' | 'diactive' | 'pending'
}

export type AddProductModalData = {
    selectedIds?: string[]
    onConfirm?: (products: AddProductItem[]) => void
    addProduct?: (product: AddProductItem) => void
    removeProduct?: (id: string) => void
}

const ADD_PRODUCT_DUMMY: AddProductItem[] = [
    {
        id: '1',
        productName: 'بادی گیپور',
        imgUrl: '/images/product1.jpg',
        sku: '۷۶۲۳-۷۳۵۲',
        brand: 'Lorenzo',
        category: 'لباس زیر زنانه',
        stock: '۴۲۰ آیتم در ۲ متغیر',
        status: 'pending',
    },
    {
        id: '2',
        productName: 'ست لباس خواب ساتن',
        imgUrl: '/images/product1.jpg',
        sku: '۸۴۱۲-۹۰۳۱',
        brand: 'Victoria',
        category: 'لباس خواب',
        stock: '۱۵۶ آیتم در ۳ متغیر',
        status: 'active',
    },
    {
        id: '3',
        productName: 'شورت کشی مشکی',
        imgUrl: '/images/product1.jpg',
        sku: '۵۵۰۱-۲۲۸۷',
        brand: 'Lorenzo',
        category: 'لباس زیر زنانه',
        stock: '۸۹۰ آیتم در ۱ متغیر',
        status: 'active',
    },
    {
        id: '4',
        productName: 'سوتین پوش دار',
        imgUrl: '/images/product1.jpg',
        sku: '۳۳۰۹-۶۱۴۴',
        brand: 'Calvin Klein',
        category: 'لباس زیر زنانه',
        stock: '۲۴۵ آیتم در ۴ متغیر',
        status: 'diactive',
    },
    {
        id: '5',
        productName: 'تاپ ورزشی زنانه',
        imgUrl: '/images/product1.jpg',
        sku: '۹۹۲۰-۴۵۶۳',
        brand: 'Nike',
        category: 'لباس ورزشی',
        stock: '۳۱۲ آیتم در ۲ متغیر',
        status: 'pending',
    },
]

const ALL_OPTION = [{ label: 'همه', value: 'all' }]

const MAIN_CATEGORY_OPTIONS = [
    ...ALL_OPTION,
    { label: 'لباس زنانه', value: 'women' },
    { label: 'لباس مردانه', value: 'men' },
]

const SUB_CATEGORY_OPTIONS = [
    ...ALL_OPTION,
    { label: 'لباس زیر', value: 'underwear' },
    { label: 'لباس خواب', value: 'sleepwear' },
]

const TURNOVER_OPTIONS = [
    ...ALL_OPTION,
    { label: 'پرفروش', value: 'hot' },
    { label: 'متوسط', value: 'medium' },
    { label: 'کم‌گردش', value: 'low' },
]

const SIZE_OPTIONS = [
    ...ALL_OPTION,
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
]

const COLOR_OPTIONS = [
    ...ALL_OPTION,
    { label: 'مشکی', value: 'black' },
    { label: 'سفید', value: 'white' },
]

const MODEL_OPTIONS = [
    ...ALL_OPTION,
    { label: 'کلاسیک', value: 'classic' },
    { label: 'اسپرت', value: 'sport' },
]

const STATUS_META: Record<
    AddProductItem['status'],
    { text: string; variant: 'success' | 'warning' | 'tonal'; icon: IconLabel }
> = {
    active: { text: 'فعال', variant: 'success', icon: 'checkCircle' },
    diactive: { text: 'غیرفعال', variant: 'warning', icon: 'closeCircle400Linear' },
    pending: { text: 'در حال بررسی', variant: 'tonal', icon: 'clockDashed' },
}

const TABLE_HEADERS = [
    '',
    'عنوان محصول',
    'SKU',
    'برند',
    'دسته‌بندی',
    'موجودی',
    'وضعیت',
] as const

const ProductsTable = ({
    products,
    selectedIds,
    onToggle,
    onToggleAll,
}: {
    products: AddProductItem[]
    selectedIds: Set<string>
    onToggle: (id: string) => void
    onToggleAll: (checked: boolean) => void
}) => {
    const allSelected =
        products.length > 0 && products.every((product) => selectedIds.has(product.id))
    const someSelected = products.some((product) => selectedIds.has(product.id))

    return (
        <div className='overflow-hidden rounded-card-lg bg-surface-container-high p-2'>
            <Table className='min-w-[720px] border-collapse border-spacing-y-4'>
                <TableHeader className='rounded-xl'>
                    <TableRow className='hover:bg-transparent [&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline'>
                        <TableHead className='w-[48px]'>
                            <Checkbox
                                className='size-6! overflow-hidden'
                                checked={
                                    allSelected
                                        ? true
                                        : someSelected
                                            ? 'indeterminate'
                                            : false
                                }
                                onCheckedChange={(checked) =>
                                    onToggleAll(checked === true)
                                }
                            />
                        </TableHead>
                        {TABLE_HEADERS.slice(1).map((label) => (
                            <TableHead key={label}>{label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => {
                        const status = STATUS_META[product.status]
                        const checked = selectedIds.has(product.id)

                        return (
                            <>
                                <TableRow
                                    key={product.id}
                                    className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant'
                                >
                                    <TableCell className='w-[48px]'>
                                        <Checkbox
                                            className='size-6! overflow-hidden mr-2.5'
                                            checked={checked}
                                            onCheckedChange={() => onToggle(product.id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex flex-row items-center gap-3'>
                                            <div className='h-10 w-10 overflow-hidden rounded-card-md bg-surface-container-highest'>
                                                {product.imgUrl && (
                                                    <Image
                                                        src={product.imgUrl}
                                                        alt={product.productName}
                                                        width={40}
                                                        height={40}
                                                        className='h-full w-full object-cover'
                                                    />
                                                )}
                                            </div>
                                            <span className='font-semibold text-on-surface'>
                                                {product.productName}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>
                                        <Pill
                                            className='border-0'
                                            icon={status.icon}
                                            variant={status.variant}
                                            text={status.text}
                                        />
                                    </TableCell>
                                </TableRow>
                                <div className='h-[2px]' />
                            </>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

const AdvancedSearchFields = ({
    values,
    onChange,
}: {
    values: {
        mainCategory: string
        subCategory: string
        turnover: string
        size: string
        color: string
        model: string
        query: string
    }
    onChange: (key: keyof typeof values, value: string) => void
}) => (
    <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <FormDropdown
                label='دسته اصلی'
                value={values.mainCategory}
                options={MAIN_CATEGORY_OPTIONS}
                onChange={(value) => onChange('mainCategory', value)}
            />
            <FormDropdown
                label='دسته فرعی'
                value={values.subCategory}
                options={SUB_CATEGORY_OPTIONS}
                onChange={(value) => onChange('subCategory', value)}
            />
            <FormDropdown
                label='گردش کالا'
                value={values.turnover}
                options={TURNOVER_OPTIONS}
                onChange={(value) => onChange('turnover', value)}
            />
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <FormDropdown
                label='سایز'
                value={values.size}
                options={SIZE_OPTIONS}
                onChange={(value) => onChange('size', value)}
            />
            <FormDropdown
                label='رنگ'
                value={values.color}
                options={COLOR_OPTIONS}
                onChange={(value) => onChange('color', value)}
            />
            <FormDropdown
                label='مدل'
                value={values.model}
                options={MODEL_OPTIONS}
                onChange={(value) => onChange('model', value)}
            />
        </div>
        <Input
            label='نام یا کد کالا'
            value={values.query}
            onChange={(value) => onChange('query', value)}
            placeholder='...جستجو'
            iconId='search400Linear'
            iconClassName='text-on-surface'
        />
    </div>
)

const AddProduct = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as AddProductModalData | null | undefined
    const [selectedIds, setSelectedIds] = useState(
        () => new Set(modalData?.selectedIds ?? [])
    )
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        mainCategory: 'all',
        subCategory: 'all',
        turnover: 'all',
        size: 'all',
        color: 'all',
        model: 'all',
        query: '',
    })

    const filteredBySearch = useMemo(() => {
        const query = searchQuery.trim()
        if (!query) return ADD_PRODUCT_DUMMY
        return ADD_PRODUCT_DUMMY.filter(
            (product) =>
                product.productName.includes(query) ||
                product.sku.includes(query) ||
                product.brand.includes(query) ||
                product.category.includes(query)
        )
    }, [searchQuery])

    const filteredByAdvanced = useMemo(() => {
        const query = filters.query.trim()
        if (!query) return ADD_PRODUCT_DUMMY
        return ADD_PRODUCT_DUMMY.filter(
            (product) =>
                product.productName.includes(query) ||
                product.sku.includes(query)
        )
    }, [filters.query])

    const toggleProduct = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const toggleAll = (products: AddProductItem[], checked: boolean) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            products.forEach((product) => {
                if (checked) next.add(product.id)
                else next.delete(product.id)
            })
            return next
        })
    }

    const handleConfirm = () => {
        const selected = ADD_PRODUCT_DUMMY.filter((product) =>
            selectedIds.has(product.id)
        )
        const initialIds = new Set(modalData?.selectedIds ?? [])

        if (modalData?.addProduct || modalData?.removeProduct) {
            initialIds.forEach((id) => {
                if (!selectedIds.has(id)) {
                    modalData.removeProduct?.(id)
                }
            })
            selected.forEach((item) => {
                if (!initialIds.has(item.id)) {
                    modalData.addProduct?.(item)
                }
            })
        }

        modalData?.onConfirm?.(selected)
        closeModal()
    }

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <Tabs defaultValue='all-products' dir='rtl' className='w-full'>
                <TabsList className='w-full justify-start overflow-x-auto overflow-y-hidden border-b-0!'>
                    <TabsTrigger value='all-products' className='border-b-0!'>
                        کل کالا ها
                    </TabsTrigger>
                    <TabsTrigger value='advanced-search' className='border-b-0!'>
                        جست و جو پیشرفته
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='all-products' className='flex flex-col gap-4 pt-xl'>
                    <Input
                        dir='rtl'
                        value={searchQuery}
                        onChange={setSearchQuery}
                        iconId='search400Linear'
                        label='جستجو'
                        placeholder='جستجو با نام یا شناسه کالا...'
                        wrapperClassName='w-full flex-row-reverse'
                        className='text-right'
                    />
                    <ProductsTable
                        products={filteredBySearch}
                        selectedIds={selectedIds}
                        onToggle={toggleProduct}
                        onToggleAll={(checked) => toggleAll(filteredBySearch, checked)}
                    />
                </TabsContent>

                <TabsContent
                    value='advanced-search'
                    className='flex flex-col gap-4 pt-xl'
                >
                    <AdvancedSearchFields
                        values={filters}
                        onChange={(key, value) =>
                            setFilters((prev) => ({ ...prev, [key]: value }))
                        }
                    />
                    <ProductsTable
                        products={filteredByAdvanced}
                        selectedIds={selectedIds}
                        onToggle={toggleProduct}
                        onToggleAll={(checked) =>
                            toggleAll(filteredByAdvanced, checked)
                        }
                    />
                </TabsContent>
            </Tabs>

            <div className='flex flex-row items-center justify-between gap-3 pt-2'>
                <Button type='button' variant='ghost' onClick={closeModal}>
                    انصراف
                </Button>
                <Button
                    type='button'
                    variant='primary'
                    onClick={handleConfirm}
                    className={cn(selectedIds.size === 0 && 'opacity-60')}
                    disabled={selectedIds.size === 0}
                >
                    افزودن انتخاب‌شده‌ها
                </Button>
            </div>
        </div>
    )
}

export default AddProduct
