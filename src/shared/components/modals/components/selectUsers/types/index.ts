export type SelectAnnouncementUserStatus = 'active' | 'inactive'

export type SelectAnnouncementUserItem = {
    id: string
    name: string
    personnelCode: string
    role: string
    branch: string
    status: SelectAnnouncementUserStatus
    roleId?: string
    branchId?: string
    phone?: string
}

export type SelectUsersModalData = {
    selectedIds?: string[]
    users?: SelectAnnouncementUserItem[]
    onConfirm?: (users: SelectAnnouncementUserItem[]) => void
}
