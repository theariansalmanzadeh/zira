import type { UserDepartment } from './user'

export type AdminProfile = {
    id: string
    username?: string | null
    email?: string | null
    phone_number: string
    user_type: string
    is_superuser: boolean
    is_branch_master: boolean
    primary_branch_id?: string | null
    active_branch_id?: string | null
    branch_ids: string[]
    accessible_branch_ids: string[]
    permission_codes: string[]
    permissions: string[]
    departments: UserDepartment[]
}

export type GetStaffProfileResponse = AdminProfile

export type ChangeMyPasswordRequest = {
    old_password: string
    new_password: string
}

export type ChangeMyPasswordResponse = {
    message: string
}

export type StaffNotificationDelivery = {
    id: string
    notification_id: string
    title: string
    body: string
    topic: string
    priority: string
    status: string
    target_type?: string | null
    target_id?: string | null
    sent_at?: string | null
    seen_at?: string | null
    dismissed_at?: string | null
    created_at: string
}

export type ListStaffNotificationsResponse = {
    total: number
    page: number
    page_size: number
    results: StaffNotificationDelivery[]
}

export type DeliveryActionRequest = {
    delivery_ids: string[]
}

export type StaffNotificationPreference = {
    user_id: string
    topic: string
    sms_enabled: boolean
    in_app_enabled: boolean
}

export type GetStaffNotificationPreferencesResponse =
    StaffNotificationPreference[]

export type UpdateStaffNotificationPreferenceItem = {
    topic: string
    sms_enabled?: boolean
    in_app_enabled?: boolean
}

export type UpdateStaffNotificationPreferencesRequest =
    UpdateStaffNotificationPreferenceItem[]

export type UpdateStaffNotificationPreferencesResponse =
    StaffNotificationPreference[]
