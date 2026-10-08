import type { AxiosRequestConfig } from 'axios'

import { publicPost } from '../http'
import type {
    SubmitPublicContactFormRequest,
    SubmitPublicContactFormResponse,
} from '../types/support'

export const submitPublicContactForm = (
    body: SubmitPublicContactFormRequest,
    config?: AxiosRequestConfig
) =>
    publicPost<SubmitPublicContactFormResponse, SubmitPublicContactFormRequest>(
        '/support/contact',
        true,
        body,
        config
    )
