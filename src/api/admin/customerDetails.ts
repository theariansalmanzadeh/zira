import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthGet,
    staffAuthGetBlob,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../http'
import type {
    ChangeRequest,
    ChangeRequestCreateIn,
    ChangeRequestRejectIn,
    CreateCustomerGuaranteeRequest,
    CreditAccount,
    CreditAccountStatusIn,
    CreditAccountTermIn,
    CreditLock,
    CreditLockManualIn,
    CreditLockReleaseIn,
    CreditLockSuspendIn,
    CreditSummary,
    CreditType,
    Guarantee,
    GuaranteeReleaseIn,
    GuaranteeUpdateIn,
    ListAccountChangeRequestsParams,
    ListAccountChangeRequestsResponse,
    ListCreditChangeRequestsParams,
    ListCreditChangeRequestsResponse,
    ListCustomerGuaranteesParams,
    ListCustomerGuaranteesResponse,
    ListCustomerLocksParams,
    ListCustomerLocksResponse,
    ReplaceGuaranteeFileRequest,
    StepwiseActionIn,
} from '../types/admin/customerDetails'

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

const appendField = (
    formData: FormData,
    key: string,
    value: string | number | Blob | null | undefined
) => {
    if (value === undefined || value === null) return
    formData.append(key, value instanceof Blob ? value : String(value))
}

const toCreateGuaranteeFormData = (body: CreateCustomerGuaranteeRequest) => {
    const formData = new FormData()
    appendField(formData, 'credit_account_id', body.credit_account_id)
    appendField(formData, 'guarantee_type', body.guarantee_type)
    appendField(formData, 'amount', body.amount)
    appendField(formData, 'document_no', body.document_no)
    appendField(formData, 'bank_id', body.bank_id)
    appendField(formData, 'bank_branch_name', body.bank_branch_name)
    appendField(formData, 'owner_name', body.owner_name)
    appendField(formData, 'guarantor_name', body.guarantor_name)
    appendField(formData, 'guarantor_national_id', body.guarantor_national_id)
    appendField(formData, 'issue_place', body.issue_place)
    appendField(formData, 'due_date', body.due_date)
    appendField(formData, 'file', body.file)
    return formData
}

const toReplaceGuaranteeFileFormData = (body: ReplaceGuaranteeFileRequest) => {
    const formData = new FormData()
    appendField(formData, 'file', body.file)
    return formData
}

export const getCustomerCreditSummary = (
    customerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<CreditSummary>(
        `/customers/profiles/${customerId}/credit`,
        config
    )

export const openCustomerCreditAccount = (
    customerId: string,
    creditType: CreditType,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CreditAccount>(
        `/customers/profiles/${customerId}/credit-accounts/${creditType}`,
        undefined,
        config
    )

export const setCreditAccountStatus = (
    accountId: string,
    body: CreditAccountStatusIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CreditAccount, CreditAccountStatusIn>(
        `/customers/credit-accounts/${accountId}/status`,
        body,
        config
    )

export const setCreditAccountTerm = (
    accountId: string,
    body: CreditAccountTermIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CreditAccount, CreditAccountTermIn>(
        `/customers/credit-accounts/${accountId}/term`,
        body,
        config
    )

export const enableCreditAccountStepwise = (
    accountId: string,
    body: StepwiseActionIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CreditAccount, StepwiseActionIn>(
        `/customers/credit-accounts/${accountId}/stepwise/enable`,
        body,
        config
    )

export const disableCreditAccountStepwise = (
    accountId: string,
    body: StepwiseActionIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreditAccount, StepwiseActionIn>(
        `/customers/credit-accounts/${accountId}/stepwise/disable`,
        body,
        config
    )

export const createCreditChangeRequest = (
    accountId: string,
    body: ChangeRequestCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ChangeRequest, ChangeRequestCreateIn>(
        `/customers/credit-accounts/${accountId}/change-request`,
        body,
        config
    )

export const listAccountChangeRequests = (
    accountId: string,
    params?: ListAccountChangeRequestsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListAccountChangeRequestsResponse>(
        `/customers/credit-accounts/${accountId}/change-requests`,
        { ...config, params: toParams(params) }
    )

export const listCreditChangeRequests = (
    params?: ListCreditChangeRequestsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListCreditChangeRequestsResponse>(
        '/customers/credit-change-requests',
        { ...config, params: toParams(params) }
    )

export const approveCreditChangeRequest = (
    requestId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ChangeRequest>(
        `/customers/credit-change-requests/${requestId}/approve`,
        undefined,
        config
    )

export const rejectCreditChangeRequest = (
    requestId: string,
    body: ChangeRequestRejectIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ChangeRequest, ChangeRequestRejectIn>(
        `/customers/credit-change-requests/${requestId}/reject`,
        body,
        config
    )

export const listCustomerGuarantees = (
    customerId: string,
    params?: ListCustomerGuaranteesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListCustomerGuaranteesResponse>(
        `/customers/profiles/${customerId}/guarantees`,
        { ...config, params: toParams(params) }
    )

export const createCustomerGuarantee = (
    customerId: string,
    body: CreateCustomerGuaranteeRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<Guarantee, FormData>(
        `/customers/profiles/${customerId}/guarantees`,
        toCreateGuaranteeFormData(body),
        multipartConfig(config)
    )

export const updateCustomerGuarantee = (
    guaranteeId: string,
    body: GuaranteeUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<Guarantee, GuaranteeUpdateIn>(
        `/customers/guarantees/${guaranteeId}`,
        body,
        config
    )

export const replaceGuaranteeFile = (
    guaranteeId: string,
    body: ReplaceGuaranteeFileRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<Guarantee, FormData>(
        `/customers/guarantees/${guaranteeId}/file`,
        toReplaceGuaranteeFileFormData(body),
        multipartConfig(config)
    )

export const downloadGuaranteeFile = (
    guaranteeId: string,
    config?: AxiosRequestConfig
) => staffAuthGetBlob(`/customers/guarantees/${guaranteeId}/file`, config)

export const activateCustomerGuarantee = (
    guaranteeId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<Guarantee>(
        `/customers/guarantees/${guaranteeId}/activate`,
        undefined,
        config
    )

export const releaseCustomerGuarantee = (
    guaranteeId: string,
    body: GuaranteeReleaseIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<Guarantee, GuaranteeReleaseIn>(
        `/customers/guarantees/${guaranteeId}/release`,
        body,
        config
    )

export const listCustomerLocks = (
    customerId: string,
    params?: ListCustomerLocksParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListCustomerLocksResponse>(
        `/customers/profiles/${customerId}/locks`,
        { ...config, params: toParams(params) }
    )

export const createCustomerManualLock = (
    customerId: string,
    body: CreditLockManualIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CreditLock, CreditLockManualIn>(
        `/customers/profiles/${customerId}/manual-lock`,
        body,
        config
    )

export const suspendCustomerCreditLock = (
    lockId: string,
    body: CreditLockSuspendIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CreditLock, CreditLockSuspendIn>(
        `/customers/locks/${lockId}/suspend`,
        body,
        config
    )

export const releaseCustomerCreditLock = (
    lockId: string,
    body: CreditLockReleaseIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CreditLock, CreditLockReleaseIn>(
        `/customers/locks/${lockId}/release`,
        body,
        config
    )
