'use client'

import { useMemo, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import type { ItemListOut, ProductListOut } from '@/src/api/types/admin/catalog'
import {
    useListItems,
    useListProducts,
} from '@/src/routes/catalog/hooks/catalog'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import ColorPill from '@/src/shared/components/ui/ColorPill'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { Input } from '@/src/shared/components/ui/Input'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { AddAndUpdatePackFormValues } from '../schema'
import PricingFilters, { FILTER_DEFAULTS } from './PricingFilters'
import PricingTableHeader from './PricingTableHeader'
import PricingTableRow from './PricingTableRow'
import {
    usePricingGridStyle,
    type PricingItem,
} from './pricingTableShared'

const ALL = 'all'

const PRODUCT_COLUMNS: TableFilterItem[] = [
    { id: 'code', header_label: 'کد خانواده', isChecked: true },
    { id: 'name', header_label: 'نام خانواده', isChecked: true },
    { id: 'category', header_label: 'دسته‌بندی', isChecked: true },
    { id: 'brand', header_label: 'برند', isChecked: true },
    { id: 'material', header_label: 'جنس', isChecked: true },
    { id: 'model', header_label: 'طرح و مدل', isChecked: true },
    { id: 'items', header_label: 'تعداد کالا', isChecked: true },
]

const ITEM_COLUMNS: TableFilterItem[] = [
    { id: 'code', header_label: 'کد کالا', isChecked: true },
    { id: 'name', header_label: 'نام کالا', isChecked: true },
    { id: 'size', header_label: 'سایز', isChecked: true },
    { id: 'color', header_label: 'رنگ', isChecked: true },
    { id: 'grade', header_label: 'گرید', isChecked: true },
]

const mapProductToPricingItem = (product: ProductListOut): PricingItem => ({
    id: product.id,
    code: product.code,
    name: product.name,
    categoryId: product.category_id,
    categoryName: product.category_name,
    brandId: product.brand_id,
    brandName: product.brand_name,
    materialName: product.material_name,
    modelLineName: product.model_line_name,
    sizeCount: product.size_count,
    colorCount: product.color_count,
    itemCount: product.item_count,
})

const matchesFilter = (value: string, selected: string) =>
    selected === ALL || value === selected

const InheritedSpecs = ({ product }: { product?: PricingItem }) => {
    const specs = [
        { label: 'مسیر دسته‌بندی', value: product?.categoryName || '—' },
        { label: 'برند', value: product?.brandName || '—' },
        { label: 'طرح و مدل', value: product?.modelLineName || '—' },
        { label: 'جنس', value: product?.materialName || '—' },
    ]

    return (
        <div className='flex flex-col gap-4 rounded-card-lg bg-surface-container-lowest p-6'>
            <div className='flex items-center gap-2'>
                <span className='h-5 w-1 shrink-0 rounded-full bg-error' />
                <span className='text-title-md font-bold text-on-surface'>
                    مشخصات به ارث رسیده از خانواده
                </span>
            </div>
            <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
                {specs.map((spec) => (
                    <div
                        key={spec.label}
                        className='flex flex-col items-center gap-2 rounded-card-md border border-outline-variant px-3 py-4 text-center'
                    >
                        <span className='text-label-sm text-outline'>
                            {spec.label}
                        </span>
                        <span className='text-label-lg text-on-surface'>
                            {spec.value}
                        </span>
                    </div>
                ))}
            </div>
            <span className='text-label-sm text-outline'>
                این مقادیر از خانواده انتخاب‌شده خوانده می‌شوند و در آیتم قابل
                ویرایش نیستند.
            </span>
        </div>
    )
}

type ComponentItemRowProps = {
    item: ItemListOut
    checked: boolean
    showAmount: boolean
    amount: string
    onAmountChange: (value: string) => void
    onCheckedChange: (checked: boolean) => void
}

const ComponentItemRow = ({
    item,
    checked,
    showAmount,
    amount,
    onAmountChange,
    onCheckedChange,
}: ComponentItemRowProps) => {
    const { visibleTableColoumn } = useTable()
    const gridStyle = usePricingGridStyle(showAmount)

    const cells: Record<string, React.ReactNode> = {
        code: (
            <label className='flex items-center gap-2'>
                <Checkbox
                    variant='default-outline'
                    checked={checked}
                    onCheckedChange={(next) => onCheckedChange(next === true)}
                />
                <span>{item.code || item.sku}</span>
            </label>
        ),
        name: <span className='truncate'>{item.display_name}</span>,
        size: item.size_code || '—',
        color: item.color_hex ? (
            <ColorPill
                hex={item.color_hex}
                label={item.color_code || item.color_hex}
            />
        ) : (
            item.color_code || '—'
        ),
        grade: formatFaNumber(item.grade),
    }

    return (
        <div
            className='grid items-center rounded-card-md bg-surface-container-lowest px-2 py-3 text-label-lg font-normal text-on-surface-variant'
            style={gridStyle}
        >
            {visibleTableColoumn.map((column) => (
                <div key={column.id} className='min-w-0 px-2'>
                    {cells[column.id]}
                </div>
            ))}
            {showAmount && (
                <div className='min-w-0 px-2'>
                    {checked && (
                        <Input
                            value={amount}
                            onChange={onAmountChange}
                            placeholder='تعداد'
                            type='number'
                            wrapperClassName='py-2'
                        />
                    )}
                </div>
            )}
        </div>
    )
}

const Pricing = () => {
    const { setValue } = useFormContext<AddAndUpdatePackFormValues>()
    const productId = useWatch<AddAndUpdatePackFormValues, 'product_id'>({
        name: 'product_id',
    })
    const components = useWatch<AddAndUpdatePackFormValues, 'components'>({
        name: 'components',
    })

    const [filters, setFilters] = useState(FILTER_DEFAULTS)
    const [amounts, setAmounts] = useState<Record<string, string>>({})

    const {
        data: productsData,
        isPending: productsPending,
        isError: productsError,
    } = useListProducts({
        page: 1,
        page_size: 100,
        q: filters.search.trim() || undefined,
        category_id:
            filters.categoryId !== ALL ? filters.categoryId : undefined,
        brand_id: filters.brandId !== ALL ? filters.brandId : undefined,
    })

    const {
        data: itemsData,
        isPending: itemsPending,
        isError: itemsError,
    } = useListItems(
        {
            page: 1,
            page_size: 100,
            product_id: productId || undefined,
            is_pack: false,
        },
        Boolean(productId)
    )

    const products = useMemo(
        () => (productsData?.results ?? []).map(mapProductToPricingItem),
        [productsData]
    )

    const selectedProduct = useMemo(
        () => products.find((item) => item.id === productId),
        [products, productId]
    )

    const selectedComponentIds = useMemo(
        () => (components ?? []).map((component) => component.item_id),
        [components]
    )
    const showAmount = selectedComponentIds.length > 0
    const goods = itemsData?.results ?? []

    const filteredProducts = useMemo(() => {
        const query = filters.search.trim()
        return products.filter((item) => {
            const matchesSearch =
                !query ||
                item.name.includes(query) ||
                item.code.toLowerCase().includes(query.toLowerCase()) ||
                item.brandName.includes(query) ||
                item.modelLineName.includes(query)

            return (
                matchesSearch &&
                matchesFilter(item.categoryId, filters.categoryId) &&
                matchesFilter(item.brandId, filters.brandId)
            )
        })
    }, [filters, products])

    const selectProduct = (id: string, checked: boolean) => {
        const nextProductId = checked ? id : ''
        setValue('product_id', nextProductId, {
            shouldDirty: true,
            shouldValidate: true,
        })
        setValue('components', [], { shouldDirty: true, shouldValidate: true })
        setAmounts({})
    }

    const syncComponents = (
        nextSelectedIds: string[],
        nextAmounts: Record<string, string>
    ) => {
        setValue(
            'components',
            nextSelectedIds.map((id) => ({
                item_id: id,
                quantity: Math.max(1, Number(nextAmounts[id] || 1)),
            })),
            { shouldDirty: true, shouldValidate: true }
        )
    }

    const toggleComponent = (id: string, checked: boolean) => {
        const nextSelectedIds = checked
            ? [...selectedComponentIds, id]
            : selectedComponentIds.filter((itemId) => itemId !== id)
        const nextAmounts = { ...amounts }
        if (checked) {
            nextAmounts[id] = nextAmounts[id] || '1'
        } else {
            delete nextAmounts[id]
        }
        setAmounts(nextAmounts)
        syncComponents(nextSelectedIds, nextAmounts)
    }

    const handleAmountChange = (id: string, value: string) => {
        const nextAmounts = { ...amounts, [id]: value }
        setAmounts(nextAmounts)
        syncComponents(selectedComponentIds, nextAmounts)
    }

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <PricingFilters filters={filters} onChange={setFilters} />

            <div className='flex flex-col gap-2'>
                <span className='text-title-sm font-bold text-on-surface'>
                    انتخاب خانواده کالا
                </span>
                <TableListLayout
                    TableColoumn={PRODUCT_COLUMNS}
                    hasHeaderActions={false}
                    hasSearch={false}
                    hasFilter={false}
                    hasSort={false}
                    hasTableSettings={false}
                    hasExpand={false}
                >
                    <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                        <PricingTableHeader />
                        {productsPending ? (
                            <TableLoadingSkeleton isPending rows={4} />
                        ) : null}
                        {productsError ? (
                            <div className='rounded-card-md bg-surface-container-lowest px-4 py-8 text-center text-label-md text-outline'>
                                دریافت لیست خانواده‌ها با خطا مواجه شد.
                            </div>
                        ) : null}
                        {!productsPending &&
                        !productsError &&
                        filteredProducts.length === 0 ? (
                            <TableEmptyState
                                colSpan={PRODUCT_COLUMNS.length}
                                title='خانواده‌ای یافت نشد.'
                            />
                        ) : null}
                        {!productsPending &&
                            !productsError &&
                            filteredProducts.map((item) => (
                                <PricingTableRow
                                    key={item.id}
                                    item={item}
                                    checked={productId === item.id}
                                    onCheckedChange={(checked) =>
                                        selectProduct(item.id, checked)
                                    }
                                />
                            ))}
                    </div>
                </TableListLayout>
            </div>

            <InheritedSpecs product={selectedProduct} />

            {productId ? (
                <div className='flex flex-col gap-2'>
                    <span className='text-title-sm font-bold text-on-surface'>
                        کالاهای تشکیل‌دهنده آیتم
                    </span>
                    <TableListLayout
                        TableColoumn={ITEM_COLUMNS}
                        hasHeaderActions={false}
                        hasSearch={false}
                        hasFilter={false}
                        hasSort={false}
                        hasTableSettings={false}
                        hasExpand={false}
                    >
                        <div className='flex flex-col gap-2 rounded-card-lg bg-surface-container-high p-2'>
                            <PricingTableHeader showAmount={showAmount} />
                            {itemsPending ? (
                                <TableLoadingSkeleton isPending rows={4} />
                            ) : null}
                            {itemsError ? (
                                <div className='rounded-card-md bg-surface-container-lowest px-4 py-8 text-center text-label-md text-outline'>
                                    دریافت لیست کالاها با خطا مواجه شد.
                                </div>
                            ) : null}
                            {!itemsPending &&
                            !itemsError &&
                            goods.length === 0 ? (
                                <TableEmptyState
                                    colSpan={ITEM_COLUMNS.length}
                                    title='کالایی برای این خانواده یافت نشد.'
                                />
                            ) : null}
                            {!itemsPending &&
                                !itemsError &&
                                goods.map((item) => (
                                    <ComponentItemRow
                                        key={item.id}
                                        item={item}
                                        checked={selectedComponentIds.includes(
                                            item.id
                                        )}
                                        showAmount={showAmount}
                                        amount={
                                            amounts[item.id] ??
                                            String(
                                                components?.find(
                                                    (component) =>
                                                        component.item_id ===
                                                        item.id
                                                )?.quantity ?? ''
                                            )
                                        }
                                        onAmountChange={(value) =>
                                            handleAmountChange(item.id, value)
                                        }
                                        onCheckedChange={(checked) =>
                                            toggleComponent(item.id, checked)
                                        }
                                    />
                                ))}
                        </div>
                    </TableListLayout>
                </div>
            ) : null}
        </div>
    )
}

export default Pricing
