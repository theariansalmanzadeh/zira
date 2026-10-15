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
import { useCreateBranch } from '@/src/routes/branches/hooks/organization'
import type { Branch } from '@/src/api/types/admin/organization'
import { toCreateBranchRequest } from '../utils/toCreateBranchRequest'

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

export type BranchPermissions = {
    allow_credit_sale: boolean
    allow_cheque_sale: boolean
    allow_consignment_sale: boolean
    allow_scrap_entry: boolean
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

export const INITIAL_PERMISSIONS: BranchPermissions = {
    allow_credit_sale: true,
    allow_cheque_sale: false,
    allow_consignment_sale: true,
    allow_scrap_entry: true,
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
    const [activeStep, setActiveStep] = useState<number>(1)
    const [generalData, setGeneralData] = useState<GeneralBranchData>(INITIAL_GENERAL_DATA)
    const [workDays, setWorkDays] = useState<WorkDay[]>(INITIAL_WORK_DAYS)
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

    const togglePermission = useCallback((key: keyof BranchPermissions, enabled: boolean) => {
        setPermissions((prev) => ({ ...prev, [key]: enabled }))
    }, [])

    const submitBranch = useCallback(
        (onSuccess?: (branch: Branch) => void) => {
            createBranchMutation(
                toCreateBranchRequest({ generalData, workDays, permissions }),
                { onSuccess }
            )
        },
        [workDays, generalData, permissions, createBranchMutation]
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
