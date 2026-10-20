import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../http'
import type {
    CreateUnitRequest,
    CreateUnitResponse,
    DeleteUnitResponse,
    GetCatalogConfigResponse,
    GetCatalogDisplayResponse,
    GetCommercePolicyResponse,
    GetSequenceResponse,
    GetUnitResponse,
    ListGradePoliciesParams,
    ListGradePoliciesResponse,
    ListNamingRuleParams,
    ListNamingRuleResponse,
    ListScoreFormulaParams,
    ListScoreFormulaResponse,
    ListSequencesParams,
    ListSequencesResponse,
    ListUnitsParams,
    ListUnitsResponse,
    NamingRuleTarget,
    SetGradePolicyRequest,
    SetGradePolicyResponse,
    SetNamingRuleRequest,
    SetNamingRuleResponse,
    UpdateCatalogConfigRequest,
    UpdateCatalogConfigResponse,
    UpdateCatalogDisplayRequest,
    UpdateCatalogDisplayResponse,
    UpdateCommercePolicyRequest,
    UpdateCommercePolicyResponse,
    UpdateScoreFormulaRequest,
    UpdateScoreFormulaResponse,
    UpdateSequenceRequest,
    UpdateSequenceResponse,
    UpdateUnitRequest,
    UpdateUnitResponse,
} from '../types/admin/settings'

const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined

export const listUnits = (
    params?: ListUnitsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListUnitsResponse>('/settings/units', {
        ...config,
        params: toParams(params),
    })

export const createUnit = (
    body: CreateUnitRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CreateUnitResponse, CreateUnitRequest>(
        '/settings/units',
        body,
        config
    )

export const getUnit = (unitId: string, config?: AxiosRequestConfig) =>
    staffAuthGet<GetUnitResponse>(`/settings/units/${unitId}`, config)

export const updateUnit = (
    unitId: string,
    body: UpdateUnitRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateUnitResponse, UpdateUnitRequest>(
        `/settings/units/${unitId}`,
        body,
        config
    )

export const deleteUnit = (unitId: string, config?: AxiosRequestConfig) =>
    staffAuthDelete<DeleteUnitResponse>(
        `/settings/units/${unitId}`,
        undefined,
        config
    )

export const listSequences = (
    params?: ListSequencesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListSequencesResponse>('/settings/sequences', {
        ...config,
        params: toParams(params),
    })

export const getSequence = (
    sequenceId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetSequenceResponse>(
        `/settings/sequences/${sequenceId}`,
        config
    )

export const updateSequence = (
    sequenceId: string,
    body: UpdateSequenceRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateSequenceResponse, UpdateSequenceRequest>(
        `/settings/sequences/${sequenceId}`,
        body,
        config
    )

export const getCommercePolicy = (config?: AxiosRequestConfig) =>
    staffAuthGet<GetCommercePolicyResponse>(
        '/settings/commerce-policy',
        config
    )

export const updateCommercePolicy = (
    body: UpdateCommercePolicyRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateCommercePolicyResponse, UpdateCommercePolicyRequest>(
        '/settings/commerce-policy',
        body,
        config
    )

export const getCatalogDisplay = (config?: AxiosRequestConfig) =>
    staffAuthGet<GetCatalogDisplayResponse>(
        '/settings/catalog-display',
        config
    )

export const updateCatalogDisplay = (
    body: UpdateCatalogDisplayRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateCatalogDisplayResponse, UpdateCatalogDisplayRequest>(
        '/settings/catalog-display',
        body,
        config
    )

export const getCatalogConfig = (config?: AxiosRequestConfig) =>
    staffAuthGet<GetCatalogConfigResponse>('/settings/catalog-config', config)

export const updateCatalogConfig = (
    body: UpdateCatalogConfigRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateCatalogConfigResponse, UpdateCatalogConfigRequest>(
        '/settings/catalog-config',
        body,
        config
    )

export const listScoreFormula = (
    params?: ListScoreFormulaParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListScoreFormulaResponse>('/settings/score-formula', {
        ...config,
        params: toParams(params),
    })

export const updateScoreFormula = (
    body: UpdateScoreFormulaRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<UpdateScoreFormulaResponse, UpdateScoreFormulaRequest>(
        '/settings/score-formula',
        body,
        config
    )

export const listNamingRule = (
    target: NamingRuleTarget,
    params?: ListNamingRuleParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListNamingRuleResponse>(
        `/settings/naming-rules/${target}`,
        {
            ...config,
            params: toParams(params),
        }
    )

export const setNamingRule = (
    target: NamingRuleTarget,
    body: SetNamingRuleRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<SetNamingRuleResponse, SetNamingRuleRequest>(
        `/settings/naming-rules/${target}`,
        body,
        config
    )

export const listGradePolicies = (
    params?: ListGradePoliciesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListGradePoliciesResponse>('/settings/grade-policies', {
        ...config,
        params: toParams(params),
    })

export const setGradePolicy = (
    grade: number,
    body: SetGradePolicyRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<SetGradePolicyResponse, SetGradePolicyRequest>(
        `/settings/grade-policies/${grade}`,
        body,
        config
    )
