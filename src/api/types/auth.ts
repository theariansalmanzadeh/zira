export type TokenPairResponse = {
    access_token: string
    refresh_token?: string
    token_type?: string
}

export type MessageResponse = {
    message: string
}

export type StaffLoginRequest = {
    username: string
    password: string
}

export type StaffLoginResponse = {
    access_token: string
    expires_in: number
}

export type OtpChannel = 'sms' | 'call'

export type RequestCustomerOtpRequest = {
    phone_number: string
    channel?: OtpChannel
}

export type RequestCustomerOtpResponse = MessageResponse

export type VerifyCustomerOtpRequest = {
    phone_number: string
    code: string
}

export type VerifyCustomerOtpResponse = {
    access_token: string
    expires_in: number
}

export type CustomerPasswordLoginRequest = {
    phone: string
    password: string
}

export type CustomerPasswordLoginResponse = TokenPairResponse

export type RefreshTokenRequest = {
    refresh_token?: string
}

export type RefreshTokenResponse = TokenPairResponse

export type RevokeTokenRequest = {
    refresh_token?: string
}

export type RevokeTokenResponse = MessageResponse

export type RevokeAllTokensResponse = MessageResponse
