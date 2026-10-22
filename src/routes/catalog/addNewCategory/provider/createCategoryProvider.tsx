'use client'

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import type { CategoryNodeOut } from '@/src/api/types/admin/catalog'
import {
    useCreateCategory as useCreateCategoryMutation,
    useDeleteCategory,
    useListCategories,
} from '@/src/routes/catalog/hooks/catalog'
import { formatFaNumber } from '@/src/shared/libs/formatter'

export type CategoryItem = {
    id: string
    title: string
    detail: string
    parentId: string | null
}

type CreateCategoryContextValue = {
    mainItems: CategoryItem[]
    midItems: CategoryItem[]
    subItems: CategoryItem[]
    selectedMain: string | null
    selectedMid: string | null
    selectedSub: string | null
    selectMain: (id: string) => void
    selectMid: (id: string) => void
    selectSub: (id: string) => void
    addMain: (title: string) => void
    addMid: (title: string) => void
    addSub: (title: string) => void
    removeMain: (id: string) => void
    removeMid: (id: string) => void
    removeSub: (id: string) => void
}

const toCategoryItem = (
    node: CategoryNodeOut,
    parentId: string | null,
    detail: string
): CategoryItem => ({
    id: node.id,
    title: node.name,
    detail,
    parentId,
})

const splitCategories = (nodes: CategoryNodeOut[]) => {
    const mainItems: CategoryItem[] = []
    const midItems: CategoryItem[] = []
    const subItems: CategoryItem[] = []

    for (const main of nodes) {
        const midChildren = main.children ?? []
        mainItems.push(
            toCategoryItem(
                main,
                null,
                `${formatFaNumber(midChildren.length)} دسته میانی · ${formatFaNumber(main.product_count ?? 0)} کالا`
            )
        )

        for (const mid of midChildren) {
            const subChildren = mid.children ?? []
            midItems.push(
                toCategoryItem(
                    mid,
                    main.id,
                    `${formatFaNumber(subChildren.length)} دسته فرعی · ${formatFaNumber(mid.product_count ?? 0)} کالا`
                )
            )

            for (const sub of subChildren) {
                subItems.push(
                    toCategoryItem(
                        sub,
                        mid.id,
                        `${formatFaNumber(sub.product_count ?? 0)} کالا`
                    )
                )
            }
        }
    }

    return { mainItems, midItems, subItems }
}

const CreateCategoryContext = createContext<CreateCategoryContextValue | null>(
    null
)

export function useCreateCategory() {
    const context = useContext(CreateCategoryContext)

    if (!context) {
        throw new Error(
            'useCreateCategory must be used within CreateCategoryProvider'
        )
    }

    return context
}

const CreateCategoryProvider = ({ children }: { children: ReactNode }) => {
    const { data } = useListCategories({ include_inactive: true })
    const { mutate: createCategory } = useCreateCategoryMutation()
    const { mutate: deleteCategory } = useDeleteCategory()
    const { mainItems, midItems, subItems } = useMemo(
        () => splitCategories(data ?? []),
        [data]
    )
    const [selectedMain, setSelectedMain] = useState<string | null>(null)
    const [selectedMid, setSelectedMid] = useState<string | null>(null)
    const [selectedSub, setSelectedSub] = useState<string | null>(null)

    const createNamedCategory = (name: string, parentId: string | null) => {
        createCategory({ name, parent_id: parentId })
    }

    const selectMain = (id: string) => {
        setSelectedMain(id)
        setSelectedMid(null)
        setSelectedSub(null)
    }

    const selectMid = (id: string) => {
        setSelectedMid(id)
        setSelectedSub(null)
    }

    const selectSub = (id: string) => {
        setSelectedSub(id)
    }

    const addMain = (title: string) => {
        createNamedCategory(title, null)
    }

    const addMid = (title: string) => {
        if (!selectedMain) return
        createNamedCategory(title, selectedMain)
    }

    const addSub = (title: string) => {
        if (!selectedMid) return
        createNamedCategory(title, selectedMid)
    }

    const removeMain = (id: string) => {
        deleteCategory(id)
        if (selectedMain === id) {
            setSelectedMain(null)
            setSelectedMid(null)
            setSelectedSub(null)
        }
    }

    const removeMid = (id: string) => {
        deleteCategory(id)
        if (selectedMid === id) {
            setSelectedMid(null)
            setSelectedSub(null)
        }
    }

    const removeSub = (id: string) => {
        deleteCategory(id)
        if (selectedSub === id) setSelectedSub(null)
    }

    const value = useMemo(
        () => ({
            mainItems,
            midItems,
            subItems,
            selectedMain,
            selectedMid,
            selectedSub,
            selectMain,
            selectMid,
            selectSub,
            addMain,
            addMid,
            addSub,
            removeMain,
            removeMid,
            removeSub,
        }),
        [
            mainItems,
            midItems,
            subItems,
            selectedMain,
            selectedMid,
            selectedSub,
        ]
    )

    return (
        <CreateCategoryContext.Provider value={value}>
            {children}
        </CreateCategoryContext.Provider>
    )
}

export default CreateCategoryProvider
