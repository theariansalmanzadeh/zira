'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    assignBranchEmployee,
    closeCashBox,
    createBranch,
    createCashBox,
    createPosDevice,
    createWarehouse,
    deactivatePosDevice,
    deleteBranch,
    deleteWarehouse,
    getBranch,
    getBranchNetwork,
    getBranchPermits,
    getCashBox,
    getCompany,
    getPosDevice,
    getWarehouse,
    linkBranchWarehouse,
    listBranchAssortment,
    listBranchBankAccounts,
    listBranchEmployees,
    listBranches,
    listBranchWarehouses,
    listCashBoxes,
    listPosDevices,
    listWarehouses,
    setBranchAssortment,
    unassignBranchEmployee,
    unlinkBranchWarehouse,
    updateBranch,
    updateBranchPermits,
    updateCashBox,
    updateCompany,
    updatePosDevice,
    updateWarehouse,
} from '@/src/api/admin/organization'
import type {
    AssignBranchEmployeeRequest,
    CreateBranchRequest,
    CreateCashBoxRequest,
    CreatePosDeviceRequest,
    CreateWarehouseRequest,
    LinkBranchWarehouseRequest,
    ListBranchBankAccountsParams,
    ListBranchesParams,
    ListCashBoxesParams,
    ListPosDevicesParams,
    ListWarehousesParams,
    SetBranchAssortmentRequest,
    UpdateBranchPermitsRequest,
    UpdateBranchRequest,
    UpdateCashBoxRequest,
    UpdateCompanyRequest,
    UpdatePosDeviceRequest,
    UpdateWarehouseRequest,
} from '@/src/api/types/admin/organization'

export const organizationKeys = {
    all: ['organization'] as const,
    company: () => [...organizationKeys.all, 'company'] as const,
    branches: {
        all: () => [...organizationKeys.all, 'branches'] as const,
        lists: () => [...organizationKeys.branches.all(), 'list'] as const,
        list: (params?: ListBranchesParams) =>
            [...organizationKeys.branches.lists(), params ?? {}] as const,
        details: () => [...organizationKeys.branches.all(), 'detail'] as const,
        detail: (branchId: string) =>
            [...organizationKeys.branches.details(), branchId] as const,
        network: (branchId: string) =>
            [...organizationKeys.branches.detail(branchId), 'network'] as const,
        employees: (branchId: string) =>
            [
                ...organizationKeys.branches.detail(branchId),
                'employees',
            ] as const,
        bankAccounts: (
            branchId: string,
            params?: ListBranchBankAccountsParams
        ) =>
            [
                ...organizationKeys.branches.detail(branchId),
                'bank-accounts',
                params ?? {},
            ] as const,
        warehouses: (branchId: string) =>
            [
                ...organizationKeys.branches.detail(branchId),
                'warehouses',
            ] as const,
        permits: (branchId: string) =>
            [...organizationKeys.branches.detail(branchId), 'permits'] as const,
        assortment: (branchId: string) =>
            [
                ...organizationKeys.branches.detail(branchId),
                'assortment',
            ] as const,
    },
    warehouses: {
        all: () => [...organizationKeys.all, 'warehouses'] as const,
        lists: () => [...organizationKeys.warehouses.all(), 'list'] as const,
        list: (params?: ListWarehousesParams) =>
            [...organizationKeys.warehouses.lists(), params ?? {}] as const,
        details: () =>
            [...organizationKeys.warehouses.all(), 'detail'] as const,
        detail: (warehouseId: string) =>
            [...organizationKeys.warehouses.details(), warehouseId] as const,
    },
    cashBoxes: {
        all: () => [...organizationKeys.all, 'cash-boxes'] as const,
        lists: () => [...organizationKeys.cashBoxes.all(), 'list'] as const,
        list: (params?: ListCashBoxesParams) =>
            [...organizationKeys.cashBoxes.lists(), params ?? {}] as const,
        details: () => [...organizationKeys.cashBoxes.all(), 'detail'] as const,
        detail: (cashBoxId: string) =>
            [...organizationKeys.cashBoxes.details(), cashBoxId] as const,
    },
    posDevices: {
        all: () => [...organizationKeys.all, 'pos-devices'] as const,
        lists: () => [...organizationKeys.posDevices.all(), 'list'] as const,
        list: (params?: ListPosDevicesParams) =>
            [...organizationKeys.posDevices.lists(), params ?? {}] as const,
        details: () =>
            [...organizationKeys.posDevices.all(), 'detail'] as const,
        detail: (posDeviceId: string) =>
            [...organizationKeys.posDevices.details(), posDeviceId] as const,
    },
}

export const useGetCompany = (enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.company(),
        enabled,
        queryFn: async () => {
            const result = await getCompany()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateCompany = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: UpdateCompanyRequest) => {
            const result = await updateCompany(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.company(),
            })
        },
    })
}

export const useListBranches = (params?: ListBranchesParams) => {
    return useQuery({
        queryKey: organizationKeys.branches.list(params),
        queryFn: async () => {
            const result = await listBranches(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetBranch = (branchId: string, enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.branches.detail(branchId),
        enabled: Boolean(branchId) && enabled,
        queryFn: async () => {
            const result = await getBranch(branchId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateBranch = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateBranchRequest) => {
            const result = await createBranch(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.lists(),
            })
        },
    })
}

export const useUpdateBranch = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            branchId,
            body,
        }: {
            branchId: string
            body: UpdateBranchRequest
        }) => {
            const result = await updateBranch(branchId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.detail(data.id),
            })
        },
    })
}

export const useDeleteBranch = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (branchId: string) => {
            const result = await deleteBranch(branchId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.lists(),
            })
        },
    })
}

export const useGetBranchNetwork = (branchId: string, enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.branches.network(branchId),
        enabled: Boolean(branchId) && enabled,
        queryFn: async () => {
            const result = await getBranchNetwork(branchId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListBranchBankAccounts = (
    branchId: string,
    params?: ListBranchBankAccountsParams,
    enabled = true
) => {
    const queryParams = { page: 1, page_size: 100, ...params }

    return useQuery({
        queryKey: organizationKeys.branches.bankAccounts(branchId, queryParams),
        enabled: Boolean(branchId) && enabled,
        queryFn: async () => {
            const result = await listBranchBankAccounts(branchId, queryParams)
            if (!result.success) throw result.error
            return result.data.results
        },
    })
}

export const useListBranchEmployees = (branchId: string, enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.branches.employees(branchId),
        enabled: Boolean(branchId) && enabled,
        queryFn: async () => {
            const result = await listBranchEmployees(branchId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useAssignBranchEmployee = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            branchId,
            body,
        }: {
            branchId: string
            body: AssignBranchEmployeeRequest
        }) => {
            const result = await assignBranchEmployee(branchId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.employees(
                    variables.branchId
                ),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.detail(variables.branchId),
            })
        },
    })
}

export const useUnassignBranchEmployee = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            branchId,
            employeeId,
        }: {
            branchId: string
            employeeId: string
        }) => {
            const result = await unassignBranchEmployee(branchId, employeeId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.employees(
                    variables.branchId
                ),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.detail(variables.branchId),
            })
        },
    })
}

export const useListBranchWarehouses = (branchId: string, enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.branches.warehouses(branchId),
        enabled: Boolean(branchId) && enabled,
        queryFn: async () => {
            const result = await listBranchWarehouses(branchId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useLinkBranchWarehouse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            branchId,
            body,
        }: {
            branchId: string
            body: LinkBranchWarehouseRequest
        }) => {
            const result = await linkBranchWarehouse(branchId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.warehouses(
                    variables.branchId
                ),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.detail(variables.branchId),
            })
        },
    })
}

export const useUnlinkBranchWarehouse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            branchId,
            linkId,
        }: {
            branchId: string
            linkId: string
        }) => {
            const result = await unlinkBranchWarehouse(branchId, linkId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.warehouses(
                    variables.branchId
                ),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.detail(variables.branchId),
            })
        },
    })
}

export const useGetBranchPermits = (branchId: string, enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.branches.permits(branchId),
        enabled: Boolean(branchId) && enabled,
        queryFn: async () => {
            const result = await getBranchPermits(branchId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateBranchPermits = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            branchId,
            body,
        }: {
            branchId: string
            body: UpdateBranchPermitsRequest
        }) => {
            const result = await updateBranchPermits(branchId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.permits(variables.branchId),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.detail(variables.branchId),
            })
        },
    })
}

export const useListBranchAssortment = (branchId: string, enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.branches.assortment(branchId),
        enabled: Boolean(branchId) && enabled,
        queryFn: async () => {
            const result = await listBranchAssortment(branchId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useSetBranchAssortment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            branchId,
            body,
        }: {
            branchId: string
            body: SetBranchAssortmentRequest
        }) => {
            const result = await setBranchAssortment(branchId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.branches.assortment(
                    variables.branchId
                ),
            })
        },
    })
}

export const useListWarehouses = (params?: ListWarehousesParams) => {
    return useQuery({
        queryKey: organizationKeys.warehouses.list(params),
        queryFn: async () => {
            const result = await listWarehouses(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetWarehouse = (warehouseId: string, enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.warehouses.detail(warehouseId),
        enabled: Boolean(warehouseId) && enabled,
        queryFn: async () => {
            const result = await getWarehouse(warehouseId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateWarehouse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateWarehouseRequest) => {
            const result = await createWarehouse(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.warehouses.lists(),
            })
        },
    })
}

export const useUpdateWarehouse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            warehouseId,
            body,
        }: {
            warehouseId: string
            body: UpdateWarehouseRequest
        }) => {
            const result = await updateWarehouse(warehouseId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.warehouses.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.warehouses.detail(data.id),
            })
        },
    })
}

export const useDeleteWarehouse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (warehouseId: string) => {
            const result = await deleteWarehouse(warehouseId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.warehouses.lists(),
            })
        },
    })
}

export const useListCashBoxes = (params?: ListCashBoxesParams) => {
    return useQuery({
        queryKey: organizationKeys.cashBoxes.list(params),
        queryFn: async () => {
            const result = await listCashBoxes(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetCashBox = (cashBoxId: string, enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.cashBoxes.detail(cashBoxId),
        enabled: Boolean(cashBoxId) && enabled,
        queryFn: async () => {
            const result = await getCashBox(cashBoxId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateCashBox = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateCashBoxRequest) => {
            const result = await createCashBox(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.cashBoxes.lists(),
            })
        },
    })
}

export const useUpdateCashBox = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            cashBoxId,
            body,
        }: {
            cashBoxId: string
            body: UpdateCashBoxRequest
        }) => {
            const result = await updateCashBox(cashBoxId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.cashBoxes.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.cashBoxes.detail(data.id),
            })
        },
    })
}

export const useCloseCashBox = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (cashBoxId: string) => {
            const result = await closeCashBox(cashBoxId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, cashBoxId) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.cashBoxes.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.cashBoxes.detail(cashBoxId),
            })
        },
    })
}

export const useListPosDevices = (params?: ListPosDevicesParams) => {
    return useQuery({
        queryKey: organizationKeys.posDevices.list(params),
        queryFn: async () => {
            const result = await listPosDevices(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetPosDevice = (posDeviceId: string, enabled = true) => {
    return useQuery({
        queryKey: organizationKeys.posDevices.detail(posDeviceId),
        enabled: Boolean(posDeviceId) && enabled,
        queryFn: async () => {
            const result = await getPosDevice(posDeviceId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreatePosDevice = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreatePosDeviceRequest) => {
            const result = await createPosDevice(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.posDevices.lists(),
            })
        },
    })
}

export const useUpdatePosDevice = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            posDeviceId,
            body,
        }: {
            posDeviceId: string
            body: UpdatePosDeviceRequest
        }) => {
            const result = await updatePosDevice(posDeviceId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.posDevices.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.posDevices.detail(data.id),
            })
        },
    })
}

export const useDeactivatePosDevice = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (posDeviceId: string) => {
            const result = await deactivatePosDevice(posDeviceId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, posDeviceId) => {
            queryClient.invalidateQueries({
                queryKey: organizationKeys.posDevices.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: organizationKeys.posDevices.detail(posDeviceId),
            })
        },
    })
}
