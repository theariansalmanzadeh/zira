'use client'

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from 'react'
import { DEFAULT_GROUPS, DEFAULT_USERS, PAGE_SIZE, TOTAL_ITEMS } from '../constants'
import type {
    SelectGroupItem,
    SelectUserAndGroupsModalData,
    SelectUserAndGroupsTab,
    SelectUserItem,
} from '../types'

type SelectUserAndGroupsContextValue = {
    activeTab: SelectUserAndGroupsTab
    setActiveTab: Dispatch<SetStateAction<SelectUserAndGroupsTab>>
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>
    page: number
    setPage: Dispatch<SetStateAction<number>>
    selectedIds: Set<string>
    filteredItems: SelectUserItem[] | SelectGroupItem[]
    headerCheckboxState: boolean | 'indeterminate'
    toggleItemSelection: (id: string, checked: boolean) => void
    toggleAllOnPage: (checked: boolean | 'indeterminate') => void
    handleSelectUser: () => void
    handleSelectGroup: () => void
    pageStart: number
    pageEnd: number
    closeModal: () => void
}

const SelectUserAndGroupsContext =
    createContext<SelectUserAndGroupsContextValue | null>(null)

export const useSelectUserAndGroups = () => {
    const context = useContext(SelectUserAndGroupsContext)

    if (!context) {
        throw new Error(
            'useSelectUserAndGroups must be used within SelectUserAndGroupsProvider'
        )
    }

    return context
}

type SelectUserAndGroupsProviderProps = {
    children: ReactNode
    modalData?: SelectUserAndGroupsModalData | null
    closeModal: () => void
}

export const SelectUserAndGroupsProvider = ({
    children,
    modalData,
    closeModal,
}: SelectUserAndGroupsProviderProps) => {
    const [activeTab, setActiveTab] = useState<SelectUserAndGroupsTab>(
        modalData?.defaultTab ?? 'user'
    )
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        () => new Set(modalData?.selectedIds ?? ['user-0'])
    )

    const users = modalData?.users ?? DEFAULT_USERS
    const groups = modalData?.groups ?? DEFAULT_GROUPS
    const currentItemIds = (activeTab === 'user' ? users : groups).map((item) => item.id)

    const filteredItems = useMemo((): SelectUserItem[] | SelectGroupItem[] => {
        const query = searchQuery.trim().toLowerCase()

        if (activeTab === 'user') {
            if (!query) return users
            return users.filter(
                (user) =>
                    user.userName.toLowerCase().includes(query) ||
                    user.userId.toLowerCase().includes(query)
            )
        }

        if (!query) return groups
        return groups.filter(
            (group) =>
                group.groupTitle.toLowerCase().includes(query) ||
                group.groupId.toLowerCase().includes(query)
        )
    }, [activeTab, users, groups, searchQuery])

    const selectedOnPageCount = currentItemIds.filter((id) => selectedIds.has(id)).length
    const headerCheckboxState =
        selectedOnPageCount === 0
            ? false
            : selectedOnPageCount === currentItemIds.length
              ? true
              : 'indeterminate'

    const toggleItemSelection = (id: string, checked: boolean) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (checked) {
                next.add(id)
            } else {
                next.delete(id)
            }
            return next
        })
    }

    const toggleAllOnPage = (checked: boolean | 'indeterminate') => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            currentItemIds.forEach((id) => {
                if (checked === true) {
                    next.add(id)
                } else {
                    next.delete(id)
                }
            })
            return next
        })
    }

    const handleSelectUser = () => {
        const selectedUsers = users.filter((user) => selectedIds.has(user.id))
        modalData?.onSelectUser?.(selectedUsers)
        closeModal()
    }

    const handleSelectGroup = () => {
        const selectedGroups = groups.filter((group) => selectedIds.has(group.id))
        modalData?.onSelectGroup?.(selectedGroups)
        closeModal()
    }

    const pageStart = (page - 1) * PAGE_SIZE + 1
    const pageEnd = Math.min(page * PAGE_SIZE, TOTAL_ITEMS)

    const value: SelectUserAndGroupsContextValue = {
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        selectedIds,
        filteredItems,
        headerCheckboxState,
        toggleItemSelection,
        toggleAllOnPage,
        handleSelectUser,
        handleSelectGroup,
        pageStart,
        pageEnd,
        closeModal,
    }

    return (
        <SelectUserAndGroupsContext.Provider value={value}>
            {children}
        </SelectUserAndGroupsContext.Provider>
    )
}
