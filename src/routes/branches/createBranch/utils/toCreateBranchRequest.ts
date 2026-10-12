import type {
    CreateBranchRequest,
    WorkingHours,
} from '@/src/api/types/admin/organization'
import type {
    BranchPermissions,
    GeneralBranchData,
    WorkDay,
} from '../provider/CreateBranchProvider'

export type CreateBranchFormState = {
    generalData: GeneralBranchData
    workDays: WorkDay[]
    permissions: BranchPermissions
}

const optionalText = (value?: string) => {
    const trimmed = value?.trim()
    return trimmed ? trimmed : undefined
}

const toWorkingHours = (workDays: WorkDay[]): WorkingHours =>
    workDays.reduce<WorkingHours>((hours, day) => {
        hours[day.id] = {
            enabled: day.enabled,
            start: day.start,
            end: day.end,
        }
        return hours
    }, {})

export const toCreateBranchRequest = ({
    generalData,
    workDays,
    permissions,
}: CreateBranchFormState): CreateBranchRequest => {
    const plaque = optionalText(generalData.plaque)
    const unit = optionalText(generalData.unit)
    const addressDetails = [
        plaque ? `پلاک ${plaque}` : '',
        unit ? `واحد ${unit}` : '',
    ]
        .filter(Boolean)
        .join('، ')
    const postalAddress = optionalText(generalData.postalAddress)
    const fullAddress = [postalAddress, addressDetails]
        .filter(Boolean)
        .join(' - ')

    return {
        code: generalData.branchCode.trim(),
        name: generalData.branchName.trim(),
        province: optionalText(generalData.province),
        city: optionalText(generalData.city),
        full_address: fullAddress || undefined,
        address_details: addressDetails || undefined,
        postal_code: optionalText(generalData.postalCode),
        phone: optionalText(generalData.landlinePhone),
        latitude: generalData.latitude ?? null,
        longitude: generalData.longitude ?? null,
        manager_id: generalData.branchManager || null,
        activity_start_date: generalData.activityStartDate
            ? generalData.activityStartDate.toISOString().slice(0, 10)
            : null,
        working_hours: toWorkingHours(workDays),
        permits: {
            allow_credit_sale: permissions.allow_credit_sale,
            allow_cheque_sale: permissions.allow_cheque_sale,
            allow_consignment_sale: permissions.allow_consignment_sale,
            allow_scrap_entry: permissions.allow_scrap_entry,
        },
    }
}
