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
    ABOUT_US_SECTIONS,
    type AboutSectionItem,
} from '../constants'

type AboutUsContextValue = {
    sections: AboutSectionItem[]
    updateSection: (id: string, patch: Partial<AboutSectionItem>) => void
    moveSection: (index: number, direction: -1 | 1) => void
    removeSection: (id: string) => void
}

const AboutUsContext = createContext<AboutUsContextValue | null>(null)

export function useAboutUs() {
    const context = useContext(AboutUsContext)

    if (!context) {
        throw new Error('useAboutUs must be used within AboutUsProvider')
    }

    return context
}

type AboutUsProviderProps = {
    children: ReactNode
}

const AboutUsProvider = ({ children }: AboutUsProviderProps) => {
    const [sections, setSections] =
        useState<AboutSectionItem[]>(ABOUT_US_SECTIONS)

    const updateSection = useCallback(
        (id: string, patch: Partial<AboutSectionItem>) => {
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
        <AboutUsContext.Provider value={value}>
            {children}
        </AboutUsContext.Provider>
    )
}

export default AboutUsProvider
