export type SelectRoleItem = {
    id: string
    name: string
    slug: string
    category: string
    memberCount: number
}

export type SelectBasedOnRoleModalData = {
    selectedIds?: string[]
    roles?: SelectRoleItem[]
    onConfirm?: (roles: SelectRoleItem[]) => void
}
