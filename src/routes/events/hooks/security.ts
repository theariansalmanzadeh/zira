'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    createIpRule,
    deleteIpRule,
    getSecurityPolicy,
    listIpRules,
    updateSecurityPolicy,
} from '@/src/api/admin/securityAndEvents'
import type {
    IpRuleRequest,
    ListIpRulesParams,
    SecurityPolicyUpdate,
} from '@/src/api/types/admin/securityAndEvents'

export const securityKeys = {
    all: ['events', 'security'] as const,
    policy: () => [...securityKeys.all, 'policy'] as const,
    ipRules: (params?: ListIpRulesParams) =>
        [...securityKeys.all, 'ip-rules', params ?? {}] as const,
}

export const useGetSecurityPolicy = () => {
    return useQuery({
        queryKey: securityKeys.policy(),
        queryFn: async () => {
            const result = await getSecurityPolicy()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateSecurityPolicy = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: SecurityPolicyUpdate) => {
            const result = await updateSecurityPolicy(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: securityKeys.policy() })
        },
    })
}

export const useListIpRules = (params?: ListIpRulesParams) => {
    return useQuery({
        queryKey: securityKeys.ipRules(params),
        queryFn: async () => {
            const result = await listIpRules(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateIpRule = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: IpRuleRequest) => {
            const result = await createIpRule(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: securityKeys.all })
        },
    })
}

export const useDeleteIpRule = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (ruleId: string) => {
            const result = await deleteIpRule(ruleId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: securityKeys.all })
        },
    })
}
