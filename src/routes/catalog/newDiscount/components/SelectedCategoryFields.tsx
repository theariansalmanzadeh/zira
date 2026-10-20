'use client'

import { useMemo, useState } from 'react'
import { useListCategories } from '@/src/routes/catalog/hooks/catalog'
import { flattenCategories } from '@/src/routes/catalog/addAndUpdateProduct/utils/categories'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'

type SelectedCategoryFieldsProps = {
    value: string[]
    onChange: (value: string[]) => void
}

const SelectedCategoryFields = ({
    value,
    onChange,
}: SelectedCategoryFieldsProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const { data: categoryTree } = useListCategories()

    const categoryOptions = useMemo(
        () =>
            flattenCategories(categoryTree ?? []).map((category) => ({
                label: category.name,
                value: category.id,
            })),
        [categoryTree]
    )

    const toggleCategory = (categoryId: string) => {
        onChange(
            value.includes(categoryId)
                ? value.filter((id) => id !== categoryId)
                : [...value, categoryId]
        )
    }

    return (
        <FormDropdown
            label='دسته‌های منتخب'
            placeholder='انتخاب دسته'
            options={categoryOptions}
            checkedValues={value}
            onChange={toggleCategory}
            hasSearch
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
        />
    )
}

export default SelectedCategoryFields
