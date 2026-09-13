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
    LANDING_SECTIONS,
    type LandingSectionItem,
    type LandingSectionStatus,
} from '../constants'

type LandingContextValue = {
    sections: LandingSectionItem[]
    updateSection: (id: string, patch: Partial<LandingSectionItem>) => void
    moveSection: (index: number, direction: -1 | 1) => void
    toggleVisibility: (id: string) => void
}

const LandingContext = createContext<LandingContextValue | null>(null)

export function useLanding() {
    const context = useContext(LandingContext)

    if (!context) {
        throw new Error('useLanding must be used within LandingProvider')
    }

    return context
}

type LandingProviderProps = {
    children: ReactNode
}

type LandingSectionState = LandingSectionItem & {
    previousStatus?: Exclude<LandingSectionStatus, 'hidden'>
}

const LandingProvider = ({ children }: LandingProviderProps) => {
    const [sections, setSections] =
        useState<LandingSectionState[]>(LANDING_SECTIONS)

    const updateSection = useCallback(
        (id: string, patch: Partial<LandingSectionItem>) => {
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

    const toggleVisibility = useCallback((id: string) => {
        setSections((prev) =>
            prev.map((section) => {
                if (section.id !== id) return section

                if (section.status === 'hidden') {
                    return {
                        ...section,
                        status: section.previousStatus ?? 'published',
                        previousStatus: undefined,
                    }
                }

                return {
                    ...section,
                    previousStatus:
                        section.status === 'draft' ? 'draft' : 'published',
                    status: 'hidden',
                }
            })
        )
    }, [])

    const value = useMemo(
        () => ({
            sections,
            updateSection,
            moveSection,
            toggleVisibility,
        }),
        [sections, updateSection, moveSection, toggleVisibility]
    )

    return (
        <LandingContext.Provider value={value}>
            {children}
        </LandingContext.Provider>
    )
}

export default LandingProvider
