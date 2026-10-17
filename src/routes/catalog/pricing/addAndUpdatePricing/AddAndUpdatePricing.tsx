'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { AddProductItem } from '@/src/shared/components/modals/components/addProduct'
import {
    useCreatePriceList,
    useGetPriceList,
    useListContracts,
    useListPriceListLines,
    useUpdatePriceList,
} from '@/src/routes/catalog/hooks/pricing'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { Button } from '@/src/shared/components/ui/button'
import PricingForm from './components/PricingForm'
import PricingItemsTable, {
    type PricingItem,
} from './components/PricingItemsTable'

const mapProductToRow = (product: AddProductItem): PricingItem => ({
    id: product.id,
    code: product.sku,
    mainCategory: product.category || '—',
    midCategory: '—',
    name: product.productName,
    size: '—',
    colorLabel: product.colorLabel || '—',
    colorHex: product.colorHex,
    unit: 'عدد',
    currentPrice: null,
    newPrice: '',
})

const toDate = (value?: string | null) => {
    if (!value) return undefined
    const [year, month, day] = value.slice(0, 10).split('-').map(Number)
    if (!year || !month || !day) return undefined
    return new Date(year, month - 1, day)
}

const toApiDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

type AddAndUpdatePricingProps = {
    id?: string
}

const AddAndUpdatePricing = ({ id }: AddAndUpdatePricingProps) => {
    const { push } = useRouter()
    const [contractId, setContractId] = useState('')
    const [effectiveDate, setEffectiveDate] = useState<Date>()
    const [items, setItems] = useState<PricingItem[]>([])
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [loadedPriceListKey, setLoadedPriceListKey] = useState<string | null>(null)
    const [loadedLinesKey, setLoadedLinesKey] = useState<string | null>(null)
    const { data: priceList, isPending: isPriceListPending } = useGetPriceList(
        id ?? '',
        Boolean(id)
    )
    const { data: linesPage, isPending: isLinesPending } = useListPriceListLines(
        id ?? '',
        { page: 1, page_size: 100 },
        Boolean(id)
    )
    const { data: contracts } = useListContracts({ page: 1, page_size: 100 })
    const { mutate: createPriceList, isPending: isCreating } = useCreatePriceList()
    const { mutate: updatePriceList, isPending: isUpdating } = useUpdatePriceList()

    const priceListKey = priceList
        ? `${priceList.id}:${priceList.updated_at}`
        : null
    if (priceList && priceListKey !== loadedPriceListKey) {
        setLoadedPriceListKey(priceListKey)
        setContractId(priceList.contract_id ?? '')
        setEffectiveDate(toDate(priceList.effective_from))
    }

    const linesKey = linesPage
        ? `${id}:${linesPage.page}:${linesPage.total}`
        : null
    if (linesPage && linesKey !== loadedLinesKey) {
        setLoadedLinesKey(linesKey)
        setItems(
            linesPage.results.map((line) => ({
                id: line.item_id,
                code: line.code,
                mainCategory: '—',
                midCategory: '—',
                name: line.display_name,
                size: '—',
                colorLabel: '—',
                unit: 'عدد',
                currentPrice: line.current_price
                    ? Number(line.current_price)
                    : null,
                newPrice: line.new_price,
            }))
        )
    }

    const handleAddProducts = (products: AddProductItem[]) => {
        setItems((current) => {
            const existingIds = new Set(current.map((item) => item.id))
            const nextItems = products
                .filter((product) => !existingIds.has(product.id))
                .map(mapProductToRow)
            return [...current, ...nextItems]
        })
    }

    const handleNewPriceChange = (itemId: string, value: string) => {
        setItems((current) =>
            current.map((item) =>
                item.id === itemId ? { ...item, newPrice: value } : item
            )
        )
    }

    const handleSave = () => {
        const contract = contracts?.results.find((item) => item.id === contractId)
        const name = contract?.name || priceList?.name
        if (!name) {
            toast.error('قرارداد را انتخاب کنید')
            return
        }

        const lines = items
            .filter((item) => item.newPrice.trim())
            .map((item) => ({
                item_id: item.id,
                new_price: item.newPrice.trim(),
            }))
        if (lines.length === 0) {
            toast.error('برای هر کالا قیمت جدید را وارد کنید')
            return
        }

        const body = {
            name,
            effective_from: effectiveDate ? toApiDate(effectiveDate) : null,
            lines,
        }
        const onSuccess = () => {
            toast.success(id ? 'لیست قیمت به‌روزرسانی شد' : 'لیست قیمت ایجاد شد')
            push('/admin/catalog/pricing')
        }
        const onError = () => {
            toast.error(
                id
                    ? 'به‌روزرسانی لیست قیمت انجام نشد'
                    : 'ایجاد لیست قیمت انجام نشد'
            )
        }

        if (id) {
            updatePriceList({ pricelistId: id, body }, { onSuccess, onError })
            return
        }

        createPriceList(body, { onSuccess, onError })
    }

    if (id && (isPriceListPending || isLinesPending)) {
        return (
            <div className='flex justify-center py-10'>
                <Spinner className='size-6' />
            </div>
        )
    }

    return (
        <form
            id='add-edit-pricing-form'
            className='flex flex-col gap-4'
            dir='rtl'
            onSubmit={(event) => {
                event.preventDefault()
                if (isCreating || isUpdating) return
                handleSave()
            }}
        >
            <PricingForm
                contractId={contractId}
                effectiveDate={effectiveDate}
                selectedIds={items.map((item) => item.id)}
                onContractChange={setContractId}
                onDateChange={setEffectiveDate}
                onSubmit={handleAddProducts}
            />
            <PricingItemsTable
                items={items}
                selectedIds={selectedIds}
                onSelectedIdsChange={setSelectedIds}
                onNewPriceChange={handleNewPriceChange}
            />
            <div className='flex gap-3'>
                <Button
                    type='submit'
                    variant='primary'
                    isLoading={isCreating || isUpdating}
                >
                    ثبت لیست
                </Button>
                <Button
                    type='button'
                    variant='outline'
                    disabled={isCreating || isUpdating}
                    onClick={() => push('/admin/catalog/pricing')}
                >
                    انصراف
                </Button>
            </div>
        </form>
    )
}

export default AddAndUpdatePricing
