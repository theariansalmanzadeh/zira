import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthPatch,
    staffAuthPost,
} from '../http'
import type {
    CreateRoleRequest,
    CreateRoleResponse,
    GetRoleMatrixResponse,
    GetRoleResponse,
    ListRolesParams,
    ListRolesResponse,
    ListRoleAssignmentsParams,
    ListRoleAssignmentsResponse,
    UpdateRoleRequest,
    UpdateRoleResponse,
} from '../types/admin/role'

export const listRoles = (
    params?: ListRolesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListRolesResponse>('/rbac/roles', {
        ...config,
        params: {
            ...config?.params,
            ...params,
        },
    })

export const createRole = (
    body: CreateRoleRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreateRoleResponse, CreateRoleRequest>(
        '/rbac/roles',
        body,
        config
    )

export const listRoleAssignments = (
    params?: ListRoleAssignmentsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListRoleAssignmentsResponse>('/rbac/roles/assignments', {
        ...config,
        params: {
            ...config?.params,
            ...params,
        },
    })

export const getRole = (roleId: string, config?: AxiosRequestConfig) =>
    staffAuthGet<GetRoleResponse>(`/rbac/roles/${roleId}`, config)

export const getRoleMatrix = (roleId: string, config?: AxiosRequestConfig) =>
    staffAuthGet<GetRoleMatrixResponse>(
        `/rbac/roles/${roleId}/matrix`,
        config
    )

export const updateRole = (
    roleId: string,
    body: UpdateRoleRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateRoleResponse, UpdateRoleRequest>(
        `/rbac/roles/${roleId}`,
        body,
        config
    )

export const deleteRole = (roleId: string, config?: AxiosRequestConfig) =>
    staffAuthDelete(`/rbac/roles/${roleId}`, undefined, config)
