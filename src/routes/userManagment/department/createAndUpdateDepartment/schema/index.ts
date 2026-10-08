import { z } from 'zod'
import type { Department } from '@/src/api/types/admin/department'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const responseHoursSchema = z.object({
    start: requiredString('ساعت شروع الزامی است'),
    end: requiredString('ساعت پایان الزامی است'),
})

export const createAndUpdateDepartmentSchema = z.object({
    name: requiredString('نام دپارتمان الزامی است'),
    code: z.string(),
    relatedSection: requiredString('بخش مربوطه الزامی است'),
    departmentManager: z.string(),
    slaResponse: requiredString('پاسخ SLA الزامی است'),
    responseHours: responseHoursSchema,
    description: z.string(),
    isActive: z.boolean(),
})

export type CreateAndUpdateDepartmentValues = z.infer<
    typeof createAndUpdateDepartmentSchema
>

export const DEPARTMENT_FORM_DEFAULTS: CreateAndUpdateDepartmentValues = {
    name: '',
    code: 'DP-5318_92',
    relatedSection: '',
    departmentManager: '',
    slaResponse: '',
    responseHours: { start: '09:00', end: '18:00' },
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
