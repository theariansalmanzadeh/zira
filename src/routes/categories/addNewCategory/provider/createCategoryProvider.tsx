'use client'

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react'

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

const MAIN_ITEMS: CategoryItem[] = [
    {
        id: 'main-1',
        title: 'لباس زیر زنانه',
        detail: '۲ دسته میانی · ۲۰ خانواده',
        parentId: null,
    },
    {
        id: 'main-2',
        title: 'لباس خواب',
        detail: '۲ دسته میانی · ۱۰ خانواده',
        parentId: null,
    },
    {
        id: 'main-3',
        title: 'جوراب و ساق',
        detail: '۲ دسته میانی · ۱۰ خانواده',
        parentId: null,
    },
    {
        id: 'main-4',
        title: 'تیشرت و تاپ',
        detail: '۲ دسته میانی · ۱۰ خانواده',
        parentId: null,
    },
]

const MID_ITEMS: CategoryItem[] = [
    {
        id: 'mid-1',
        title: 'شورت و تانگا',
        detail: '۲ دسته فرعی · ۱۰ خانواده',
        parentId: 'main-1',
    },
    {
        id: 'mid-2',
        title: 'سوتین',
        detail: '۲ دسته فرعی · ۱۰ خانواده',
        parentId: 'main-1',
    },
    {
        id: 'mid-3',
        title: 'پیراهن خواب',
        detail: '۱ دسته فرعی · ۸ خانواده',
        parentId: 'main-2',
    },
    {
        id: 'mid-4',
        title: 'تاپ خواب',
        detail: '۱ دسته فرعی · ۶ خانواده',
        parentId: 'main-2',
    },
    {
        id: 'mid-5',
        title: 'جوراب ساق بلند',
        detail: '۱ دسته فرعی · ۴ خانواده',
        parentId: 'main-3',
    },
    {
        id: 'mid-6',
        title: 'جوراب مچی',
        detail: '۱ دسته فرعی · ۵ خانواده',
        parentId: 'main-3',
    },
    {
        id: 'mid-7',
        title: 'تیشرت',
        detail: '۲ دسته فرعی · ۱۲ خانواده',
        parentId: 'main-4',
    },
    {
        id: 'mid-8',
        title: 'تاپ',
        detail: '۱ دسته فرعی · ۷ خانواده',
        parentId: 'main-4',
    },
]

const SUB_ITEMS: CategoryItem[] = [
    {
        id: 'sub-1',
        title: 'نخی',
        detail: '۱۰ کالا',
        parentId: 'mid-1',
    },
    {
        id: 'sub-2',
        title: 'گیپور',
        detail: '۸ کالا',
        parentId: 'mid-1',
    },
    {
        id: 'sub-3',
        title: 'اسفنجی',
        detail: '۶ کالا',
        parentId: 'mid-2',
    },
    {
        id: 'sub-4',
        title: 'بدون فنر',
        detail: '۴ کالا',
        parentId: 'mid-2',
    },
    {
        id: 'sub-5',
        title: 'آستین کوتاه',
        detail: '۵ کالا',
        parentId: 'mid-3',
    },
    {
        id: 'sub-6',
        title: 'آستین بلند',
        detail: '۳ کالا',
        parentId: 'mid-4',
    },
    {
        id: 'sub-7',
        title: 'زیر زانو',
        detail: '۴ کالا',
        parentId: 'mid-5',
    },
    {
        id: 'sub-8',
        title: 'روزمره',
        detail: '۶ کالا',
        parentId: 'mid-6',
    },
    {
        id: 'sub-9',
        title: 'یقه‌گرد',
        detail: '۹ کالا',
        parentId: 'mid-7',
    },
    {
        id: 'sub-10',
        title: 'آستین حلقه‌ای',
        detail: '۷ کالا',
        parentId: 'mid-7',
    },
    {
        id: 'sub-11',
        title: 'بند نازک',
        detail: '۵ کالا',
        parentId: 'mid-8',
    },
]

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

const createItem = (
    title: string,
    detail: string,
    parentId: string | null
): CategoryItem => ({
    id: crypto.randomUUID(),
    title,
    detail,
    parentId,
})

const CreateCategoryProvider = ({ children }: { children: ReactNode }) => {
    const [mainItems, setMainItems] = useState<CategoryItem[]>(MAIN_ITEMS)
    const [midItems, setMidItems] = useState<CategoryItem[]>(MID_ITEMS)
    const [subItems, setSubItems] = useState<CategoryItem[]>(SUB_ITEMS)
    const [selectedMain, setSelectedMain] = useState<string | null>('main-1')
    const [selectedMid, setSelectedMid] = useState<string | null>(null)
    const [selectedSub, setSelectedSub] = useState<string | null>(null)

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
        setMainItems((current) => [
            ...current,
            createItem(title, '۰ دسته میانی · ۰ خانواده', null),
        ])
    }

    const addMid = (title: string) => {
        if (!selectedMain) return

        setMidItems((current) => [
            ...current,
            createItem(title, '۰ دسته فرعی · ۰ خانواده', selectedMain),
        ])
    }

    const addSub = (title: string) => {
        if (!selectedMain || !selectedMid) return

        setSubItems((current) => [
            ...current,
            createItem(title, '۰ کالا', selectedMid),
        ])
    }

    const removeMain = (id: string) => {
        const childMidIds = new Set(
            midItems
                .filter((item) => item.parentId === id)
                .map((item) => item.id)
        )

        setMainItems((current) => current.filter((item) => item.id !== id))
        setMidItems((current) =>
            current.filter((item) => item.parentId !== id)
        )
        setSubItems((current) =>
            current.filter((item) => !childMidIds.has(item.parentId ?? ''))
        )
        if (selectedMain === id) setSelectedMain(null)
        if (childMidIds.has(selectedMid ?? '')) setSelectedMid(null)
        if (
            childMidIds.has(
                subItems.find((item) => item.id === selectedSub)?.parentId ?? ''
            )
        ) {
            setSelectedSub(null)
        }
    }

    const removeMid = (id: string) => {
        setMidItems((current) => current.filter((item) => item.id !== id))
        setSubItems((current) =>
            current.filter((item) => item.parentId !== id)
        )
        if (selectedMid === id) setSelectedMid(null)
        if (
            subItems.find((item) => item.id === selectedSub)?.parentId === id
        ) {
            setSelectedSub(null)
        }
    }

    const removeSub = (id: string) => {
        setSubItems((current) => current.filter((item) => item.id !== id))
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
