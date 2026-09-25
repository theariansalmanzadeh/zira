'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import {
    DEFAULT_CATEGORIES,
    type AddNewFaqModalData,
    type AddNewFaqPayload,
    type CategoryOption,
} from '@/src/shared/components/modals/components/addNewFaq/schema'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import {
    FAQ_CATEGORY_LABELS,
    FAQ_DUMMY,
    FAQ_TOGGLE_BUTTON_VALUE,
    OPEN_ADD_FAQ_EVENT,
    UPSERT_FAQ_EVENT,
    TABLE_COLOUMN,
    filterFaqs,
    type FaqCategoryId,
    type FaqRowData,
} from './constants'

const resolveCategoryId = (
    category: string,
    categories: CategoryOption[] = DEFAULT_CATEGORIES
) => {
    if (category in FAQ_CATEGORY_LABELS) return category
    return (
        categories.find((item) => item.label === category)?.id ??
        categories[0]?.id ??
        'material'
    )
}

const FaqContent = () => {
    const searchParams = useSearchParams()
    const { openModal } = useModalStore()
    const activeCategory = (searchParams.get('cat') ?? 'all') as
        | FaqCategoryId
        | string
    const [items, setItems] = useState<FaqRowData[]>(FAQ_DUMMY)
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const filteredItems = useMemo(
        () => filterFaqs(items, activeCategory),
        [items, activeCategory]
    )

    const updateItem = (id: string, patch: Partial<FaqRowData>) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
        )
    }

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
        if (expandedId === id) setExpandedId(null)
    }

    const openAddFaqModal = () => {
        const defaultCategoryId =
            activeCategory !== 'all' && activeCategory in FAQ_CATEGORY_LABELS
                ? activeCategory
                : 'material'

        openModal(ModalTypes.ADD_NEW_FAQ, {
            defaultValues: {
                categoryId: defaultCategoryId,
            },
        } satisfies AddNewFaqModalData)
    }

    const openEditFaqModal = (item: FaqRowData) => {
        openModal(ModalTypes.ADD_NEW_FAQ, {
            id: item.id,
            defaultValues: {
                categoryId: resolveCategoryId(item.category),
                question: item.question,
                answer: item.answer,
            },
        } satisfies AddNewFaqModalData)
    }

    useEffect(() => {
        const handleOpen = () => openAddFaqModal()
        window.addEventListener(OPEN_ADD_FAQ_EVENT, handleOpen)
        return () => window.removeEventListener(OPEN_ADD_FAQ_EVENT, handleOpen)
    }, [activeCategory, openModal])

    useEffect(() => {
        const handleUpsert = (event: Event) => {
            const payload = (event as CustomEvent<AddNewFaqPayload>).detail
            if (!payload) return

            const isKnownCategory = payload.categoryId in FAQ_CATEGORY_LABELS
            const category = isKnownCategory
                ? payload.categoryId
                : payload.categoryLabel

            if (payload.id) {
                updateItem(payload.id, {
                    question: payload.question,
                    answer: payload.answer,
                    category,
                })
                return
            }

            setItems((prev) => [
                {
                    id: String(Date.now()),
                    question: payload.question,
                    answer: payload.answer,
                    category,
                    createdAt: '2025-12-21T00:00:00.000Z',
                    visible: true,
                },
                ...prev,
            ])
        }

        window.addEventListener(UPSERT_FAQ_EVENT, handleUpsert)
        return () => window.removeEventListener(UPSERT_FAQ_EVENT, handleUpsert)
    }, [])

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value="all"
                toggleButtonValue={[...FAQ_TOGGLE_BUTTON_VALUE]}
                hasHeaderActions
            >
                <div className="rounded-card-lg bg-surface-container-high p-2">
                    <Table className="border-collapse border-spacing-y-4">
                        <TableHeader />
                        <TableBody>
                            {filteredItems.map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    data={item}
                                    index={index + 1}
                                    isExpanded={expandedId === item.id}
                                    onToggleExpand={() =>
                                        setExpandedId((prev) =>
                                            prev === item.id ? null : item.id
                                        )
                                    }
                                    onVisibleChange={(visible) =>
                                        updateItem(item.id, { visible })
                                    }
                                    onEdit={() => openEditFaqModal(item)}
                                    onDelete={() => removeItem(item.id)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    className="mt-2"
                    totalAmount={filteredItems.length}
                />
            </TableListLayout>
        </div>
    )
}

const Faq = () => (
    <Suspense fallback={null}>
        <FaqContent />
    </Suspense>
)

export default Faq
