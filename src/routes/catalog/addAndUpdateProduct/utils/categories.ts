import type { CategoryNodeOut } from '@/src/api/types/admin/catalog'
import type { DropdownOption } from '../types'

export type FlatCategory = {
    id: string
    name: string
    level: number
    parentId: string | null
}

export const flattenCategories = (nodes: CategoryNodeOut[]): FlatCategory[] => {
    const seen = new Set<string>()
    const result: FlatCategory[] = []

    const walk = (
        items: CategoryNodeOut[],
        depth: number,
        parentId: string | null
    ) => {
        for (const node of items) {
            if (seen.has(node.id)) continue
            seen.add(node.id)

            const level = node.level > 0 ? node.level : depth
            result.push({
                id: node.id,
                name: node.name,
                level,
                parentId: node.parent_id ?? parentId,
            })

            if (node.children?.length) {
                walk(node.children, level + 1, node.id)
            }
        }
    }

    walk(nodes, 1, null)
    return result
}

export const toCategoryOptions = (
    categories: FlatCategory[],
    level: number
): DropdownOption[] =>
    categories
        .filter((category) => category.level === level)
        .map((category) => ({ label: category.name, value: category.id }))

export const categoryName = (
    categories: FlatCategory[],
    id: string,
    fallback: string
) => categories.find((category) => category.id === id)?.name || fallback
