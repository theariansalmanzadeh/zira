import { http } from '@/src/shared/lib/http'

export type CustomProperties = Record<string, string>

export type CustomerAddress = {
    first_name: string
    last_name: string
    state_province_id: number
    state_province_name: string
    city: string
    address1: string
    zip_postal_code: string
    phone_number: string
    address_title: string
    id: number
    custom_properties: CustomProperties
}

export type CustomerAddressesResponse = {
    addresses: CustomerAddress[]
    custom_properties: CustomProperties
}

export type AddCustomerAddressRequest = {
    address: CustomerAddress
    custom_properties: CustomProperties
}

export type AddCustomerAddressResponse = {
    model: {
        address: CustomerAddress
        custom_properties: CustomProperties
    }
    errors: string[]
}

export const getCustomerAddresses = async () => {
    const { data } = await http.get<CustomerAddressesResponse>(
        '/api/customer/addresses'
    )
    return data
}

export const addCustomerAddress = async (body: AddCustomerAddressRequest) => {
    const { data } = await http.post<AddCustomerAddressResponse>(
        '/api/customer/address/new',
        body
    )
    return data
}
