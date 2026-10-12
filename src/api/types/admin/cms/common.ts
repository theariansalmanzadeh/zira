export type CmsPage<T> = {
    total: number
    page: number
    page_size: number
    results: T[]
}
