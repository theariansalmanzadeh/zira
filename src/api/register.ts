import { publicApi } from './config'
import type { RefreshTokenResponse } from './types/auth'

const REFRESH_TOKEN_URL = '/auth/token/refresh'

export async function refreshSession() {
    const { data } = await publicApi.post<RefreshTokenResponse>(REFRESH_TOKEN_URL)
    return data.access_token
}

export async function refreshStaffSession() {
    const { data } = await publicApi.post<RefreshTokenResponse>(REFRESH_TOKEN_URL)
    return data.access_token
}
