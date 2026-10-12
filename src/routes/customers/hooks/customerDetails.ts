'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    activateCustomerGuarantee,
    approveCreditChangeRequest,
    createCreditChangeRequest,
    createCustomerGuarantee,
    createCustomerManualLock,
    disableCreditAccountStepwise,
    downloadGuaranteeFile,
    enableCreditAccountStepwise,
    getCustomerCreditSummary,
    listAccountChangeRequests,
    listCreditChangeRequests,
    listCustomerGuarantees,
    listCustomerLocks,
    openCustomerCreditAccount,
    rejectCreditChangeRequest,
    releaseCustomerCreditLock,
    releaseCustomerGuarantee,
    replaceGuaranteeFile,
    setCreditAccountStatus,
    setCreditAccountTerm,
    suspendCustomerCreditLock,
    updateCustomerGuarantee,
} from '@/src/api/admin/customerDetails'
import type {
    ChangeRequestCreateIn,
    ChangeRequestRejectIn,
    CreateCustomerGuaranteeRequest,
    CreditAccountStatusIn,
    CreditAccountTermIn,
    CreditLockManualIn,
    CreditLockReleaseIn,
    CreditLockSuspendIn,
    CreditType,
    GuaranteeReleaseIn,
    GuaranteeUpdateIn,
    ListAccountChangeRequestsParams,
    ListCreditChangeRequestsParams,
    ListCustomerGuaranteesParams,
    ListCustomerLocksParams,
    ReplaceGuaranteeFileRequest,
    StepwiseActionIn,
} from '@/src/api/types/admin/customerDetails'

export const customerDetailsKeys = {
    all: ['customer-details'] as const,
    creditSummary: (customerId: string) =>
        [...customerDetailsKeys.all, 'credit-summary', customerId] as const,
    accountChangeRequests: (
        accountId: string,
        params?: ListAccountChangeRequestsParams
    ) =>
        [
            ...customerDetailsKeys.all,
            'account-change-requests',
            accountId,
            params ?? {},
        ] as const,
    creditChangeRequests: (params?: ListCreditChangeRequestsParams) =>
        [
            ...customerDetailsKeys.all,
            'credit-change-requests',
            params ?? {},
        ] as const,
    guarantees: (customerId: string, params?: ListCustomerGuaranteesParams) =>
        [
            ...customerDetailsKeys.all,
            'guarantees',
            customerId,
            params ?? {},
        ] as const,
    locks: (customerId: string, params?: ListCustomerLocksParams) =>
        [...customerDetailsKeys.all, 'locks', customerId, params ?? {}] as const,
}

const useInvalidateCustomerDetails = () => {
    const queryClient = useQueryClient()
    return () =>
        queryClient.invalidateQueries({ queryKey: customerDetailsKeys.all })
}

export const useGetCustomerCreditSummary = (
    customerId: string,
    enabled = true
) =>
    useQuery({
        queryKey: customerDetailsKeys.creditSummary(customerId),
        enabled: Boolean(customerId) && enabled,
        queryFn: async () => {
            const result = await getCustomerCreditSummary(customerId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useOpenCustomerCreditAccount = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            customerId,
            creditType,
        }: {
            customerId: string
            creditType: CreditType
        }) => {
            const result = await openCustomerCreditAccount(
                customerId,
                creditType
            )
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useSetCreditAccountStatus = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            accountId,
            body,
        }: {
            accountId: string
            body: CreditAccountStatusIn
        }) => {
            const result = await setCreditAccountStatus(accountId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useSetCreditAccountTerm = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            accountId,
            body,
        }: {
            accountId: string
            body: CreditAccountTermIn
        }) => {
            const result = await setCreditAccountTerm(accountId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useEnableCreditAccountStepwise = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            accountId,
            body,
        }: {
            accountId: string
            body: StepwiseActionIn
        }) => {
            const result = await enableCreditAccountStepwise(accountId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useDisableCreditAccountStepwise = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            accountId,
            body,
        }: {
            accountId: string
            body: StepwiseActionIn
        }) => {
            const result = await disableCreditAccountStepwise(accountId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useCreateCreditChangeRequest = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            accountId,
            body,
        }: {
            accountId: string
            body: ChangeRequestCreateIn
        }) => {
            const result = await createCreditChangeRequest(accountId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useListAccountChangeRequests = (
    accountId: string,
    params?: ListAccountChangeRequestsParams,
    enabled = true
) =>
    useQuery({
        queryKey: customerDetailsKeys.accountChangeRequests(accountId, params),
        enabled: Boolean(accountId) && enabled,
        queryFn: async () => {
            const result = await listAccountChangeRequests(accountId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useListCreditChangeRequests = (
    params?: ListCreditChangeRequestsParams
) =>
    useQuery({
        queryKey: customerDetailsKeys.creditChangeRequests(params),
        queryFn: async () => {
            const result = await listCreditChangeRequests(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useApproveCreditChangeRequest = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({ requestId }: { requestId: string }) => {
            const result = await approveCreditChangeRequest(requestId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useRejectCreditChangeRequest = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            requestId,
            body,
        }: {
            requestId: string
            body: ChangeRequestRejectIn
        }) => {
            const result = await rejectCreditChangeRequest(requestId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useListCustomerGuarantees = (
    customerId: string,
    params?: ListCustomerGuaranteesParams,
    enabled = true
) =>
    useQuery({
        queryKey: customerDetailsKeys.guarantees(customerId, params),
        enabled: Boolean(customerId) && enabled,
        queryFn: async () => {
            const result = await listCustomerGuarantees(customerId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useCreateCustomerGuarantee = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: CreateCustomerGuaranteeRequest
        }) => {
            const result = await createCustomerGuarantee(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useUpdateCustomerGuarantee = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            guaranteeId,
            body,
        }: {
            guaranteeId: string
            body: GuaranteeUpdateIn
        }) => {
            const result = await updateCustomerGuarantee(guaranteeId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useReplaceGuaranteeFile = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            guaranteeId,
            body,
        }: {
            guaranteeId: string
            body: ReplaceGuaranteeFileRequest
        }) => {
            const result = await replaceGuaranteeFile(guaranteeId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useDownloadGuaranteeFile = () =>
    useMutation({
        mutationFn: async ({ guaranteeId }: { guaranteeId: string }) => {
            const result = await downloadGuaranteeFile(guaranteeId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useActivateCustomerGuarantee = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({ guaranteeId }: { guaranteeId: string }) => {
            const result = await activateCustomerGuarantee(guaranteeId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useReleaseCustomerGuarantee = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            guaranteeId,
            body,
        }: {
            guaranteeId: string
            body: GuaranteeReleaseIn
        }) => {
            const result = await releaseCustomerGuarantee(guaranteeId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useListCustomerLocks = (
    customerId: string,
    params?: ListCustomerLocksParams,
    enabled = true
) =>
    useQuery({
        queryKey: customerDetailsKeys.locks(customerId, params),
        enabled: Boolean(customerId) && enabled,
        queryFn: async () => {
            const result = await listCustomerLocks(customerId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useCreateCustomerManualLock = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: CreditLockManualIn
        }) => {
            const result = await createCustomerManualLock(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useSuspendCustomerCreditLock = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            lockId,
            body,
        }: {
            lockId: string
            body: CreditLockSuspendIn
        }) => {
            const result = await suspendCustomerCreditLock(lockId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}

export const useReleaseCustomerCreditLock = () => {
    const invalidate = useInvalidateCustomerDetails()
    return useMutation({
        mutationFn: async ({
            lockId,
            body,
        }: {
            lockId: string
            body: CreditLockReleaseIn
        }) => {
            const result = await releaseCustomerCreditLock(lockId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: invalidate,
    })
}
