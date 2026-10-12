'use client'

import { useState } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import CategoryColumn from './component/CategoryColumn'
import CreateCategoryProvider, {
    useCreateCategory,
} from './provider/createCategoryProvider'

const crumbLabel = (title?: string) => title || '( — )'

const matchesQuery = (title: string, query: string) =>
    title.toLowerCase().includes(query.trim().toLowerCase())

const CategoryBoard = () => {
    const {
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
    } = useCreateCategory()
    const [query, setQuery] = useState('')

    const selectedMainItem = mainItems.find((item) => item.id === selectedMain)
    const selectedMidItem = midItems.find((item) => item.id === selectedMid)
    const selectedSubItem = subItems.find((item) => item.id === selectedSub)

    const visibleMainItems = mainItems.filter((item) =>
        matchesQuery(item.title, query)
    )
    const visibleMidItems = midItems.filter(
        (item) =>
            item.parentId === selectedMain && matchesQuery(item.title, query)
    )
    const visibleSubItems = subItems.filter(
        (item) =>
            item.parentId === selectedMid && matchesQuery(item.title, query)
    )

    return (
        <div
            className='flex w-full flex-col gap-5 rounded-card-lg bg-surface-container-lowest p-5'
            dir='rtl'
        >
            <div className='flex flex-wrap items-center justify-between gap-4'>
                <div className='flex min-w-0 flex-wrap items-center gap-3'>
                    <span className='h-6 w-1 shrink-0 rounded-full bg-error' />
                    <h2 className='text-title-lg font-bold text-on-surface'>
                        لیست دسته‌بندی‌ها
                    </h2>
                    <span className='text-body-md text-outline'>
                        {crumbLabel(selectedMainItem?.title)} —{' '}
                        {crumbLabel(selectedMidItem?.title)} —{' '}
                        {crumbLabel(selectedSubItem?.title)}
                    </span>
                </div>
                <div className='w-full max-w-72'>
                    <Input
                        iconId='search400Linear'
                        value={query}
                        placeholder='جستجو در همه سطوح...'
                        wrapperClassName='bg-surface-container-lowest border border-outline-variant'
                        onChange={setQuery}
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <CategoryColumn
                    indexLabel='۱'
                    title='دسته اصلی'
                    count={mainItems.length}
                    items={visibleMainItems}
                    selectedId={selectedMain}
                    placeholder='نام دسته اصلی'
                    canAdd
                    onSelect={selectMain}
                    onAdd={addMain}
                    onRemove={removeMain}
                />
                <CategoryColumn
                    indexLabel='۲'
                    title='دسته میانی'
                    count={midItems.length}
                    items={visibleMidItems}
                    selectedId={selectedMid}
                    placeholder='نام دسته میانی'
                    emptyMessage={
                        selectedMain
                            ? undefined
                            : 'ابتدا یک دسته اصلی را انتخاب کنید.'
                    }
                    canAdd={Boolean(selectedMain)}
                    onSelect={selectMid}
                    onAdd={addMid}
                    onRemove={removeMid}
                />
                <CategoryColumn
                    indexLabel='۳'
                    title='دسته فرعی'
                    count={subItems.length}
                    items={visibleSubItems}
                    selectedId={selectedSub}
                    placeholder='نام دسته فرعی'
                    emptyMessage={
                        selectedMid
                            ? undefined
                            : 'ابتدا یک دسته میانی را انتخاب کنید.'
                    }
                    canAdd={Boolean(selectedMain && selectedMid)}
                    onSelect={selectSub}
                    onAdd={addSub}
                    onRemove={removeSub}
                />
            </div>
        </div>
    )
}

const AddNewCategory = () => {
    return (
        <CreateCategoryProvider>
            <CategoryBoard />
        </CreateCategoryProvider>
    )
}

export default AddNewCategory
