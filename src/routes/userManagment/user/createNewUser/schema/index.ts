import { addressFormSchema } from '@/src/shared/schema/admin/addressFormSchema'
import { emergencyFormFlatSchema } from '@/src/shared/schema/admin/emergencyFormSchema'
import { identityFormSchema } from '@/src/shared/schema/admin/identityFormSchema'
import type { FieldPath } from 'react-hook-form'
import { z } from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)
const optionalString = z.string().trim().optional().or(z.literal(''))

export const bankInfoSchema = z.object({
    bankName: requiredString('نام بانک الزامی است'),
    accountNumber: requiredString('شماره حساب الزامی است'),
    cardNumber: requiredString('شماره کارت الزامی است'),
    shebaNumber: requiredString('شماره شبا الزامی است'),
})

export const securityAndRoleSchema = z.object({
    username: requiredString('نام کاربری الزامی است'),
    initialPassword: z
        .string()
        .trim()
        .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
    userType: requiredString('نوع کاربر الزامی است'),
    userRole: requiredString('نقش کاربر الزامی است'),
    roleExpirationDate: optionalString,
    initialAccountStatus: requiredString('وضعیت اولیه حساب الزامی است'),
    accountCreationDate: z.string(),
})

export const occupationInfoSchema = z.object({
    activityDepartment: requiredString('بخش محل فعالیت الزامی است'),
    directManager: requiredString('مدیر مستقیم الزامی است'),
    jobTitle: requiredString('عنوان شغلی الزامی است'),
    destinationBranch: optionalString,
    assignedBranch: optionalString,
    hasPercentageSalesContract: z.boolean(),
})

export const documentsFormSchema = z.object({
    documents: z
        .array(
            z.object({
                slot: z.string(),
                file: z.string(),
            })
        )
        .optional(),
})

export const newUserFormSchema = identityFormSchema
    .merge(addressFormSchema)
    .merge(emergencyFormFlatSchema)
    .merge(bankInfoSchema)
    .merge(securityAndRoleSchema)
    .merge(occupationInfoSchema)
    .merge(documentsFormSchema)

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
    bankName: '',
    accountNumber: '',
    cardNumber: '',
    shebaNumber: '',
    username: '',
    initialPassword: '',
    userType: 'internal_employee',
    userRole: '',
    roleExpirationDate: '',
    initialAccountStatus: 'active',
    accountCreationDate: new Date().toISOString(),
    activityDepartment: '',
    directManager: '',
    jobTitle: '',
    destinationBranch: '',
    assignedBranch: '',
    hasPercentageSalesContract: false,
    documents: [],
}

export const EDIT_USER_DEFAULT_VALUES: NewUserFormValues = {
    firstName: 'علی',
    lastName: 'رضایی',
    nationalId: '0012345678',
    birthCertificateNumber: '123456',
    placeOfIssue: 'تهران',
    gender: 'male',
    fatherName: 'محمد',
    birthDate: '1990-05-15T00:00:00.000Z',
    maritalStatus: 'married',
    childrenCount: '2',
    education: 'bachelor',
    socialSecurityNumber: '1234567890',
    province: 'tehran',
    city: 'tehran',
    fullAddress: 'خیابان ولیعصر، پلاک ۱۲',
    plaque: '۱۲',
    unit: '۳',
    postalCode: '1234567890',
    addressEmail: 'ali.rezaei@example.com',
    mobilePhone: '09121234567',
    landlinePhone: '02188776655',
    mobilePhone1: '09121234567',
    mobilePhone2: '',
    contactLandline: '02188776655',
    contactEmail: 'ali.rezaei@example.com',
    contact1FirstName: 'سارا',
    contact1LastName: 'رضایی',
    contact1Landline: '02144112233',
    contact1Mobile: '09123334455',
    contact2FirstName: 'حسین',
    contact2LastName: 'محمدی',
    contact2Landline: '',
    contact2Mobile: '09125556677',
    bankName: 'melli',
    accountNumber: '0102030405',
    cardNumber: '6037991234567890',
    shebaNumber: 'IR120170000000123456789001',
    username: 'ali.rezaei',
    initialPassword: 'Password1',
    userType: 'internal_employee',
    userRole: 'system_admin',
    roleExpirationDate: '',
    initialAccountStatus: 'active',
    accountCreationDate: '2025-12-19T00:00:00.000Z',
    activityDepartment: 'sales',
    directManager: 'user-1',
    jobTitle: 'کارشناس فروش',
    destinationBranch: 'vanak',
    assignedBranch: 'vanak',
    hasPercentageSalesContract: true,
    documents: [],
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

export const BANK_INFO_FIELDS = [
    'bankName',
    'accountNumber',
    'cardNumber',
    'shebaNumber',
] as const satisfies readonly FieldPath<NewUserFormValues>[]

export const SECURITY_AND_ROLE_FIELDS = [
    'username',
    'initialPassword',
    'userType',
    'userRole',
    'roleExpirationDate',
    'initialAccountStatus',
    'accountCreationDate',
] as const satisfies readonly FieldPath<NewUserFormValues>[]

export const OCCUPATION_INFO_FIELDS = [
    'activityDepartment',
    'directManager',
    'jobTitle',
    'destinationBranch',
    'assignedBranch',
    'hasPercentageSalesContract',
] as const satisfies readonly FieldPath<NewUserFormValues>[]
