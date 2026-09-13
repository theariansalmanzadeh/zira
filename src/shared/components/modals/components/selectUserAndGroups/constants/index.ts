import { type SelectGroupItem, type SelectUserItem, type SelectItemStatus } from "../types";

export const STATUS_CONFIG: Record<
    SelectItemStatus,
    { text: string; variant: 'success' | 'tonal' }
> = {
    active: { text: 'فعال', variant: 'success' },
    inactive: { text: 'غیرفعال', variant: 'tonal' },
}

export const TOGGLE_OPTIONS = [
    { label: 'کاربر', value: 'user' },
    { label: 'گروه کاربر', value: 'group' },
] as const

export const DEFAULT_USERS: SelectUserItem[] = Array.from({ length: 8 }, (_, index) => ({
    id: `user-${index}`,
    userName: 'نام کاربر',
    userId: 'PR0239',
    roles: '-',
    permissions: '-',
    status: index === 4 ? 'inactive' : 'active',
}))

export const DEFAULT_GROUPS: SelectGroupItem[] = Array.from({ length: 8 }, (_, index) => ({
    id: `group-${index}`,
    groupTitle: 'عنوان',
    groupId: 'PR0239',
    groupRole: '-',
    usersCount: '-',
    status: index === 4 ? 'inactive' : 'active',
}))

export const PAGE_SIZE = 8
export const TOTAL_ITEMS = 100
