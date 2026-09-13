import { create } from 'zustand'

export type TableFilterItem = {
    id: string
    header_label: string
    isChecked: boolean
    className?: string
}

type TableActionsState = {
    sort: boolean
    search: string
    filter: TableFilterItem[]
    setSort: (sort: boolean) => void
    setSearch: (search: string) => void
    setFilter: (filter: TableFilterItem[]) => void
    toggleFilter: (id: string) => void
    resetTableActions: () => void
}

export const useTableActionsStore = create<TableActionsState>((set) => ({
    sort: false,
    search: '',
    filter: [],
    setSort: (sort) => set({ sort }),
    setSearch: (search) => set({ search }),
    setFilter: (filter) => set({ filter }),
    toggleFilter: (id) =>
        set((state) => ({
            filter: state.filter.map((item) =>
                item.id === id
                    ? { ...item, isChecked: !item.isChecked }
                    : item
            ),
        })),
    resetTableActions: () => set({ sort: false, search: '', filter: [] }),
}))
