export type PaginatedResponse<T> = {
    total: number
    page: number
    page_size: number
    results: T[]
}

export type PaginationParams = {
    page?: number | null
    page_size?: number | null
}
