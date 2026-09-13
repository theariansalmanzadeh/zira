export type DepartmentSettingTab = 'details' | 'experts'

export type DepartmentExpertStatus = 'active' | 'inactive'

export type DepartmentExpert = {
    userName: string
    userId: string
    status: DepartmentExpertStatus
    avatarUrl?: string
}

export type DepartmentDetails = {
    name: string
    id: string
    section: string
    managerName: string
    managerAvatarUrl?: string
    slaResponse: string
    responseHours: string
    status: string
    description: string
}

export type DepartmentSettingModalData = {
    details?: DepartmentDetails
    experts?: DepartmentExpert[]
    defaultTab?: DepartmentSettingTab
    onEdit?: () => void
    onAddExpert?: () => void
    onDeleteDepartment?: () => void
}
