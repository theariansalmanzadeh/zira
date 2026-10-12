import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthGet,
    staffAuthPut,
} from '../../http'
import type {
    ContactInfoIn,
    ContactInfoOut,
} from '../../types/admin/cms/contact'

const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined


export const contactInfo = (
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ContactInfoOut>(`/cms/contact-info`, config)

export const updateContactInfo = (
    body: ContactInfoIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ContactInfoOut, ContactInfoIn>(`/cms/contact-info`, body, config)

