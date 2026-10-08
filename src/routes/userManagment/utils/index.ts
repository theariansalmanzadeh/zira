export type UserStatus = 'active' | 'inactive' | 'locked'

type StatusConfig = {
    variant: 'success' | 'tonal' | 'warning' | 'error'
    text: string
}

export const statusType = (status: UserStatus): StatusConfig => {
    if (status === 'active') {
        return { variant: 'success', text: 'فعال' }
    }

    if (status === 'locked') {
        return { variant: 'warning', text: 'قفل' }
    }

    return { variant: 'tonal', text: 'غیرفعال' }
}
