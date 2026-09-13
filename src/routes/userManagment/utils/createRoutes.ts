import type { UserManagementSearchParams } from '../index'
import type { TableListTabValue } from './tabSearchParams'

const CREATE_ROUTE_MAP: Record<TableListTabValue, string> = {
    groups: '/admin/user-management/create-new-group',
    users: '/admin/user-management/create-new-user',
    role: '/admin/user-management/create-new-role',
}

export function getCreateRouteFromSearchParams(
    params: UserManagementSearchParams
): string {
    if (params.group !== undefined) {
        return CREATE_ROUTE_MAP.groups
    }

    if (params.role !== undefined) {
        return CREATE_ROUTE_MAP.role
    }

    return CREATE_ROUTE_MAP.users
}

export function getCreateRouteFromTab(tab: TableListTabValue): string {
    return CREATE_ROUTE_MAP[tab]
}
