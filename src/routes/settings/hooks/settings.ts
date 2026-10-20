'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    createUnit,
    deleteUnit,
    getCatalogConfig,
    getCatalogDisplay,
    getCommercePolicy,
    getSequence,
    getUnit,
    listGradePolicies,
    listNamingRule,
    listScoreFormula,
    listSequences,
    listUnits,
    setGradePolicy,
    setNamingRule,
    updateCatalogConfig,
    updateCatalogDisplay,
    updateCommercePolicy,
    updateScoreFormula,
    updateSequence,
    updateUnit,
} from '@/src/api/admin/settings'
import type {
    CreateUnitRequest,
    ListGradePoliciesParams,
    ListNamingRuleParams,
    ListScoreFormulaParams,
    ListSequencesParams,
    ListUnitsParams,
    NamingRuleTarget,
    SetGradePolicyRequest,
    SetNamingRuleRequest,
    UpdateCatalogConfigRequest,
    UpdateCatalogDisplayRequest,
    UpdateCommercePolicyRequest,
    UpdateScoreFormulaRequest,
    UpdateSequenceRequest,
    UpdateUnitRequest,
} from '@/src/api/types/admin/settings'

export const settingsKeys = {
    all: ['settings'] as const,
    units: () => [...settingsKeys.all, 'units'] as const,
    unitList: (params?: ListUnitsParams) =>
        [...settingsKeys.units(), 'list', params ?? {}] as const,
    unitDetail: (unitId: string) =>
        [...settingsKeys.units(), 'detail', unitId] as const,
    sequences: () => [...settingsKeys.all, 'sequences'] as const,
    sequenceList: (params?: ListSequencesParams) =>
        [...settingsKeys.sequences(), 'list', params ?? {}] as const,
    sequenceDetail: (sequenceId: string) =>
        [...settingsKeys.sequences(), 'detail', sequenceId] as const,
    commercePolicy: () => [...settingsKeys.all, 'commerce-policy'] as const,
    catalogDisplay: () => [...settingsKeys.all, 'catalog-display'] as const,
    catalogConfig: () => [...settingsKeys.all, 'catalog-config'] as const,
    scoreFormula: (params?: ListScoreFormulaParams) =>
        [...settingsKeys.all, 'score-formula', params ?? {}] as const,
    namingRule: (target: NamingRuleTarget, params?: ListNamingRuleParams) =>
        [...settingsKeys.all, 'naming-rules', target, params ?? {}] as const,
    gradePolicies: (params?: ListGradePoliciesParams) =>
        [...settingsKeys.all, 'grade-policies', params ?? {}] as const,
}

export const useListUnits = (params?: ListUnitsParams, enabled = true) => {
    return useQuery({
        queryKey: settingsKeys.unitList(params),
        enabled,
        queryFn: async () => {
            const result = await listUnits(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetUnit = (unitId: string, enabled = true) => {
    return useQuery({
        queryKey: settingsKeys.unitDetail(unitId),
        enabled: Boolean(unitId) && enabled,
        queryFn: async () => {
            const result = await getUnit(unitId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateUnit = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateUnitRequest) => {
            const result = await createUnit(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: settingsKeys.units() })
        },
    })
}

export const useUpdateUnit = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            unitId,
            body,
        }: {
            unitId: string
            body: UpdateUnitRequest
        }) => {
            const result = await updateUnit(unitId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: settingsKeys.units() })
            queryClient.invalidateQueries({
                queryKey: settingsKeys.unitDetail(data.id),
            })
        },
    })
}

export const useDeleteUnit = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (unitId: string) => {
            const result = await deleteUnit(unitId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: settingsKeys.units() })
        },
    })
}

export const useListSequences = (
    params?: ListSequencesParams,
    enabled = true
) => {
    return useQuery({
        queryKey: settingsKeys.sequenceList(params),
        enabled,
        queryFn: async () => {
            const result = await listSequences(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetSequence = (sequenceId: string, enabled = true) => {
    return useQuery({
        queryKey: settingsKeys.sequenceDetail(sequenceId),
        enabled: Boolean(sequenceId) && enabled,
        queryFn: async () => {
            const result = await getSequence(sequenceId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateSequence = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            sequenceId,
            body,
        }: {
            sequenceId: string
            body: UpdateSequenceRequest
        }) => {
            const result = await updateSequence(sequenceId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: settingsKeys.sequences(),
            })
            queryClient.invalidateQueries({
                queryKey: settingsKeys.sequenceDetail(data.id),
            })
        },
    })
}

export const useGetCommercePolicy = (enabled = true) => {
    return useQuery({
        queryKey: settingsKeys.commercePolicy(),
        enabled,
        queryFn: async () => {
            const result = await getCommercePolicy()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateCommercePolicy = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: UpdateCommercePolicyRequest) => {
            const result = await updateCommercePolicy(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: settingsKeys.commercePolicy(),
            })
        },
    })
}

export const useGetCatalogDisplay = (enabled = true) => {
    return useQuery({
        queryKey: settingsKeys.catalogDisplay(),
        enabled,
        queryFn: async () => {
            const result = await getCatalogDisplay()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateCatalogDisplay = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: UpdateCatalogDisplayRequest) => {
            const result = await updateCatalogDisplay(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: settingsKeys.catalogDisplay(),
            })
        },
    })
}

export const useGetCatalogConfig = (enabled = true) => {
    return useQuery({
        queryKey: settingsKeys.catalogConfig(),
        enabled,
        queryFn: async () => {
            const result = await getCatalogConfig()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateCatalogConfig = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: UpdateCatalogConfigRequest) => {
            const result = await updateCatalogConfig(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: settingsKeys.catalogConfig(),
            })
        },
    })
}

export const useListScoreFormula = (
    params?: ListScoreFormulaParams,
    enabled = true
) => {
    return useQuery({
        queryKey: settingsKeys.scoreFormula(params),
        enabled,
        queryFn: async () => {
            const result = await listScoreFormula(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateScoreFormula = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: UpdateScoreFormulaRequest) => {
            const result = await updateScoreFormula(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [...settingsKeys.all, 'score-formula'],
            })
        },
    })
}

export const useListNamingRule = (
    target: NamingRuleTarget,
    params?: ListNamingRuleParams,
    enabled = true
) => {
    return useQuery({
        queryKey: settingsKeys.namingRule(target, params),
        enabled,
        queryFn: async () => {
            const result = await listNamingRule(target, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useSetNamingRule = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            target,
            body,
        }: {
            target: NamingRuleTarget
            body: SetNamingRuleRequest
        }) => {
            const result = await setNamingRule(target, body)
            if (!result.success) throw result.error
            return { target, data: result.data }
        },
        onSuccess: ({ target }) => {
            queryClient.invalidateQueries({
                queryKey: [...settingsKeys.all, 'naming-rules', target],
            })
        },
    })
}

export const useListGradePolicies = (
    params?: ListGradePoliciesParams,
    enabled = true
) => {
    return useQuery({
        queryKey: settingsKeys.gradePolicies(params),
        enabled,
        queryFn: async () => {
            const result = await listGradePolicies(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useSetGradePolicy = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            grade,
            body,
        }: {
            grade: number
            body: SetGradePolicyRequest
        }) => {
            const result = await setGradePolicy(grade, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [...settingsKeys.all, 'grade-policies'],
            })
        },
    })
}
