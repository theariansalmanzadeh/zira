import { z } from 'zod'
import type { Department } from '@/src/api/types/admin/department'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const createAndUpdateDepartmentSchema = z.object({
    name: requiredString('نام دپارتمان الزامی است'),
    code: z.string(),
    description: z.string(),
    isActive: z.boolean(),
})

export type CreateAndUpdateDepartmentValues = z.infer<
    typeof createAndUpdateDepartmentSchema
>

export const DEPARTMENT_FORM_DEFAULTS: CreateAndUpdateDepartmentValues = {
    name: '',
    code: 'DP-5318_92',
    description: '',
    isActive: true,
}

export const mapDepartmentToFormValues = (
    department: Department
): CreateAndUpdateDepartmentValues => ({
    ...DEPARTMENT_FORM_DEFAULTS,
    name: department.name,
    code: department.code,
    description: department.description ?? '',
    isActive: department.is_active,
})
