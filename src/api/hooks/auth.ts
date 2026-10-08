'use client'

import { useMutation } from '@tanstack/react-query'

import {
    requestCustomerOtp,
    staffLogin,
    verifyCustomerOtp,
} from '@/src/api/public/auth'
import type {
    RequestCustomerOtpRequest,
    StaffLoginRequest,
    VerifyCustomerOtpRequest,
} from '@/src/api/types/auth'

export const useRequestCustomerOtp = () => {
    return useMutation({
        mutationFn: async (body: RequestCustomerOtpRequest) => {
            const result = await requestCustomerOtp(body)
            if (!result.success) {
                throw result.error
            }
            return result.data
        },
    })
}

export const useVerifyCustomerOtp = () => {
    return useMutation({
        mutationFn: async (body: VerifyCustomerOtpRequest) => {
            const result = await verifyCustomerOtp(body)
            if (!result.success) {
                throw result.error
            }
            return result.data
        },
    })
}

export const useStaffLogin = () => {
    return useMutation({
        mutationFn: async (body: StaffLoginRequest) => {
            const result = await staffLogin(body)
            if (!result.success) {
                throw result.error
            }
            return result.data
        },
    })
}
