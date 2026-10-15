import type {
    BranchDayHours,
    CreateBranchRequest,
    CreateBranchWorkingHours,
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

const text = (value?: string) => value?.trim() ?? ''

const WEEK_DAYS = [
    'saturday',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
] as const

const toDayHours = (day?: WorkDay): BranchDayHours => {
    if (!day?.enabled) return { is_closed: true }
    return { is_closed: false, open: day.start, close: day.end }
}

const toWorkingHours = (workDays: WorkDay[]): CreateBranchWorkingHours => {
    const byId = new Map(workDays.map((day) => [day.id, day]))
    return WEEK_DAYS.reduce((hours, dayId) => {
        hours[dayId] = toDayHours(byId.get(dayId))
        return hours
    }, {} as CreateBranchWorkingHours)
}

export const toCreateBranchRequest = ({
    generalData,
    workDays,
    permissions,
}: CreateBranchFormState): CreateBranchRequest => {
    const plaque = text(generalData.plaque)
    const unit = text(generalData.unit)
    const addressDetails = [
        plaque ? `پلاک ${plaque}` : '',
        unit ? `واحد ${unit}` : '',
    ]
        .filter(Boolean)
        .join('، ')
    const postalAddress = text(generalData.postalAddress)
    const fullAddress = [postalAddress, addressDetails]
        .filter(Boolean)
        .join(' - ')

    return {
        code: generalData.branchCode.trim(),
        name: generalData.branchName.trim(),
        province: text(generalData.province),
        county: '',
        city: text(generalData.city),
        full_address: fullAddress,
        address_details: addressDetails,
        postal_code: text(generalData.postalCode),
        phone: text(generalData.landlinePhone),
        latitude: generalData.latitude ?? 0,
        longitude: generalData.longitude ?? 0,
        manager_id: generalData.branchManager ?? '',
        activity_start_date: generalData.activityStartDate
            ? generalData.activityStartDate.toISOString().slice(0, 10)
            : '',
        working_hours: toWorkingHours(workDays),
        permits: {
            allow_credit_sale: permissions.allow_credit_sale,
            allow_cheque_sale: permissions.allow_cheque_sale,
            allow_consignment_sale: permissions.allow_consignment_sale,
            allow_scrap_entry: permissions.allow_scrap_entry,
        },
    }
}
