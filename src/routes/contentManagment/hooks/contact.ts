'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    contactInfo,
    updateContactInfo,
} from '@/src/api/admin/cms/contact'
import type {
    ContactInfoIn,
} from '@/src/api/types/admin/cms/contact'

export const cmsContactKeys = {
    all: ['cms', 'contact'] as const,
    contactInfo: () =>
        [...cmsContactKeys.all, 'contactInfo'] as const,
}

export const useContactInfo = () => {
    return useQuery({
        queryKey: cmsContactKeys.contactInfo(),
        
        queryFn: async () => {
            const result = await contactInfo()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateContactInfo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: ContactInfoIn }) => {
            const result = await updateContactInfo(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: cmsContactKeys.contactInfo(),
            })
        },
    })
}
