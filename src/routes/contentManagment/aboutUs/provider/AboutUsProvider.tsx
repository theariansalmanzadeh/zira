'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import type {
    ContentStatusEnum,
    PageSectionOut,
} from '@/src/api/types/admin/cms/staticPage'
import {
    useArchiveSection,
    useCreateSection,
    useReorderSections,
    useStaticPageDetail,
    useUpdateSection,
} from '@/src/routes/contentManagment/hooks/staticPage'
import type { EditSectionStatus } from '../components/EditSectionView'
import type { AboutSectionItem } from '../constants'

const PAGE = 'ABOUT'

const toSectionStatus = (status: ContentStatusEnum): EditSectionStatus => {
    if (status === 'PUBLISHED') return 'published'
    if (status === 'HIDDEN' || status === 'ARCHIVED') return 'hidden'
    return 'draft'
}

const toSectionItem = (
    section: PageSectionOut,
    pageDisplay: string
): AboutSectionItem => ({
    id: section.id,
    title: section.title,
    body: section.body,
    page_display: pageDisplay,
    visible: section.is_visible,
    status: toSectionStatus(section.status),
})

type AboutUsContextValue = {
    sections: AboutSectionItem[]
    addSection: () => void
    updateSection: (id: string, patch: Partial<AboutSectionItem>) => void
    setSectionVisible: (id: string, visible: boolean) => void
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
    const [sections, setSections] = useState<AboutSectionItem[]>([])
    const { data } = useStaticPageDetail(PAGE)
    const { mutate: createSection } = useCreateSection()
    const { mutate: updateSectionMutation } = useUpdateSection()
    const { mutate: archiveSection } = useArchiveSection()
    const { mutate: reorderSections } = useReorderSections()

    useEffect(() => {
        if (!data) return

        setSections(
            data.sections.map((section) =>
                toSectionItem(section, data.page_display)
            )
        )
    }, [data])

    const addSection = useCallback(() => {
        createSection(
            {
                page: PAGE,
                body: { title: '', body: '', is_visible: true },
            },
            {
                onSuccess: (section) => {
                    setSections((prev) => [
                        ...prev,
                        toSectionItem(section, data?.page_display ?? ''),
                    ])
                },
            }
        )
    }, [createSection, data?.page_display])

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

    const setSectionVisible = useCallback(
        (id: string, visible: boolean) => {
            updateSectionMutation(
                {
                    page: PAGE,
                    sectionId: id,
                    body: { is_visible: visible },
                },
                {
                    onSuccess: (section) => {
                        setSections((prev) =>
                            prev.map((item) =>
                                item.id === id
                                    ? {
                                          ...item,
                                          visible: section.is_visible,
                                          status: toSectionStatus(section.status),
                                      }
                                    : item
                            )
                        )
                    },
                }
            )
        },
        [updateSectionMutation]
    )

    const moveSection = useCallback(
        (index: number, direction: -1 | 1) => {
            const nextIndex = index + direction
            if (nextIndex < 0 || nextIndex >= sections.length) return

            const next = [...sections]
            const [item] = next.splice(index, 1)
            next.splice(nextIndex, 0, item)
            setSections(next)
            reorderSections({
                page: PAGE,
                body: { ids: next.map((section) => section.id) },
            })
        },
        [reorderSections, sections]
    )

    const removeSection = useCallback(
        (id: string) => {
            archiveSection(
                { page: PAGE, sectionId: id },
                {
                    onSuccess: () => {
                        setSections((prev) =>
                            prev.filter((section) => section.id !== id)
                        )
                    },
                }
            )
        },
        [archiveSection]
    )

    const value = useMemo(
        () => ({
            sections,
            addSection,
            updateSection,
            setSectionVisible,
            moveSection,
            removeSection,
        }),
        [
            sections,
            addSection,
            updateSection,
            setSectionVisible,
            moveSection,
            removeSection,
        ]
    )

    return (
        <AboutUsContext.Provider value={value}>
            {children}
        </AboutUsContext.Provider>
    )
}

export default AboutUsProvider
