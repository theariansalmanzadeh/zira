import type { AxiosRequestConfig } from 'axios'

import { staffAuthDelete } from '../http'
import type { MessageResponse } from '../types/admin/user'

export const revokeSession = (
    sessionId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<MessageResponse>(
        `/auth/sessions/${sessionId}`,
        undefined,
        config
    )
