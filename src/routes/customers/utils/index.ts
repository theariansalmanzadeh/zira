import {
    CUSTOMERS_SUB_PARAMS,
    type CustomersSubParam,
} from '../constants'

export const getCustomersSectionKey = (sub: string): CustomersSubParam =>
    CUSTOMERS_SUB_PARAMS.includes(sub as CustomersSubParam)
        ? (sub as CustomersSubParam)
        : 'dashboard'

export const getCustomersSectionKeyFromPath = (
    pathname: string,
    searchParams: Pick<URLSearchParams, 'get'>
): string | null => {
    if (pathname.startsWith('/admin/customers/newGroup')) return 'newGroup'
    if (pathname.startsWith('/admin/customers/new')) return 'new'
    if (pathname.startsWith('/admin/customers/groupDetails/')) {
        return 'groupDetails'
    }
    if (pathname.startsWith('/admin/customers/customerGroupDetails/')) {
        return 'customerGroupDetails'
    }
    if (pathname.startsWith('/admin/customers/requestDetails/')) {
        return 'requestDetails'
    }
    if (pathname.startsWith('/admin/customers/') && pathname !== '/admin/customers/') {
        return 'details'
    }

    const sub = searchParams.get('sub')
    if (!sub) return 'dashboard'

    return CUSTOMERS_SUB_PARAMS.includes(sub as CustomersSubParam) ? sub : 'dashboard'
}
