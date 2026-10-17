import type { AxiosRequestConfig } from 'axios'

import { staffAuthPatch } from '../http'
import type { MessageResponse } from '../types/admin/user'

export const revokeSession = (
    sessionId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<MessageResponse>(
        `/auth/sessions/${sessionId}/revoke`,
        undefined,
        config
    )
