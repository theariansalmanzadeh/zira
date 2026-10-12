'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    activateCustomerGroup,
    addCustomerGroupMembers,
    addCustomerToGroup,
    approveRegistrationRequest,
    archiveCustomerProfile,
    assignCustomerMarketer,
    createCustomerGroup,
    createCustomerProfile,
    createRegistrationRequest,
    deactivateCustomerGroup,
    deleteCustomerDocument,
    downloadCustomerDocumentFile,
    endCustomerMarketer,
    getCustomerCreditPolicy,
    getCustomerGroup,
    getCustomerImageAccess,
    getCustomerMarketer,
    getCustomerProfile,
    getCustomerTier,
    getRegistrationRequest,
    getRegistrationRequestCounts,
    listCustomerDocuments,
    listCustomerGroupMembers,
    listCustomerGroupMemberships,
    listCustomerGroups,
    listCustomerProfiles,
    listRegistrationRequestDocuments,
    listRegistrationRequests,
    patchCustomerCreditPolicy,
    putCustomerCreditPolicy,
    rejectRegistrationRequest,
    removeCustomerGroupMember,
    removeCustomerGroupMembership,
    reviewCustomerDocument,
    setCustomerGroupMarketer,
    setCustomerPrimaryGroup,
    updateCustomerBlacklist,
    updateCustomerGroup,
    updateCustomerImageAccess,
    updateCustomerProfile,
    updateCustomerStatus,
    updateCustomerTier,
    updateRegistrationRequest,
    uploadCustomerDocument,
} from '@/src/api/admin/customers'
import type {
    AddCustomerGroupMembersRequest,
    ArchiveCustomerRequest,
    AssignCustomerMarketerRequest,
    CreateCustomerGroupRequest,
    CreateCustomerProfileRequest,
    CreateRegistrationRequest,
    EndCustomerMarketerRequest,
    ListCustomerGroupMembersParams,
    ListCustomerGroupsParams,
    ListCustomerProfilesParams,
    ListRegistrationRequestsParams,
    RejectRegistrationRequest,
    ReviewCustomerDocumentRequest,
    SetCustomerGroupMarketerRequest,
    SetCustomerPrimaryGroupRequest,
    UpdateCustomerBlacklistRequest,
    UpdateCustomerCreditPolicyPatchRequest,
    UpdateCustomerCreditPolicyPutRequest,
    UpdateCustomerGroupRequest,
    UpdateCustomerImageAccessRequest,
    UpdateCustomerProfileRequest,
    UpdateCustomerStatusRequest,
    UpdateCustomerTierRequest,
    UpdateRegistrationRequest,
    UploadCustomerDocumentRequest,
    VersionedCustomerGroupRequest,
} from '@/src/api/types/admin/customers'

export const customerKeys = {
    all: ['customers'] as const,
    profiles: {
        all: () => [...customerKeys.all, 'profiles'] as const,
        lists: () => [...customerKeys.profiles.all(), 'list'] as const,
        list: (params?: ListCustomerProfilesParams) =>
            [...customerKeys.profiles.lists(), params ?? {}] as const,
        details: () => [...customerKeys.profiles.all(), 'detail'] as const,
        detail: (customerId: string) =>
            [...customerKeys.profiles.details(), customerId] as const,
        tier: (customerId: string) =>
            [...customerKeys.profiles.detail(customerId), 'tier'] as const,
        imageAccess: (customerId: string) =>
            [
                ...customerKeys.profiles.detail(customerId),
                'image-access',
            ] as const,
        creditPolicy: (customerId: string) =>
            [
                ...customerKeys.profiles.detail(customerId),
                'credit-policy',
            ] as const,
        groups: (customerId: string) =>
            [...customerKeys.profiles.detail(customerId), 'groups'] as const,
        marketer: (customerId: string) =>
            [...customerKeys.profiles.detail(customerId), 'marketer'] as const,
        documents: (customerId: string) =>
            [
                ...customerKeys.profiles.detail(customerId),
                'documents',
            ] as const,
    },
    registrationRequests: {
        all: () => [...customerKeys.all, 'registration-requests'] as const,
        counts: () =>
            [...customerKeys.registrationRequests.all(), 'counts'] as const,
        lists: () =>
            [...customerKeys.registrationRequests.all(), 'list'] as const,
        list: (params?: ListRegistrationRequestsParams) =>
            [
                ...customerKeys.registrationRequests.lists(),
                params ?? {},
            ] as const,
        details: () =>
            [...customerKeys.registrationRequests.all(), 'detail'] as const,
        detail: (requestId: string) =>
            [
                ...customerKeys.registrationRequests.details(),
                requestId,
            ] as const,
        documents: (requestId: string) =>
            [
                ...customerKeys.registrationRequests.detail(requestId),
                'documents',
            ] as const,
    },
    groups: {
        all: () => [...customerKeys.all, 'groups'] as const,
        lists: () => [...customerKeys.groups.all(), 'list'] as const,
        list: (params?: ListCustomerGroupsParams) =>
            [...customerKeys.groups.lists(), params ?? {}] as const,
        details: () => [...customerKeys.groups.all(), 'detail'] as const,
        detail: (groupId: string) =>
            [...customerKeys.groups.details(), groupId] as const,
        members: (
            groupId: string,
            params?: ListCustomerGroupMembersParams
        ) =>
            [
                ...customerKeys.groups.detail(groupId),
                'members',
                params ?? {},
            ] as const,
    },
}

const invalidateCustomerProfile = (
    queryClient: ReturnType<typeof useQueryClient>,
    customerId: string
) => {
    queryClient.invalidateQueries({
        queryKey: customerKeys.profiles.detail(customerId),
    })
    queryClient.invalidateQueries({
        queryKey: customerKeys.profiles.lists(),
    })
}

export const useListCustomerProfiles = (
    params?: ListCustomerProfilesParams
) => {
    return useQuery({
        queryKey: customerKeys.profiles.list(params),
        queryFn: async () => {
            const result = await listCustomerProfiles(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetCustomerProfile = (customerId: string, enabled = true) => {
    return useQuery({
        queryKey: customerKeys.profiles.detail(customerId),
        enabled: Boolean(customerId) && enabled,
        queryFn: async () => {
            const result = await getCustomerProfile(customerId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateCustomerProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateCustomerProfileRequest) => {
            const result = await createCustomerProfile(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.lists(),
            })
        },
    })
}

export const useUpdateCustomerProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: UpdateCustomerProfileRequest
        }) => {
            const result = await updateCustomerProfile(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            invalidateCustomerProfile(queryClient, data.id)
        },
    })
}

export const useUpdateCustomerStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: UpdateCustomerStatusRequest
        }) => {
            const result = await updateCustomerStatus(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            invalidateCustomerProfile(queryClient, data.id)
        },
    })
}

export const useArchiveCustomerProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: ArchiveCustomerRequest
        }) => {
            const result = await archiveCustomerProfile(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            invalidateCustomerProfile(queryClient, data.id)
        },
    })
}

export const useUpdateCustomerBlacklist = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: UpdateCustomerBlacklistRequest
        }) => {
            const result = await updateCustomerBlacklist(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            invalidateCustomerProfile(queryClient, data.id)
        },
    })
}

export const useGetCustomerTier = (customerId: string, enabled = true) => {
    return useQuery({
        queryKey: customerKeys.profiles.tier(customerId),
        enabled: Boolean(customerId) && enabled,
        queryFn: async () => {
            const result = await getCustomerTier(customerId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateCustomerTier = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: UpdateCustomerTierRequest
        }) => {
            const result = await updateCustomerTier(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            invalidateCustomerProfile(queryClient, data.id)
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.tier(data.id),
            })
        },
    })
}

export const useGetCustomerImageAccess = (
    customerId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: customerKeys.profiles.imageAccess(customerId),
        enabled: Boolean(customerId) && enabled,
        queryFn: async () => {
            const result = await getCustomerImageAccess(customerId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateCustomerImageAccess = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: UpdateCustomerImageAccessRequest
        }) => {
            const result = await updateCustomerImageAccess(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            invalidateCustomerProfile(queryClient, data.id)
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.imageAccess(data.id),
            })
        },
    })
}

export const useGetCustomerCreditPolicy = (
    customerId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: customerKeys.profiles.creditPolicy(customerId),
        enabled: Boolean(customerId) && enabled,
        queryFn: async () => {
            const result = await getCustomerCreditPolicy(customerId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const usePutCustomerCreditPolicy = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: UpdateCustomerCreditPolicyPutRequest
        }) => {
            const result = await putCustomerCreditPolicy(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            invalidateCustomerProfile(queryClient, data.id)
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.creditPolicy(data.id),
            })
        },
    })
}

export const usePatchCustomerCreditPolicy = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: UpdateCustomerCreditPolicyPatchRequest
        }) => {
            const result = await patchCustomerCreditPolicy(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            invalidateCustomerProfile(queryClient, data.id)
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.creditPolicy(data.id),
            })
        },
    })
}

export const useListCustomerGroupMemberships = (
    customerId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: customerKeys.profiles.groups(customerId),
        enabled: Boolean(customerId) && enabled,
        queryFn: async () => {
            const result = await listCustomerGroupMemberships(customerId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useAddCustomerToGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            groupId,
        }: {
            customerId: string
            groupId: string
        }) => {
            const result = await addCustomerToGroup(customerId, groupId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.groups(variables.customerId),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.detail(variables.customerId),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.detail(variables.groupId),
            })
        },
    })
}

export const useRemoveCustomerGroupMembership = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            membershipId,
        }: {
            customerId: string
            membershipId: string
        }) => {
            const result = await removeCustomerGroupMembership(
                customerId,
                membershipId
            )
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.groups(variables.customerId),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.detail(variables.customerId),
            })
        },
    })
}

export const useSetCustomerPrimaryGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: SetCustomerPrimaryGroupRequest
        }) => {
            const result = await setCustomerPrimaryGroup(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            invalidateCustomerProfile(queryClient, data.customer_id)
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.groups(data.customer_id),
            })
        },
    })
}

export const useGetCustomerMarketer = (
    customerId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: customerKeys.profiles.marketer(customerId),
        enabled: Boolean(customerId) && enabled,
        queryFn: async () => {
            const result = await getCustomerMarketer(customerId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useAssignCustomerMarketer = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: AssignCustomerMarketerRequest
        }) => {
            const result = await assignCustomerMarketer(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.marketer(variables.customerId),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.detail(variables.customerId),
            })
        },
    })
}

export const useEndCustomerMarketer = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: EndCustomerMarketerRequest
        }) => {
            const result = await endCustomerMarketer(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.marketer(variables.customerId),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.detail(variables.customerId),
            })
        },
    })
}

export const useGetRegistrationRequestCounts = () => {
    return useQuery({
        queryKey: customerKeys.registrationRequests.counts(),
        queryFn: async () => {
            const result = await getRegistrationRequestCounts()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListRegistrationRequests = (
    params?: ListRegistrationRequestsParams
) => {
    return useQuery({
        queryKey: customerKeys.registrationRequests.list(params),
        queryFn: async () => {
            const result = await listRegistrationRequests(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetRegistrationRequest = (
    requestId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: customerKeys.registrationRequests.detail(requestId),
        enabled: Boolean(requestId) && enabled,
        queryFn: async () => {
            const result = await getRegistrationRequest(requestId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListRegistrationRequestDocuments = (
    requestId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: customerKeys.registrationRequests.documents(requestId),
        enabled: Boolean(requestId) && enabled,
        queryFn: async () => {
            const result = await listRegistrationRequestDocuments(requestId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateRegistrationRequest = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateRegistrationRequest) => {
            const result = await createRegistrationRequest(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.registrationRequests.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.registrationRequests.counts(),
            })
        },
    })
}

export const useUpdateRegistrationRequest = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            requestId,
            body,
        }: {
            requestId: string
            body: UpdateRegistrationRequest
        }) => {
            const result = await updateRegistrationRequest(requestId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.registrationRequests.detail(data.id),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.registrationRequests.lists(),
            })
        },
    })
}

export const useApproveRegistrationRequest = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (requestId: string) => {
            const result = await approveRegistrationRequest(requestId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.registrationRequests.detail(data.id),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.registrationRequests.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.registrationRequests.counts(),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.lists(),
            })
        },
    })
}

export const useRejectRegistrationRequest = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            requestId,
            body,
        }: {
            requestId: string
            body: RejectRegistrationRequest
        }) => {
            const result = await rejectRegistrationRequest(requestId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.registrationRequests.detail(data.id),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.registrationRequests.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.registrationRequests.counts(),
            })
        },
    })
}

export const useListCustomerDocuments = (
    customerId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: customerKeys.profiles.documents(customerId),
        enabled: Boolean(customerId) && enabled,
        queryFn: async () => {
            const result = await listCustomerDocuments(customerId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUploadCustomerDocument = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            customerId,
            body,
        }: {
            customerId: string
            body: UploadCustomerDocumentRequest
        }) => {
            const result = await uploadCustomerDocument(customerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.profiles.documents(variables.customerId),
            })
        },
    })
}

export const useReviewCustomerDocument = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            documentId,
            customerId,
            body,
        }: {
            documentId: string
            customerId?: string
            body: ReviewCustomerDocumentRequest
        }) => {
            const result = await reviewCustomerDocument(documentId, body)
            if (!result.success) throw result.error
            return { data: result.data, customerId }
        },
        onSuccess: (result) => {
            if (result.customerId) {
                queryClient.invalidateQueries({
                    queryKey: customerKeys.profiles.documents(
                        result.customerId
                    ),
                })
            }
        },
    })
}

export const useDeleteCustomerDocument = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            documentId,
            customerId,
        }: {
            documentId: string
            customerId?: string
        }) => {
            const result = await deleteCustomerDocument(documentId)
            if (!result.success) throw result.error
            return { data: result.data, customerId }
        },
        onSuccess: (result) => {
            if (result.customerId) {
                queryClient.invalidateQueries({
                    queryKey: customerKeys.profiles.documents(
                        result.customerId
                    ),
                })
            }
        },
    })
}

export const useDownloadCustomerDocumentFile = () => {
    return useMutation({
        mutationFn: async (documentId: string) => {
            const result = await downloadCustomerDocumentFile(documentId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListCustomerGroups = (params?: ListCustomerGroupsParams) => {
    return useQuery({
        queryKey: customerKeys.groups.list(params),
        queryFn: async () => {
            const result = await listCustomerGroups(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetCustomerGroup = (groupId: string, enabled = true) => {
    return useQuery({
        queryKey: customerKeys.groups.detail(groupId),
        enabled: Boolean(groupId) && enabled,
        queryFn: async () => {
            const result = await getCustomerGroup(groupId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateCustomerGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: CreateCustomerGroupRequest) => {
            const result = await createCustomerGroup(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.lists(),
            })
        },
    })
}

export const useUpdateCustomerGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            groupId,
            body,
        }: {
            groupId: string
            body: UpdateCustomerGroupRequest
        }) => {
            const result = await updateCustomerGroup(groupId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.detail(data.id),
            })
        },
    })
}

export const useDeactivateCustomerGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            groupId,
            body,
        }: {
            groupId: string
            body: VersionedCustomerGroupRequest
        }) => {
            const result = await deactivateCustomerGroup(groupId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.detail(data.id),
            })
        },
    })
}

export const useActivateCustomerGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            groupId,
            body,
        }: {
            groupId: string
            body: VersionedCustomerGroupRequest
        }) => {
            const result = await activateCustomerGroup(groupId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.detail(data.id),
            })
        },
    })
}

export const useSetCustomerGroupMarketer = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            groupId,
            body,
        }: {
            groupId: string
            body: SetCustomerGroupMarketerRequest
        }) => {
            const result = await setCustomerGroupMarketer(groupId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.lists(),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.detail(data.id),
            })
        },
    })
}

export const useListCustomerGroupMembers = (
    groupId: string,
    params?: ListCustomerGroupMembersParams,
    enabled = true
) => {
    return useQuery({
        queryKey: customerKeys.groups.members(groupId, params),
        enabled: Boolean(groupId) && enabled,
        queryFn: async () => {
            const result = await listCustomerGroupMembers(groupId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useAddCustomerGroupMembers = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            groupId,
            body,
        }: {
            groupId: string
            body: AddCustomerGroupMembersRequest
        }) => {
            const result = await addCustomerGroupMembers(groupId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.detail(variables.groupId),
            })
            queryClient.invalidateQueries({
                queryKey: [
                    ...customerKeys.groups.detail(variables.groupId),
                    'members',
                ],
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.lists(),
            })
        },
    })
}

export const useRemoveCustomerGroupMember = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            groupId,
            membershipId,
        }: {
            groupId: string
            membershipId: string
            params?: ListCustomerGroupMembersParams
        }) => {
            const result = await removeCustomerGroupMember(
                groupId,
                membershipId
            )
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.detail(variables.groupId),
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.members(
                    variables.groupId,
                    variables.params
                ),
            })
            queryClient.invalidateQueries({
                queryKey: [
                    ...customerKeys.groups.detail(variables.groupId),
                    'members',
                ],
            })
            queryClient.invalidateQueries({
                queryKey: customerKeys.groups.lists(),
            })
        },
    })
}
