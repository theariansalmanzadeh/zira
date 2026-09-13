"use client"

import React, { createContext, useContext, useMemo, useState } from 'react'

type CreateBranchContextValue = {
    activeStep: number
    setActiveStep: (step: number) => void
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
    const [activeStep, setActiveStep] = useState(1)

    const value = useMemo(
        () => ({ activeStep, setActiveStep }),
        [activeStep]
    )

    return (
        <CreateBranchContext.Provider value={value}>
            {children}
        </CreateBranchContext.Provider>
    )
}

export default CreateBranchProvider
