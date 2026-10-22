import type { UpdateUserRequest, User } from '@/src/api/types/admin/user'
import type { StaffDocumentSlot } from '../../createNewUser/constants'
import {
    EDIT_USER_DEFAULT_VALUES,
    type NewUserFormValues,
} from '../../createNewUser/schema'
import type { UploadedDocument } from '../../createNewUser/provider/NewUserProvider'
import { DOCUMENT_SLOT_OPTIONS } from '../../createNewUser/constants'

const splitName = (fullName?: string) => {
    const parts = fullName?.trim().split(/\s+/).filter(Boolean) ?? []
    return {
        first: parts[0] ?? '',
        last: parts.slice(1).join(' '),
    }
}

export const toUserFormValues = (user: User): NewUserFormValues => {
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
        contact1FirstName: firstKin.first,
        contact1LastName: firstKin.last,
        contact1Mobile: user.next_of_kin[0]?.phone ?? '',
        contact1Relation: user.next_of_kin[0]?.relation ?? '',
        contact2FirstName: secondKin.first,
        contact2LastName: secondKin.last,
        contact2Mobile: user.next_of_kin[1]?.phone ?? '',
        contact2Relation: user.next_of_kin[1]?.relation ?? '',
        bankName: bank?.bank_name ?? '',
        accountNumber: bank?.account_no ?? '',
        cardNumber: bank?.card_no ?? '',
        shebaNumber: bank?.iban ?? '',
        username: user.username,
        initialPassword: '',
        userType: user.user_type === 'SUPERADMIN' ? 'SUPERADMIN' : 'STAFF',
        userRole: user.roles[0] ?? '',
        initialAccountStatus: user.is_active ? 'active' : user.status,
        accountCreationDate: user.created_at,
        activityDepartment: user.departments[0]?.id || user.department,
        directManager: user.direct_manager_id,
        jobTitle: user.job_title,
        destinationBranch: user.primary_branch_id,
        assignedBranch: user.primary_branch_id,
        hasPercentageSalesContract: user.has_commission_contract,
        commissionPercent:
            user.commission_percent == null
                ? ''
                : String(user.commission_percent),
        documents: (user.documents ?? []).map((document) => ({
            slot: document.slot as StaffDocumentSlot,
            file: document.file,
        })),
    }
}

export const toUpdateUserRequest = (
    values: NewUserFormValues
): UpdateUserRequest => ({
    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    email: values.addressEmail.trim(),
    national_id: values.nationalId.trim(),
    job_title: values.jobTitle.trim(),
    user_type: values.userType.trim(),
    primary_branch_id:
        values.assignedBranch?.trim() || values.destinationBranch?.trim() || '',
    direct_manager_id: values.directManager.trim(),
    is_active: values.initialAccountStatus === 'active',
})

export const toInitialDocuments = (user: User): UploadedDocument[] =>
    (user.documents ?? []).map((document) => ({
        id: document.id,
        file: document.file,
        slot: document.slot,
        label:
            DOCUMENT_SLOT_OPTIONS.find((option) => option.value === document.slot)
                ?.label ?? document.slot,
        name: document.file.split('/').pop() ?? document.file,
        previewUrl: document.file,
        isImage: /\.(jpe?g|png|webp|gif)$/i.test(document.file),
    }))
