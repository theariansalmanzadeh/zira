import { addressFormSchema } from '@/src/shared/schema/admin/addressFormSchema'
import { emergencyFormFlatSchema } from '@/src/shared/schema/admin/emergencyFormSchema'
import { identityFormSchema } from '@/src/shared/schema/admin/identityFormSchema'
import type { FieldPath } from 'react-hook-form'
import { z } from 'zod'

export const newUserFormSchema = identityFormSchema
    .merge(addressFormSchema)
    .merge(emergencyFormFlatSchema)

export type NewUserFormValues = z.infer<typeof newUserFormSchema>

export const NEW_USER_DEFAULT_VALUES: NewUserFormValues = {
    firstName: '',
    lastName: '',
    nationalId: '',
    birthCertificateNumber: '',
    placeOfIssue: '',
    gender: '',
    fatherName: '',
    birthDate: '',
    maritalStatus: '',
    childrenCount: '',
    education: '',
    socialSecurityNumber: '',
    province: '',
    city: '',
    fullAddress: '',
    plaque: '',
    unit: '',
    postalCode: '',
    addressEmail: '',
    mobilePhone: '',
    landlinePhone: '',
    mobilePhone1: '',
    mobilePhone2: '',
    contactLandline: '',
    contactEmail: '',
    contact1FirstName: '',
    contact1LastName: '',
    contact1Landline: '',
    contact1Mobile: '',
    contact2FirstName: '',
    contact2LastName: '',
    contact2Landline: '',
    contact2Mobile: '',
}

export const IDENTITY_FIELDS = [
    'firstName',
    'lastName',
    'nationalId',
    'birthCertificateNumber',
    'placeOfIssue',
    'gender',
    'fatherName',
    'birthDate',
    'maritalStatus',
    'childrenCount',
    'education',
    'socialSecurityNumber',
] as const satisfies readonly FieldPath<NewUserFormValues>[]

export const ADDRESS_FIELDS = [
    'province',
    'city',
    'fullAddress',
    'plaque',
    'unit',
    'postalCode',
    'addressEmail',
    'mobilePhone',
    'landlinePhone',
    'mobilePhone1',
    'mobilePhone2',
    'contactLandline',
    'contactEmail',
] as const satisfies readonly FieldPath<NewUserFormValues>[]

export const EMERGENCY_FIELDS = [
    'contact1FirstName',
    'contact1LastName',
    'contact1Landline',
    'contact1Mobile',
    'contact2FirstName',
    'contact2LastName',
    'contact2Landline',
    'contact2Mobile',
] as const satisfies readonly FieldPath<NewUserFormValues>[]
