import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthGetBlob,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../../http'
import type {
    CertificateOut,
    CertificateUpdateIn,
    CreateCertificateRequest,
    ListCertificatesParams,
    PaginationOut_CertificateOut_,
    ReplaceCertificateFileRequest,
} from '../../types/admin/cms/certificates'

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

const toCreateCertificateFormData = (body: CreateCertificateRequest) => {
    const formData = new FormData()
    if (body.category !== undefined && body.category !== null) formData.append('category', String(body.category))
    if (body.title !== undefined && body.title !== null) formData.append('title', String(body.title))
    if (body.issuer !== undefined && body.issuer !== null) formData.append('issuer', String(body.issuer))
    if (body.document_no !== undefined && body.document_no !== null) formData.append('document_no', String(body.document_no))
    if (body.issued_on !== undefined && body.issued_on !== null) formData.append('issued_on', String(body.issued_on))
    if (body.expires_on !== undefined && body.expires_on !== null) formData.append('expires_on', String(body.expires_on))
    if (body.description !== undefined && body.description !== null) formData.append('description', String(body.description))
    if (body.is_visible !== undefined && body.is_visible !== null) formData.append('is_visible', String(body.is_visible))
    if (body.sort_order !== undefined && body.sort_order !== null) formData.append('sort_order', String(body.sort_order))
    if (body.file !== undefined && body.file !== null) formData.append('file', body.file)
    return formData
}

const toReplaceCertificateFileFormData = (body: ReplaceCertificateFileRequest) => {
    const formData = new FormData()
    if (body.file !== undefined && body.file !== null) formData.append('file', body.file)
    return formData
}

export const listCertificates = (
    params?: ListCertificatesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_CertificateOut_>(`/cms/certificates`, { ...config, params: toParams(params) })

export const createCertificate = (
    body: CreateCertificateRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CertificateOut, FormData>(`/cms/certificates`, toCreateCertificateFormData(body), multipartConfig(config))

export const certificateDetail = (
    certificateId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<CertificateOut>(`/cms/certificates/${certificateId}`, config)

export const updateCertificate = (
    certificateId: string,
    body: CertificateUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CertificateOut, CertificateUpdateIn>(`/cms/certificates/${certificateId}`, body, config)

export const certificateFile = (
    certificateId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/cms/certificates/${certificateId}/file`, config)

export const replaceCertificateFile = (
    certificateId: string,
    body: ReplaceCertificateFileRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CertificateOut, FormData>(`/cms/certificates/${certificateId}/file`, toReplaceCertificateFileFormData(body), multipartConfig(config))

export const archiveCertificate = (
    certificateId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<CertificateOut>(`/cms/certificates/${certificateId}/archive`, undefined, config)

