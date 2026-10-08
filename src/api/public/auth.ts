import type { AxiosRequestConfig } from 'axios'

import { publicPost } from '../http'
import type {
    CustomerPasswordLoginRequest,
    CustomerPasswordLoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    RequestCustomerOtpRequest,
    RequestCustomerOtpResponse,
    RevokeAllTokensResponse,
    RevokeTokenRequest,
    RevokeTokenResponse,
    StaffLoginRequest,
    StaffLoginResponse,
    VerifyCustomerOtpRequest,
    VerifyCustomerOtpResponse,
} from '../types/auth'

export const staffLogin = (
    body: StaffLoginRequest,
    config?: AxiosRequestConfig
) =>
    publicPost<StaffLoginResponse, StaffLoginRequest>(
        '/auth/staff/login',
        true,
        body,
        config
    )

export const requestCustomerOtp = (
    body: RequestCustomerOtpRequest,
    config?: AxiosRequestConfig
) =>
    publicPost<RequestCustomerOtpResponse, RequestCustomerOtpRequest>(
        '/auth/customer/otp/request',
        true,
        {
            channel: 'sms',
            ...body,
        },
        config
    )

export const verifyCustomerOtp = (
    body: VerifyCustomerOtpRequest,
    config?: AxiosRequestConfig
) =>
    publicPost<VerifyCustomerOtpResponse, VerifyCustomerOtpRequest>(
        '/auth/customer/otp/verify',
        true,
        body,
        config
    )

export const customerPasswordLogin = (
    body: CustomerPasswordLoginRequest,
    config?: AxiosRequestConfig
) =>
    publicPost<CustomerPasswordLoginResponse, CustomerPasswordLoginRequest>(
        '/auth/customer/password/login',
        true,
        body,
        config
    )

export const refreshToken = (
    body?: RefreshTokenRequest,
    config?: AxiosRequestConfig
) =>
    publicPost<RefreshTokenResponse, RefreshTokenRequest>(
        '/auth/token/refresh',
        false,
        body,
        config
    )

export const revokeToken = (
    body?: RevokeTokenRequest,
    config?: AxiosRequestConfig
) =>
    publicPost<RevokeTokenResponse, RevokeTokenRequest>(
        '/auth/token/revoke',
        true,
        body,
        config
    )

export const revokeAllTokens = (config?: AxiosRequestConfig) =>
    publicPost<RevokeAllTokensResponse>(
        '/auth/token/revoke-all',
        true,
        undefined,
        config
    )
