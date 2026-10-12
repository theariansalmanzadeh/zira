import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../http'
import type {
    AssignBranchEmployeeRequest,
    AssignBranchEmployeeResponse,
    CreateBranchRequest,
    CreateBranchResponse,
    CreateCashBoxRequest,
    CreateCashBoxResponse,
    CreatePosDeviceRequest,
    CreatePosDeviceResponse,
    CreateWarehouseRequest,
    CreateWarehouseResponse,
    GetBranchNetworkResponse,
    GetBranchPermitsResponse,
    GetBranchResponse,
    GetCashBoxResponse,
    GetCompanyResponse,
    GetPosDeviceResponse,
    GetWarehouseResponse,
    LinkBranchWarehouseRequest,
    ListBranchAssortmentResponse,
    ListBranchEmployeesResponse,
    ListBranchesParams,
    ListBranchesResponse,
    ListBranchWarehousesResponse,
    ListCashBoxesParams,
    ListCashBoxesResponse,
    ListPosDevicesParams,
    ListPosDevicesResponse,
    ListWarehousesParams,
    ListWarehousesResponse,
    OrganizationMessageResponse,
    SetBranchAssortmentRequest,
    UpdateBranchPermitsRequest,
    UpdateBranchPermitsResponse,
    UpdateBranchRequest,
    UpdateBranchResponse,
    UpdateCashBoxRequest,
    UpdateCashBoxResponse,
    UpdateCompanyRequest,
    UpdateCompanyResponse,
    UpdatePosDeviceRequest,
    UpdatePosDeviceResponse,
    UpdateWarehouseRequest,
    UpdateWarehouseResponse,
} from '../types/admin/organization'

const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined

export const getCompany = (config?: AxiosRequestConfig) =>
    staffAuthGet<GetCompanyResponse>('/organization/company', config)

export const updateCompany = (
    body: UpdateCompanyRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateCompanyResponse, UpdateCompanyRequest>(
        '/organization/company',
        body,
        config
    )

export const listBranches = (
    params?: ListBranchesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListBranchesResponse>('/organization/branches', {
        ...config,
        params: toParams(params),
    })

export const createBranch = (
    body: CreateBranchRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreateBranchResponse, CreateBranchRequest>(
        '/organization/branches',
        body,
        config
    )

export const getBranch = (branchId: string, config?: AxiosRequestConfig) =>
    staffAuthGet<GetBranchResponse>(
        `/organization/branches/${branchId}`,
        config
    )

export const updateBranch = (
    branchId: string,
    body: UpdateBranchRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateBranchResponse, UpdateBranchRequest>(
        `/organization/branches/${branchId}`,
        body,
        config
    )

export const deleteBranch = (branchId: string, config?: AxiosRequestConfig) =>
    staffAuthDelete<OrganizationMessageResponse>(
        `/organization/branches/${branchId}`,
        undefined,
        config
    )

export const getBranchNetwork = (
    branchId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetBranchNetworkResponse>(
        `/organization/branches/${branchId}/network`,
        config
    )

export const listBranchEmployees = (
    branchId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListBranchEmployeesResponse>(
        `/organization/branches/${branchId}/employees`,
        config
    )

export const assignBranchEmployee = (
    branchId: string,
    body: AssignBranchEmployeeRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<AssignBranchEmployeeResponse, AssignBranchEmployeeRequest>(
        `/organization/branches/${branchId}/employees`,
        body,
        config
    )

export const unassignBranchEmployee = (
    branchId: string,
    employeeId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<OrganizationMessageResponse>(
        `/organization/branches/${branchId}/employees/${employeeId}/unassign`,
        undefined,
        config
    )

export const listBranchWarehouses = (
    branchId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListBranchWarehousesResponse>(
        `/organization/branches/${branchId}/warehouses`,
        config
    )

export const linkBranchWarehouse = (
    branchId: string,
    body: LinkBranchWarehouseRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<OrganizationMessageResponse, LinkBranchWarehouseRequest>(
        `/organization/branches/${branchId}/warehouses/link`,
        body,
        config
    )

export const unlinkBranchWarehouse = (
    branchId: string,
    linkId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<OrganizationMessageResponse>(
        `/organization/branches/${branchId}/warehouses/${linkId}/unlink`,
        undefined,
        config
    )

export const getBranchPermits = (
    branchId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetBranchPermitsResponse>(
        `/organization/branches/${branchId}/permits`,
        config
    )

export const updateBranchPermits = (
    branchId: string,
    body: UpdateBranchPermitsRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<UpdateBranchPermitsResponse, UpdateBranchPermitsRequest>(
        `/organization/branches/${branchId}/permits`,
        body,
        config
    )

export const listBranchAssortment = (
    branchId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListBranchAssortmentResponse>(
        `/organization/branches/${branchId}/assortment`,
        config
    )

export const setBranchAssortment = (
    branchId: string,
    body: SetBranchAssortmentRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<OrganizationMessageResponse, SetBranchAssortmentRequest>(
        `/organization/branches/${branchId}/assortment`,
        body,
        config
    )

export const listWarehouses = (
    params?: ListWarehousesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListWarehousesResponse>('/organization/warehouses', {
        ...config,
        params: toParams(params),
    })

export const createWarehouse = (
    body: CreateWarehouseRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreateWarehouseResponse, CreateWarehouseRequest>(
        '/organization/warehouses',
        body,
        config
    )

export const getWarehouse = (
    warehouseId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetWarehouseResponse>(
        `/organization/warehouses/${warehouseId}`,
        config
    )

export const updateWarehouse = (
    warehouseId: string,
    body: UpdateWarehouseRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateWarehouseResponse, UpdateWarehouseRequest>(
        `/organization/warehouses/${warehouseId}`,
        body,
        config
    )

export const deleteWarehouse = (
    warehouseId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<OrganizationMessageResponse>(
        `/organization/warehouses/${warehouseId}`,
        undefined,
        config
    )

export const listCashBoxes = (
    params?: ListCashBoxesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListCashBoxesResponse>('/organization/cash-boxes', {
        ...config,
        params: toParams(params),
    })

export const createCashBox = (
    body: CreateCashBoxRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreateCashBoxResponse, CreateCashBoxRequest>(
        '/organization/cash-boxes',
        body,
        config
    )

export const getCashBox = (cashBoxId: string, config?: AxiosRequestConfig) =>
    staffAuthGet<GetCashBoxResponse>(
        `/organization/cash-boxes/${cashBoxId}`,
        config
    )

export const updateCashBox = (
    cashBoxId: string,
    body: UpdateCashBoxRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateCashBoxResponse, UpdateCashBoxRequest>(
        `/organization/cash-boxes/${cashBoxId}`,
        body,
        config
    )

export const closeCashBox = (cashBoxId: string, config?: AxiosRequestConfig) =>
    staffAuthPut<OrganizationMessageResponse>(
        `/organization/cash-boxes/${cashBoxId}/close`,
        undefined,
        config
    )

export const listPosDevices = (
    params?: ListPosDevicesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListPosDevicesResponse>('/organization/pos-devices', {
        ...config,
        params: toParams(params),
    })

export const createPosDevice = (
    body: CreatePosDeviceRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreatePosDeviceResponse, CreatePosDeviceRequest>(
        '/organization/pos-devices',
        body,
        config
    )

export const getPosDevice = (
    posDeviceId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetPosDeviceResponse>(
        `/organization/pos-devices/${posDeviceId}`,
        config
    )

export const updatePosDevice = (
    posDeviceId: string,
    body: UpdatePosDeviceRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdatePosDeviceResponse, UpdatePosDeviceRequest>(
        `/organization/pos-devices/${posDeviceId}`,
        body,
        config
    )

export const deactivatePosDevice = (
    posDeviceId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<OrganizationMessageResponse>(
        `/organization/pos-devices/${posDeviceId}/deactivate`,
        undefined,
        config
    )
