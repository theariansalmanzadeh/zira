import type { User } from '@/src/api/types/admin/user'

export type UserListFilter = {
    job_title: string
    username: string
    first_name: string
    phone_number: string
}

export const EMPTY_USER_LIST_FILTER: UserListFilter = {
    job_title: '',
    username: '',
    first_name: '',
    phone_number: '',
}

const includes = (value: string | undefined, query: string) => {
    const needle = query.trim().toLowerCase()
    if (!needle) return true
    return (value ?? '').toLowerCase().includes(needle)
}

export const filterUsers = (users: User[], filter: UserListFilter) =>
    users.filter(
        (user) =>
            includes(user.job_title, filter.job_title) &&
            includes(user.username, filter.username) &&
            includes(user.first_name, filter.first_name) &&
            includes(user.phone_number, filter.phone_number)
    )
