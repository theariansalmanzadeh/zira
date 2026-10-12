import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthGetBlob,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../http'
import type {
    AddCustomerGroupMembersRequest,
    AddCustomerGroupMembersResponse,
    ArchiveCustomerRequest,
    AssignCustomerMarketerRequest,
    CreateCustomerGroupRequest,
    CreateCustomerProfileRequest,
    CreateCustomerProfileResponse,
    CreateRegistrationRequest,
    CustomerCreditPolicy,
    CustomerDocument,
    CustomerGroup,
    CustomerGroupMembership,
    CustomerImageAccess,
    CustomerMarketer,
    CustomerTier,
    EndCustomerMarketerRequest,
    GetCustomerProfileResponse,
    GetRegistrationRequestResponse,
    ListCustomerDocumentsResponse,
    ListCustomerGroupMembersParams,
    ListCustomerGroupMembersResponse,
    ListCustomerGroupMembershipsResponse,
    ListCustomerGroupsParams,
    ListCustomerGroupsResponse,
    ListCustomerProfilesParams,
    ListCustomerProfilesResponse,
    ListRegistrationRequestDocumentsResponse,
    ListRegistrationRequestsParams,
    ListRegistrationRequestsResponse,
    RegistrationRequest,
    RegistrationRequestCounts,
    RejectRegistrationRequest,
    ReviewCustomerDocumentRequest,
    SetCustomerGroupMarketerRequest,
    SetCustomerPrimaryGroupRequest,
    SetCustomerPrimaryGroupResponse,
    UpdateCustomerBlacklistRequest,
    UpdateCustomerCreditPolicyPatchRequest,
    UpdateCustomerCreditPolicyPutRequest,
    UpdateCustomerGroupRequest,
    UpdateCustomerImageAccessRequest,
    UpdateCustomerProfileRequest,
    UpdateCustomerProfileResponse,
    UpdateCustomerStatusRequest,
    UpdateCustomerTierRequest,
    UpdateRegistrationRequest,
    UploadCustomerDocumentRequest,
    VersionedCustomerGroupRequest,
} from '../types/admin/customers'

const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined

const multipartConfig = (
    config?: AxiosRequestConfig
): AxiosRequestConfig => ({
    ...config,
    headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
    },
})

const toUploadDocumentFormData = (body: UploadCustomerDocumentRequest) => {
    const formData = new FormData()
    formData.append('doc_type', body.doc_type)
    formData.append('file', body.file)
    return formData
}

export const createCustomerProfile = (
    body: CreateCustomerProfileRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreateCustomerProfileResponse, CreateCustomerProfileRequest>(
        '/customers/profiles',
        body,
        config
    )

export const listCustomerProfiles = (
    params?: ListCustomerProfilesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListCustomerProfilesResponse>('/customers/profiles', {
        ...config,
        params: toParams(params),
    })

export const getCustomerProfile = (
    customerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetCustomerProfileResponse>(
        `/customers/profiles/${customerId}`,
        config
    )

export const updateCustomerProfile = (
    customerId: string,
    body: UpdateCustomerProfileRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateCustomerProfileResponse, UpdateCustomerProfileRequest>(
        `/customers/profiles/${customerId}`,
        body,
        config
    )

export const updateCustomerStatus = (
    customerId: string,
    body: UpdateCustomerStatusRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateCustomerProfileResponse, UpdateCustomerStatusRequest>(
        `/customers/profiles/${customerId}/status`,
        body,
        config
    )

export const archiveCustomerProfile = (
    customerId: string,
    body: ArchiveCustomerRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<UpdateCustomerProfileResponse, ArchiveCustomerRequest>(
        `/customers/profiles/${customerId}/archive`,
        body,
        config
    )

export const updateCustomerBlacklist = (
    customerId: string,
    body: UpdateCustomerBlacklistRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<
        UpdateCustomerProfileResponse,
        UpdateCustomerBlacklistRequest
    >(`/customers/profiles/${customerId}/blacklist`, body, config)

export const getCustomerTier = (
    customerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<CustomerTier>(
        `/customers/profiles/${customerId}/tier`,
        config
    )

export const updateCustomerTier = (
    customerId: string,
    body: UpdateCustomerTierRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateCustomerProfileResponse, UpdateCustomerTierRequest>(
        `/customers/profiles/${customerId}/tier`,
        body,
        config
    )

export const getCustomerImageAccess = (
    customerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<CustomerImageAccess>(
        `/customers/profiles/${customerId}/image-access`,
        config
    )

export const updateCustomerImageAccess = (
    customerId: string,
    body: UpdateCustomerImageAccessRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<
        UpdateCustomerProfileResponse,
        UpdateCustomerImageAccessRequest
    >(`/customers/profiles/${customerId}/image-access`, body, config)

export const getCustomerCreditPolicy = (
    customerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<CustomerCreditPolicy>(
        `/customers/profiles/${customerId}/credit-policy`,
        config
    )

export const putCustomerCreditPolicy = (
    customerId: string,
    body: UpdateCustomerCreditPolicyPutRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<
        UpdateCustomerProfileResponse,
        UpdateCustomerCreditPolicyPutRequest
    >(`/customers/profiles/${customerId}/credit-policy`, body, config)

export const patchCustomerCreditPolicy = (
    customerId: string,
    body: UpdateCustomerCreditPolicyPatchRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<
        UpdateCustomerProfileResponse,
        UpdateCustomerCreditPolicyPatchRequest
    >(`/customers/profiles/${customerId}/credit-policy`, body, config)

export const listCustomerGroupMemberships = (
    customerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListCustomerGroupMembershipsResponse>(
        `/customers/profiles/${customerId}/groups`,
        config
    )

export const addCustomerToGroup = (
    customerId: string,
    groupId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CustomerGroupMembership>(
        `/customers/profiles/${customerId}/groups/${groupId}`,
        undefined,
        config
    )

export const removeCustomerGroupMembership = (
    customerId: string,
    membershipId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch(
        `/customers/profiles/${customerId}/groups/${membershipId}/remove`,
        undefined,
        config
    )

export const setCustomerPrimaryGroup = (
    customerId: string,
    body: SetCustomerPrimaryGroupRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<
        SetCustomerPrimaryGroupResponse,
        SetCustomerPrimaryGroupRequest
    >(`/customers/profiles/${customerId}/group`, body, config)

export const getCustomerMarketer = (
    customerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<CustomerMarketer>(
        `/customers/profiles/${customerId}/marketer`,
        config
    )

export const assignCustomerMarketer = (
    customerId: string,
    body: AssignCustomerMarketerRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CustomerMarketer, AssignCustomerMarketerRequest>(
        `/customers/profiles/${customerId}/marketer`,
        body,
        config
    )

export const endCustomerMarketer = (
    customerId: string,
    body: EndCustomerMarketerRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CustomerMarketer, EndCustomerMarketerRequest>(
        `/customers/profiles/${customerId}/marketer/end`,
        body,
        config
    )

export const getRegistrationRequestCounts = (config?: AxiosRequestConfig) =>
    staffAuthGet<RegistrationRequestCounts>(
        '/customers/registration-requests/counts',
        config
    )

export const listRegistrationRequests = (
    params?: ListRegistrationRequestsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListRegistrationRequestsResponse>(
        '/customers/registration-requests',
        {
            ...config,
            params: toParams(params),
        }
    )

export const createRegistrationRequest = (
    body: CreateRegistrationRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<RegistrationRequest, CreateRegistrationRequest>(
        '/customers/registration-requests',
        body,
        config
    )

export const getRegistrationRequest = (
    requestId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetRegistrationRequestResponse>(
        `/customers/registration-requests/${requestId}`,
        config
    )

export const updateRegistrationRequest = (
    requestId: string,
    body: UpdateRegistrationRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<RegistrationRequest, UpdateRegistrationRequest>(
        `/customers/registration-requests/${requestId}`,
        body,
        config
    )

export const approveRegistrationRequest = (
    requestId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<RegistrationRequest>(
        `/customers/registration-requests/${requestId}/approve`,
        undefined,
        config
    )

export const rejectRegistrationRequest = (
    requestId: string,
    body: RejectRegistrationRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<RegistrationRequest, RejectRegistrationRequest>(
        `/customers/registration-requests/${requestId}/reject`,
        body,
        config
    )

export const listRegistrationRequestDocuments = (
    requestId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListRegistrationRequestDocumentsResponse>(
        `/customers/registration-requests/${requestId}/documents`,
        config
    )

export const listCustomerDocuments = (
    customerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListCustomerDocumentsResponse>(
        `/customers/profiles/${customerId}/documents`,
        config
    )

export const uploadCustomerDocument = (
    customerId: string,
    body: UploadCustomerDocumentRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CustomerDocument, FormData>(
        `/customers/profiles/${customerId}/documents`,
        toUploadDocumentFormData(body),
        multipartConfig(config)
    )

export const reviewCustomerDocument = (
    documentId: string,
    body: ReviewCustomerDocumentRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CustomerDocument, ReviewCustomerDocumentRequest>(
        `/customers/documents/${documentId}/review`,
        body,
        config
    )

export const deleteCustomerDocument = (
    documentId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete(`/customers/documents/${documentId}`, undefined, config)

export const downloadCustomerDocumentFile = (
    documentId: string,
    config?: AxiosRequestConfig
) => staffAuthGetBlob(`/customers/documents/${documentId}/file`, config)

export const listCustomerGroups = (
    params?: ListCustomerGroupsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListCustomerGroupsResponse>('/customers/groups', {
        ...config,
        params: toParams(params),
    })

export const createCustomerGroup = (
    body: CreateCustomerGroupRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CustomerGroup, CreateCustomerGroupRequest>(
        '/customers/groups',
        body,
        config
    )

export const getCustomerGroup = (
    groupId: string,
    config?: AxiosRequestConfig
) => staffAuthGet<CustomerGroup>(`/customers/groups/${groupId}`, config)

export const updateCustomerGroup = (
    groupId: string,
    body: UpdateCustomerGroupRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CustomerGroup, UpdateCustomerGroupRequest>(
        `/customers/groups/${groupId}`,
        body,
        config
    )

export const deactivateCustomerGroup = (
    groupId: string,
    body: VersionedCustomerGroupRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<CustomerGroup, VersionedCustomerGroupRequest>(
        `/customers/groups/${groupId}/deactivate`,
        body,
        config
    )

export const activateCustomerGroup = (
    groupId: string,
    body: VersionedCustomerGroupRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CustomerGroup, VersionedCustomerGroupRequest>(
        `/customers/groups/${groupId}/activate`,
        body,
        config
    )

export const setCustomerGroupMarketer = (
    groupId: string,
    body: SetCustomerGroupMarketerRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CustomerGroup, SetCustomerGroupMarketerRequest>(
        `/customers/groups/${groupId}/marketer`,
        body,
        config
    )

export const listCustomerGroupMembers = (
    groupId: string,
    params?: ListCustomerGroupMembersParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListCustomerGroupMembersResponse>(
        `/customers/groups/${groupId}/members`,
        {
            ...config,
            params: toParams(params),
        }
    )

export const addCustomerGroupMembers = (
    groupId: string,
    body: AddCustomerGroupMembersRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<
        AddCustomerGroupMembersResponse,
        AddCustomerGroupMembersRequest
    >(`/customers/groups/${groupId}/members`, body, config)

export const removeCustomerGroupMember = (
    groupId: string,
    membershipId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch(
        `/customers/groups/${groupId}/members/${membershipId}/remove`,
        undefined,
        config
    )
