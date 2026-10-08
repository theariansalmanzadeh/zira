import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthGet,
    staffAuthPatch,
    staffAuthPost,
} from '../http'
import type {
    CreateDepartmentRequest,
    CreateDepartmentResponse,
    GetDepartmentResponse,
    ListDepartmentPickerResponse,
    ListDepartmentsResponse,
    UpdateDepartmentRequest,
    UpdateDepartmentResponse,
} from '../types/admin/department'

export const listDepartmentPicker = (config?: AxiosRequestConfig) =>
    staffAuthGet<ListDepartmentPickerResponse>(
        '/auth/departments/picker',
        config
    )

export const createDepartment = (
    body: CreateDepartmentRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreateDepartmentResponse, CreateDepartmentRequest>(
        '/auth/departments',
        body,
        config
    )

export const listDepartments = (config?: AxiosRequestConfig) =>
    staffAuthGet<ListDepartmentsResponse>('/auth/departments', config)

export const getDepartment = (
    departmentId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetDepartmentResponse>(
        `/auth/departments/${departmentId}`,
        config
    )

export const updateDepartment = (
    departmentId: string,
    body: UpdateDepartmentRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateDepartmentResponse, UpdateDepartmentRequest>(
        `/auth/departments/${departmentId}`,
        body,
        config
    )
