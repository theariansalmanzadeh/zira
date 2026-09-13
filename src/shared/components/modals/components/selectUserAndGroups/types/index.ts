export type SelectUserAndGroupsTab = 'user' | 'group'

export type SelectItemStatus = 'active' | 'inactive'

export type SelectUserItem = {
    id: string
    userName: string
    userId: string
    roles: string
    permissions: string
    status: SelectItemStatus
}

export type SelectGroupItem = {
    id: string
    groupTitle: string
    groupId: string
    groupRole: string
    usersCount: string
    status: SelectItemStatus
}

export type SelectUserAndGroupsModalData = {
    hasOnlyUsers?: boolean
    defaultTab?: SelectUserAndGroupsTab
    users?: SelectUserItem[]
    groups?: SelectGroupItem[]
    selectedIds?: string[]
    onSelect?: (payload: {
        tab: SelectUserAndGroupsTab
        selectedIds: string[]
    }) => void
}
