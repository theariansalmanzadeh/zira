import type { UpdateUserRequest, User } from '@/src/api/types/admin/user'
import {
    EDIT_USER_DEFAULT_VALUES,
    type NewUserFormValues,
} from '../../createNewUser/schema'

const splitName = (fullName?: string) => {
    const parts = fullName?.trim().split(/\s+/).filter(Boolean) ?? []
    return {
        first: parts[0] ?? '',
        last: parts.slice(1).join(' '),
    }
}

export const toEditUserFormValues = (user: User): NewUserFormValues => {
    const address = user.addresses[0]
    const bank = user.bank_accounts[0]
    const firstKin = splitName(user.next_of_kin[0]?.full_name)
    const secondKin = splitName(user.next_of_kin[1]?.full_name)

    return {
        ...EDIT_USER_DEFAULT_VALUES,
        firstName: user.first_name,
        lastName: user.last_name,
        nationalId: user.national_id,
        birthCertificateNumber: user.identity?.birth_certificate_no ?? '',
        placeOfIssue: user.identity?.issue_place ?? '',
        gender: user.identity?.gender ?? '',
        fatherName: user.identity?.father_name ?? '',
        birthDate: user.identity?.birth_date ?? '',
        maritalStatus: user.identity?.marital_status ?? '',
        childrenCount: String(user.identity?.children_count ?? ''),
        education: user.identity?.educational_qualification ?? '',
        socialSecurityNumber: user.identity?.social_security_no ?? '',
        province: address?.province ?? '',
        city: address?.city ?? '',
        fullAddress: address?.full_address ?? '',
        postalCode: address?.postal_code ?? '',
        addressEmail: user.email,
        mobilePhone: user.phone_number,
        landlinePhone: address?.phone ?? '',
        mobilePhone1: address?.mobile_1 || user.phone_number,
        mobilePhone2: address?.mobile_2 ?? '',
        contactLandline: address?.phone ?? '',
        contactEmail: user.email,
        contact1FirstName: firstKin.first,
        contact1LastName: firstKin.last,
        contact1Mobile: user.next_of_kin[0]?.phone ?? '',
        contact2FirstName: secondKin.first,
        contact2LastName: secondKin.last,
        contact2Mobile: user.next_of_kin[1]?.phone ?? '',
        bankName: bank?.bank_name ?? '',
        accountNumber: bank?.account_no ?? '',
        cardNumber: bank?.card_no ?? '',
        shebaNumber: bank?.iban ?? '',
        username: user.username,
        userType: user.user_type,
        userRole: user.roles[0] ?? '',
        initialAccountStatus: user.is_active ? 'active' : user.status,
        accountCreationDate: user.created_at,
        activityDepartment: user.departments[0]?.id || user.department,
        directManager: user.direct_manager_id,
        jobTitle: user.job_title,
        destinationBranch: user.primary_branch_id,
        assignedBranch: user.primary_branch_id,
        hasPercentageSalesContract: user.has_commission_contract,
    }
}

export const toUpdateUserRequest = (
    values: NewUserFormValues
): UpdateUserRequest => ({
    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    email: values.addressEmail.trim() || values.contactEmail.trim(),
    national_id: values.nationalId.trim(),
    job_title: values.jobTitle.trim(),
    user_type: values.userType.trim(),
    primary_branch_id:
        values.assignedBranch?.trim() || values.destinationBranch?.trim() || '',
    direct_manager_id: values.directManager.trim(),
    is_active: values.initialAccountStatus === 'active',
})
