import * as z from 'zod'
import { POS_DEVICES_DUMMY } from '@/src/shared/components/modals/components/posBranchDetails/constants'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const addAndEditPosDeviceSchema = z.object({
    index: requiredString('ردیف الزامی است'),
    name: requiredString('نام دستگاه الزامی است'),
    model: requiredString('مدل دستگاه الزامی است'),
    bank: requiredString('بانک متصل الزامی است'),
    bankAccount: requiredString('حساب بانکی متصل الزامی است'),
    terminalNumber: requiredString('شماره پایانه الزامی است'),
    terminalPassword: requiredString('رمز پایانه الزامی است'),
    cashRegister: requiredString('صندوق متصل الزامی است'),
})

export type AddAndEditPosDeviceFormValues = z.infer<
    typeof addAndEditPosDeviceSchema
>

export const ADD_AND_EDIT_POS_DEVICE_DEFAULT_VALUES: AddAndEditPosDeviceFormValues =
    {
        index: '',
        name: '',
        model: '',
        bank: '',
        bankAccount: '',
        terminalNumber: '',
        terminalPassword: '',
        cashRegister: '',
    }

export const getAddAndEditPosDeviceDefaultValues = (
    id?: string | null
): AddAndEditPosDeviceFormValues => {
    if (!id) return { ...ADD_AND_EDIT_POS_DEVICE_DEFAULT_VALUES }

    const device = POS_DEVICES_DUMMY.find((item) => item.id === id)
    if (!device) return { ...ADD_AND_EDIT_POS_DEVICE_DEFAULT_VALUES }

    return {
        index: String(device.index),
        name: device.name,
        model: device.model,
        bank: device.bank,
        bankAccount: device.bankAccount,
        terminalNumber: device.terminalNumber,
        terminalPassword: device.terminalPassword,
        cashRegister: device.cashRegister,
    }
}
