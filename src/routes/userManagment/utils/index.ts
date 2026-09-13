export type UserStatus = 'active' | 'not_active'

type StatusConfig = {
    variant: 'success' | 'tonal'
    text: string
}

export const statusType = (status: UserStatus): StatusConfig => {
    if (status === 'active') {
        return { variant: 'success', text: 'فعال' }
    }

    return { variant: 'tonal', text: 'غیرفعال' }
}
