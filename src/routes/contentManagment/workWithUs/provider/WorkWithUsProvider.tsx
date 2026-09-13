'use client'

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import {
    WORK_WITH_US_SECTIONS,
    type WorkWithUsSectionItem,
} from '../constants'

type WorkWithUsContextValue = {
    sections: WorkWithUsSectionItem[]
    updateSection: (id: string, patch: Partial<WorkWithUsSectionItem>) => void
    moveSection: (index: number, direction: -1 | 1) => void
    removeSection: (id: string) => void
}

const WorkWithUsContext = createContext<WorkWithUsContextValue | null>(null)

export function useWorkWithUs() {
    const context = useContext(WorkWithUsContext)

    if (!context) {
        throw new Error('useWorkWithUs must be used within WorkWithUsProvider')
    }

    return context
}

type WorkWithUsProviderProps = {
    children: ReactNode
}

const WorkWithUsProvider = ({ children }: WorkWithUsProviderProps) => {
    const [sections, setSections] =
        useState<WorkWithUsSectionItem[]>(WORK_WITH_US_SECTIONS)

    const updateSection = useCallback(
        (id: string, patch: Partial<WorkWithUsSectionItem>) => {
            setSections((prev) =>
                prev.map((section) =>
                    section.id === id ? { ...section, ...patch } : section
                )
            )
        },
        []
    )

    const moveSection = useCallback((index: number, direction: -1 | 1) => {
        setSections((prev) => {
            const nextIndex = index + direction
            if (nextIndex < 0 || nextIndex >= prev.length) return prev

            const next = [...prev]
            const [item] = next.splice(index, 1)
            next.splice(nextIndex, 0, item)
            return next
        })
    }, [])

    const removeSection = useCallback((id: string) => {
        setSections((prev) => prev.filter((section) => section.id !== id))
    }, [])

    const value = useMemo(
        () => ({
            sections,
            updateSection,
            moveSection,
            removeSection,
        }),
        [sections, updateSection, moveSection, removeSection]
    )

    return (
        <WorkWithUsContext.Provider value={value}>
            {children}
        </WorkWithUsContext.Provider>
    )
}

export default WorkWithUsProvider
