'use client'

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import type { FaqItemOut } from '@/src/api/types/admin/cms/faq'
import {
    useArchiveFaqItem,
    useListFaqCategories,
    useListFaqItems,
    useUpdateFaqItem,
} from '@/src/routes/contentManagment/hooks/faq'
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
    OPEN_ADD_FAQ_EVENT,
    UPSERT_FAQ_EVENT,
    TABLE_COLOUMN,
    filterFaqs,
    type FaqCategoryId,
    type FaqRowData,
} from './constants'

const toFaqRow = (item: FaqItemOut): FaqRowData => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
    category: item.category_name,
    categoryId: item.category_id,
    createdAt: item.created_at,
    visible: item.is_visible,
})

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
    const { data: categoryPage } = useListFaqCategories()
    const { data: faqPage } = useListFaqItems(
        activeCategory !== 'all' ? { category_id: activeCategory } : undefined
    )
    const { mutate: archiveFaqItem } = useArchiveFaqItem()
    const { mutate: updateFaqItem } = useUpdateFaqItem()
    const toggleButtonValue = useMemo(
        () => [
            { label: 'همه', value: 'all' },
            ...(categoryPage?.results ?? []).map((category) => ({
                label: category.name,
                value: category.id,
            })),
        ],
        [categoryPage]
    )
    const serverItems = useMemo(
        () => (faqPage?.results ?? []).map(toFaqRow),
        [faqPage]
    )
    const [items, setItems] = useState<FaqRowData[]>([])
    const [expandedId, setExpandedId] = useState<string | null>(null)

    useEffect(() => {
        setItems(serverItems)
    }, [serverItems])

    const filteredItems = useMemo(
        () => filterFaqs(items, activeCategory),
        [items, activeCategory]
    )

    const updateItem = useCallback(
        (id: string, patch: Partial<FaqRowData>) => {
            const categoryId =
                patch.categoryId ??
                (patch.category
                    ? categoryPage?.results.find(
                          (category) =>
                              category.id === patch.category ||
                              category.name === patch.category
                      )?.id
                    : undefined)

            updateFaqItem({
                itemId: id,
                body: {
                    ...(patch.question !== undefined
                        ? { question: patch.question }
                        : {}),
                    ...(patch.answer !== undefined
                        ? { answer: patch.answer }
                        : {}),
                    ...(patch.visible !== undefined
                        ? { is_visible: patch.visible }
                        : {}),
                    ...(categoryId ? { category_id: categoryId } : {}),
                },
            })

            setItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, ...patch } : item
                )
            )
        },
        [categoryPage?.results, updateFaqItem]
    )

    const removeItem = (id: string) => {
        archiveFaqItem(
            { itemId: id },
            {
                onSuccess: () => {
                    if (expandedId === id) setExpandedId(null)
                },
            }
        )
    }

    const openAddFaqModal = () => {
        const defaultCategoryId =
            activeCategory !== 'all' ? activeCategory : undefined

        openModal(ModalTypes.ADD_NEW_FAQ, {
            defaultValues: {
                ...(defaultCategoryId ? { categoryId: defaultCategoryId } : {}),
            },
        } satisfies AddNewFaqModalData)
    }

    const openEditFaqModal = (item: FaqRowData) => {
        openModal(ModalTypes.ADD_NEW_FAQ, {
            id: item.id,
            defaultValues: {
                categoryId: item.categoryId ?? resolveCategoryId(item.category),
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
    }, [updateItem])

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value="all"
                toggleButtonValue={toggleButtonValue}
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
                    totalAmount={faqPage?.total ?? filteredItems.length}
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
