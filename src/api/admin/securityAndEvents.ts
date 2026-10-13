import type { AxiosRequestConfig } from 'axios'

import { staffAuthGet } from '../http'
import type { ActiveSession } from '../types/admin/securityAndEvents'

export const getActiveSession = (
    sessionId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ActiveSession>(
        `/events/sessions/active/${sessionId}`,
        config
    )
