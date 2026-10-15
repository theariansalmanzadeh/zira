'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    listCertificates,
    createCertificate,
    certificateDetail,
    updateCertificate,
    certificateFile,
    replaceCertificateFile,
    archiveCertificate,
} from '@/src/api/admin/cms/certificates'
import type {
    ListCertificatesParams,
    CreateCertificateRequest,
    CertificateUpdateIn,
    ReplaceCertificateFileRequest,
} from '@/src/api/types/admin/cms/certificates'

export const cmsCertificatesKeys = {
    all: ['cms', 'certificates'] as const,
    listCertificates: (params?: ListCertificatesParams) =>
        [...cmsCertificatesKeys.all, 'listCertificates', params ?? {}] as const,
    certificateDetail: (certificateId: string) =>
        [...cmsCertificatesKeys.all, 'certificateDetail', certificateId] as const,
}

export const useListCertificates = (params?: ListCertificatesParams) => {
    return useQuery({
        queryKey: cmsCertificatesKeys.listCertificates(params),
        
        queryFn: async () => {
            const result = await listCertificates(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateCertificate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: CreateCertificateRequest }) => {
            const result = await createCertificate(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [...cmsCertificatesKeys.all, 'listCertificates'],
            })
        },
    })
}

export const useCertificateDetail = (certificateId: string, enabled = true) => {
    return useQuery({
        queryKey: cmsCertificatesKeys.certificateDetail(certificateId),
        enabled: Boolean(certificateId) && enabled,
        queryFn: async () => {
            const result = await certificateDetail(certificateId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateCertificate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ certificateId, body }: { certificateId: string; body: CertificateUpdateIn }) => {
            const result = await updateCertificate(certificateId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsCertificatesKeys.all })
        },
    })
}

export const useCertificateFile = () => {
    return useMutation({
        mutationFn: async ({ certificateId }: { certificateId: string }) => {
            const result = await certificateFile(certificateId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useReplaceCertificateFile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ certificateId, body }: { certificateId: string; body: ReplaceCertificateFileRequest }) => {
            const result = await replaceCertificateFile(certificateId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsCertificatesKeys.all })
        },
    })
}

export const useArchiveCertificate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ certificateId }: { certificateId: string }) => {
            const result = await archiveCertificate(certificateId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsCertificatesKeys.all })
        },
    })
}
