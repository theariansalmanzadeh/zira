import type {
    CreateRegistrationRequest,
    CustomerType,
} from '@/src/api/types/admin/customers'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'
import type { NewCustomerFormValues } from '../schema'

const digitsOnly = (value: string) => toEnglishDigits(value).replace(/\D/g, '')

const normalizeMobile = (value: string) => {
    const digits = digitsOnly(value)
    if (digits.startsWith('98') && digits.length === 12) return `0${digits.slice(2)}`
    if (digits.startsWith('9') && digits.length === 10) return `0${digits}`
    return digits
}

const filled = (value?: string) => {
    const trimmed = value?.trim()
    return trimmed ? trimmed : undefined
}

const CUSTOMER_TYPES = [
    'WHOLESALE',
    'RETAIL',
    'ORGANIZATIONAL',
    'OTHER',
] as const satisfies readonly CustomerType[]

const customerType = (value: string): CustomerType | undefined =>
    CUSTOMER_TYPES.find((type) => type === value)

export const toCreateRegistrationRequest = (
    values: NewCustomerFormValues
): CreateRegistrationRequest => {
    const payload: CreateRegistrationRequest = {
        mobile_1: normalizeMobile(values.mobile1),
        national_id: digitsOnly(values.nationalId),
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
    }

    const businessLicenseNo = digitsOnly(values.businessLicenseNumber)
    const phone = digitsOnly(values.landline ?? '')
    const mobile2 = values.mobile2 ? normalizeMobile(values.mobile2) : ''
    const referrerName = filled(values.referrerName)
    const address = filled(values.address)
    const type = customerType(values.customerType)

    if (businessLicenseNo) payload.business_license_no = businessLicenseNo
    if (phone) payload.phone = phone
    if (mobile2) payload.mobile_2 = mobile2
    if (referrerName) payload.referrer_name = referrerName
    if (address) payload.address = address
    if (type) payload.customer_type = type

    return payload
}
