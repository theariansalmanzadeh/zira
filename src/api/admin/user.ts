import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../http'
import type {
    CreateStaffUserRequest,
    CreateStaffUserResponse,
    CreateUserRequest,
    CreateUserResponse,
    GetUserDepartmentsResponse,
    GetUserResponse,
    ListStaffUsersResponse,
    ListUserBranchesResponse,
    ListUserSessionsResponse,
    ListUsersResponse,
    MessageResponse,
    SetUserDepartmentsRequest,
    SetUserDepartmentsResponse,
    UpdateUserBranchMasterRequest,
    UpdateUserBranchMasterResponse,
    UpdateUserRequest,
    UpdateUserResponse,
    UpdateUserStatusRequest,
    UpdateUserStatusResponse,
    UserBranchAccessRequest,
} from '../types/admin/user'

export const listStaffUsers = (config?: AxiosRequestConfig) =>
    staffAuthGet<ListStaffUsersResponse>('/auth/staff', config)

export const createStaffUser = (
    body: CreateStaffUserRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreateStaffUserResponse, CreateStaffUserRequest>(
        '/auth/staff',
        body,
        config
    )

export const listUsers = (config?: AxiosRequestConfig) =>
    staffAuthGet<ListUsersResponse>('/auth/users', config)

export const createUser = (
    body: CreateUserRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreateUserResponse, CreateUserRequest>(
        '/auth/users',
        body,
        config
    )

export const getUser = (userId: string, config?: AxiosRequestConfig) =>
    staffAuthGet<GetUserResponse>(`/auth/users/${userId}`, config)

export const updateUser = (
    userId: string,
    body: UpdateUserRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<UpdateUserResponse, UpdateUserRequest>(
        `/auth/users/${userId}`,
        body,
        config
    )

export const updateUserStatus = (
    userId: string,
    body: UpdateUserStatusRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<UpdateUserStatusResponse, UpdateUserStatusRequest>(
        `/auth/users/${userId}/status`,
        body,
        config
    )

export const resetUserPassword = (
    userId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<MessageResponse>(
        `/auth/users/${userId}/password`,
        undefined,
        config
    )

export const listUserSessions = (
    userId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListUserSessionsResponse>(
        `/auth/users/${userId}/sessions`,
        config
    )

export const listUserBranches = (
    userId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListUserBranchesResponse>(
        `/auth/users/${userId}/branches`,
        config
    )

export const grantUserBranches = (
    userId: string,
    body: UserBranchAccessRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ListUserBranchesResponse, UserBranchAccessRequest>(
        `/auth/users/${userId}/branches`,
        body,
        config
    )

export const revokeUserBranches = (
    userId: string,
    body: UserBranchAccessRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<MessageResponse, UserBranchAccessRequest>(
        `/auth/users/${userId}/branches`,
        body,
        config
    )

export const updateUserBranchMaster = (
    userId: string,
    body: UpdateUserBranchMasterRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<
        UpdateUserBranchMasterResponse,
        UpdateUserBranchMasterRequest
    >(`/auth/users/${userId}/branch-master`, body, config)

export const getUserDepartments = (
    userId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetUserDepartmentsResponse>(
        `/auth/users/${userId}/departments`,
        config
    )

export const setUserDepartments = (
    userId: string,
    body: SetUserDepartmentsRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<SetUserDepartmentsResponse, SetUserDepartmentsRequest>(
        `/auth/users/${userId}/departments`,
        body,
        config
    )
