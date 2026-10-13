import type {
    ListPublicProductsParams,
    SaleModeEnum,
    StorefrontSortEnum,
} from '@/src/api/types/public/catalog'

const PAGE_SIZE = 20

const SALE_MODES = new Set<SaleModeEnum>(['AVAILABLE', 'PRESALE', 'PREORDER'])

const SORTS = new Set<StorefrontSortEnum>([
    'newest',
    'name',
    'name-asc',
    'price-asc',
    'price-desc',
    'popular',
    'bestselling',
])

const listParam = (searchParams: URLSearchParams, key: string) => {
    const values = searchParams
        .getAll(key)
        .flatMap((value) => value.split(','))
        .map((value) => value.trim())
        .filter(Boolean)

    return values.length > 0 ? values : undefined
}

const numberParam = (
    searchParams: URLSearchParams,
    key: string,
    fallback: number
) => {
    const parsed = Number(searchParams.get(key))
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

export const toListPublicProductsParams = (
    searchParams: URLSearchParams
): ListPublicProductsParams => {
    const q = searchParams.get('q')
    const query = searchParams.get('query')
    const searchQuery = searchParams.get('search_query')
    const sort = searchParams.get('sort')
    const brand = searchParams.get('brand')
    const saleModes = listParam(searchParams, 'sale_modes')?.filter(
        (mode): mode is SaleModeEnum => SALE_MODES.has(mode as SaleModeEnum)
    )

    return {
        page: numberParam(searchParams, 'page', 1),
        page_size: numberParam(searchParams, 'page_size', PAGE_SIZE),
        query: query || q,
        q,
        search_query: searchQuery,
        category: searchParams.get('cat') || searchParams.get('category'),
        category_slugs: listParam(searchParams, 'category_slugs'),
        sale_modes: saleModes,
        brand_ids: listParam(searchParams, 'brand_ids') ?? (brand ? [brand] : undefined),
        material_ids: listParam(searchParams, 'material_ids'),
        label_ids: listParam(searchParams, 'label_ids'),
        season_ids: listParam(searchParams, 'season_ids'),
        sizes: listParam(searchParams, 'sizes'),
        colors: listParam(searchParams, 'colors'),
        sort: sort && SORTS.has(sort as StorefrontSortEnum)
            ? (sort as StorefrontSortEnum)
            : undefined,
    }
}

export const pageHref = (
    pathname: string,
    searchParams: URLSearchParams,
    page: number
) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    return `${pathname}?${params.toString()}`
}
