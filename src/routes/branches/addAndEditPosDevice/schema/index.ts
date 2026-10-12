import * as z from 'zod'
import type { PosDevice } from '@/src/api/types/admin/organization'

const optionalString = z.string().trim()

export const addAndEditPosDeviceSchema = z.object({
    title: z.string().trim().min(1, 'نام دستگاه الزامی است'),
    terminal_no: optionalString,
    bank_account_id: optionalString,
    is_active: z.boolean(),
})

export type AddAndEditPosDeviceFormValues = z.infer<
    typeof addAndEditPosDeviceSchema
>

export const ADD_AND_EDIT_POS_DEVICE_DEFAULT_VALUES: AddAndEditPosDeviceFormValues =
    {
        title: '',
        terminal_no: '',
        bank_account_id: '',
        is_active: true,
    }

export const getAddAndEditPosDeviceDefaultValues = (
    device?: PosDevice | null
): AddAndEditPosDeviceFormValues => {
    if (!device) return { ...ADD_AND_EDIT_POS_DEVICE_DEFAULT_VALUES }

    return {
        title: device.title ?? '',
        terminal_no: device.terminal_no ?? '',
        bank_account_id: device.bank_account_id ?? '',
        is_active: device.is_active,
    }
}
