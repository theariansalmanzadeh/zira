export type AccessPermissionItem = {
    id: string
    label: string
    checked: boolean
}

export type AccessPermissionGroup = {
    id: string
    label: string
    items: AccessPermissionItem[]
}

export type ConfirmAccessModalData = {
    onApply?: (groups: AccessPermissionGroup[]) => void
}
