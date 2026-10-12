import type { CreateStaffUserRequest } from '@/src/api/types/admin/user'
import type { NewUserFormValues } from '../schema'

const text = (value?: string) => value?.trim() ?? ''

const toDate = (value?: string) => {
    const trimmed = text(value)
    if (!trimmed) return ''
    return trimmed.slice(0, 10)
}

export const toCreateStaffUserRequest = (
    values: NewUserFormValues
): CreateStaffUserRequest => ({
    first_name: text(values.firstName),
    last_name: text(values.lastName),
    national_id: text(values.nationalId),
    birth_certificate_no: text(values.birthCertificateNumber),
    issue_place: text(values.placeOfIssue),
    father_name: text(values.fatherName),
    birth_date: toDate(values.birthDate),
    gender: text(values.gender),
    marital_status: text(values.maritalStatus),
    children_count: Number(values.childrenCount) || 0,
    educational_qualification: text(values.education),
    social_security_no: text(values.socialSecurityNumber),
    province: text(values.province),
    city: text(values.city),
    full_address: text(values.fullAddress),
    postal_code: text(values.postalCode),
    phone: text(values.landlinePhone) || text(values.contactLandline),
    email: text(values.addressEmail) || text(values.contactEmail),
    mobile_1: text(values.mobilePhone1) || text(values.mobilePhone),
    mobile_2: text(values.mobilePhone2),
    next_of_kin: [
        {
            full_name: `${text(values.contact1FirstName)} ${text(values.contact1LastName)}`.trim(),
            relation: '',
            phone: text(values.contact1Mobile) || text(values.contact1Landline),
            address: '',
        },
        {
            full_name: `${text(values.contact2FirstName)} ${text(values.contact2LastName)}`.trim(),
            relation: '',
            phone: text(values.contact2Mobile) || text(values.contact2Landline),
            address: '',
        },
    ],
    account_no: text(values.accountNumber),
    bank_name: text(values.bankName),
    iban: text(values.shebaNumber),
    card_no: text(values.cardNumber),
    phone_number: text(values.mobilePhone) || text(values.mobilePhone1),
    password: values.initialPassword,
    user_type: text(values.userType),
    role_id: text(values.userRole),
    status: text(values.initialAccountStatus),
    username: text(values.username),
    account_description: '',
    department_id: text(values.activityDepartment),
    primary_branch_id: text(values.assignedBranch) || text(values.destinationBranch),
    direct_manager_id: text(values.directManager),
    job_title: text(values.jobTitle),
    job_description: '',
    has_commission_contract: values.hasPercentageSalesContract,
    commission_percent: 0,
    documents: [],
})
