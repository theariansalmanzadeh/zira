'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    addCustomerAddress,
    getCustomerAddresses,
    type AddCustomerAddressRequest,
} from '@/src/shared/api/profile'

export const profileKeys = {
    all: ['profile'] as const,
    addresses: ['profile', 'addresses'] as const,
}

export const useCustomerAddresses = () => {
    return useQuery({
        queryKey: profileKeys.addresses,
        queryFn: getCustomerAddresses,
    })
}

export const useAddCustomerAddress = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: AddCustomerAddressRequest) => addCustomerAddress(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.addresses })
        },
    })
}
