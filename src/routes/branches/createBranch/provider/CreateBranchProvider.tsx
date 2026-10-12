'use client'

import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type Dispatch,
    type SetStateAction,
} from 'react'
import { useRouter } from 'next/navigation'
import { useCreateBranch } from '@/src/routes/branches/hooks/organization'
import type {
    Branch,
    BranchPermit,
    CreateBranchRequest,
} from '@/src/api/types/admin/organization'

export type GeneralBranchData = {
    branchName: string
    branchCode: string
    branchManager?: string
    activityStartDate?: Date
    province?: string
    city?: string
    postalAddress: string
    plaque: string
    unit: string
    postalCode: string
    landlinePhone: string
    latitude?: number | null
    longitude?: number | null
}

export type WorkDay = {
    id: string
    label: string
    enabled: boolean
    start: string
    end: string
}

export type BranchEmployeeItem = {
    id: string
    name: string
    role?: string
    workHours?: string
    status?: string
}

export type BranchPermissions = {
    allow_credit_sale: boolean
    allow_cheque_sale: boolean
    allow_consignment_sale: boolean
    allow_scrap_entry: boolean
    allow_repricing: boolean
}

export const INITIAL_GENERAL_DATA: GeneralBranchData = {
    branchName: '',
    branchCode: 'BR-5318_92',
    branchManager: undefined,
    activityStartDate: undefined,
    province: undefined,
    city: undefined,
    postalAddress: '',
    plaque: '',
    unit: '',
    postalCode: '',
    landlinePhone: '',
    latitude: null,
    longitude: null,
}

export const INITIAL_WORK_DAYS: WorkDay[] = [
    { id: 'saturday', label: 'شنبه', enabled: true, start: '09:00', end: '18:00' },
    { id: 'sunday', label: 'یکشنبه', enabled: true, start: '09:00', end: '18:00' },
    { id: 'monday', label: 'دوشنبه', enabled: true, start: '09:00', end: '18:00' },
    { id: 'tuesday', label: 'سه‌شنبه', enabled: true, start: '09:00', end: '18:00' },
    { id: 'wednesday', label: 'چهارشنبه', enabled: true, start: '09:00', end: '18:00' },
    { id: 'thursday', label: 'پنجشنبه', enabled: false, start: '09:00', end: '14:00' },
    { id: 'friday', label: 'جمعه', enabled: false, start: '09:00', end: '14:00' },
]

export const INITIAL_EMPLOYEES: BranchEmployeeItem[] = [
    {
        id: 'emp-1',
        name: 'علی محمدی',
        role: 'manager',
        workHours: 'full_time',
        status: 'فعال',
    },
]

export const INITIAL_PERMISSIONS: BranchPermissions = {
    allow_credit_sale: true,
    allow_cheque_sale: false,
    allow_consignment_sale: true,
    allow_scrap_entry: true,
    allow_repricing: false,
}

type CreateBranchContextValue = {
    activeStep: number
    setActiveStep: Dispatch<SetStateAction<number>>
    generalData: GeneralBranchData
    setGeneralData: Dispatch<SetStateAction<GeneralBranchData>>
    updateGeneralData: (patch: Partial<GeneralBranchData>) => void
    workDays: WorkDay[]
    setWorkDays: Dispatch<SetStateAction<WorkDay[]>>
    updateWorkDay: (id: string, patch: Partial<WorkDay>) => void
    employees: BranchEmployeeItem[]
    setEmployees: Dispatch<SetStateAction<BranchEmployeeItem[]>>
    addEmployees: (newEmployees: BranchEmployeeItem[]) => void
    removeEmployee: (id: string) => void
    updateEmployee: (id: string, patch: Partial<BranchEmployeeItem>) => void
    permissions: BranchPermissions
    setPermissions: Dispatch<SetStateAction<BranchPermissions>>
    togglePermission: (key: keyof BranchPermissions, enabled: boolean) => void
    submitBranch: (onSuccess?: (branch: Branch) => void) => void
    isPending: boolean
}

const CreateBranchContext = createContext<CreateBranchContextValue | null>(null)

export function useCreateBranchContext() {
    const context = useContext(CreateBranchContext)

    if (!context) {
        throw new Error('useCreateBranchContext must be used within CreateBranchProvider')
    }

    return context
}

type CreateBranchProviderProps = {
    children: React.ReactNode
}

const CreateBranchProvider = ({ children }: CreateBranchProviderProps) => {
    const router = useRouter()
    const [activeStep, setActiveStep] = useState<number>(1)
    const [generalData, setGeneralData] = useState<GeneralBranchData>(INITIAL_GENERAL_DATA)
    const [workDays, setWorkDays] = useState<WorkDay[]>(INITIAL_WORK_DAYS)
    const [employees, setEmployees] = useState<BranchEmployeeItem[]>(INITIAL_EMPLOYEES)
    const [permissions, setPermissions] = useState<BranchPermissions>(INITIAL_PERMISSIONS)

    const { mutate: createBranchMutation, isPending } = useCreateBranch()

    const updateGeneralData = useCallback((patch: Partial<GeneralBranchData>) => {
        setGeneralData((prev) => ({ ...prev, ...patch }))
    }, [])

    const updateWorkDay = useCallback((id: string, patch: Partial<WorkDay>) => {
        setWorkDays((days) =>
            days.map((day) => (day.id === id ? { ...day, ...patch } : day))
        )
    }, [])

    const addEmployees = useCallback((newEmployees: BranchEmployeeItem[]) => {
        setEmployees((prev) => {
            const existingIds = new Set(prev.map((e) => e.id))
            const toAdd = newEmployees.filter((e) => !existingIds.has(e.id))
            return [...prev, ...toAdd]
        })
    }, [])

    const removeEmployee = useCallback((id: string) => {
        setEmployees((prev) => prev.filter((e) => e.id !== id))
    }, [])

    const updateEmployee = useCallback((id: string, patch: Partial<BranchEmployeeItem>) => {
        setEmployees((prev) =>
            prev.map((e) => (e.id === id ? { ...e, ...patch } : e))
        )
    }, [])

    const togglePermission = useCallback((key: keyof BranchPermissions, enabled: boolean) => {
        setPermissions((prev) => ({ ...prev, [key]: enabled }))
    }, [])

    const submitBranch = useCallback(
        (onSuccess?: (branch: Branch) => void) => {
            const working_hours = workDays.reduce<
                Record<string, { enabled: boolean; start: string; end: string }>
            >((acc, day) => {
                acc[day.id] = {
                    enabled: day.enabled,
                    start: day.start,
                    end: day.end,
                }
                return acc
            }, {})

            const addressDetails = [
                generalData.plaque ? `پلاک ${generalData.plaque}` : '',
                generalData.unit ? `واحد ${generalData.unit}` : '',
            ]
                .filter(Boolean)
                .join('، ')

            const fullAddress = [generalData.postalAddress, addressDetails]
                .filter(Boolean)
                .join(' - ')

            const permits: BranchPermit = {
                allow_credit_sale: permissions.allow_credit_sale,
                allow_cheque_sale: permissions.allow_cheque_sale,
                allow_consignment_sale: permissions.allow_consignment_sale,
                allow_scrap_entry: permissions.allow_scrap_entry,
                allow_repricing: permissions.allow_repricing,
            }

            const payload: CreateBranchRequest = {
                code: generalData.branchCode || 'BR-5318_92',
                name: generalData.branchName || 'شعبه جدید',
                province: generalData.province,
                city: generalData.city,
                full_address: fullAddress || generalData.postalAddress || undefined,
                address_details: addressDetails || undefined,
                postal_code: generalData.postalCode || undefined,
                phone: generalData.landlinePhone || undefined,
                manager_id: generalData.branchManager || null,
                activity_start_date: generalData.activityStartDate
                    ? generalData.activityStartDate.toISOString().split('T')[0]
                    : null,
                working_hours,
                permits,
            }

            createBranchMutation(payload, {
                onSuccess: (data) => {
                    onSuccess?.(data)
                    router.push('/admin/branches?sub=list')
                },
            })
        },
        [workDays, generalData, permissions, createBranchMutation, router]
    )

    const value = useMemo<CreateBranchContextValue>(
        () => ({
            activeStep,
            setActiveStep,
            generalData,
            setGeneralData,
            updateGeneralData,
            workDays,
            setWorkDays,
            updateWorkDay,
            employees,
            setEmployees,
            addEmployees,
            removeEmployee,
            updateEmployee,
            permissions,
            setPermissions,
            togglePermission,
            submitBranch,
            isPending,
        }),
        [
            activeStep,
            generalData,
            updateGeneralData,
            workDays,
            updateWorkDay,
            employees,
            addEmployees,
            removeEmployee,
            updateEmployee,
            permissions,
            togglePermission,
            submitBranch,
            isPending,
        ]
    )

    return (
        <CreateBranchContext.Provider value={value}>
            {children}
        </CreateBranchContext.Provider>
    )
}

export default CreateBranchProvider
