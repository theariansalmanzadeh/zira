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
    usePublishSection,
    useReorderSections,
    useStaticPageDetail,
    useUpdateSection,
} from '@/src/routes/contentManagment/hooks/staticPage'
import type { EditSectionStatus } from '../components/EditSectionView'
import type { WorkWithUsSectionItem } from '../constants'

const PAGE = 'COOPERATION'

const toSectionStatus = (status: ContentStatusEnum): EditSectionStatus => {
    if (status === 'PUBLISHED') return 'published'
    if (status === 'HIDDEN' || status === 'ARCHIVED') return 'hidden'
    return 'draft'
}

const toSectionItem = (
    section: PageSectionOut,
    pageDisplay: string
): WorkWithUsSectionItem => ({
    id: section.id,
    title: section.title,
    body: section.body,
    page_display: pageDisplay,
    visible: section.is_visible,
    status: toSectionStatus(section.status),
})

type WorkWithUsContextValue = {
    sections: WorkWithUsSectionItem[]
    addSection: () => void
    updateSection: (id: string, patch: Partial<WorkWithUsSectionItem>) => void
    saveAndPublish: (id: string) => Promise<PageSectionOut>
    setSectionVisible: (id: string, visible: boolean) => void
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
    const [sections, setSections] = useState<WorkWithUsSectionItem[]>([])
    const { data } = useStaticPageDetail(PAGE)
    const { mutateAsync: createSection } = useCreateSection()
    const {
        mutate: updateSectionMutation,
        mutateAsync: updateSectionAsync,
    } = useUpdateSection()
    const { mutateAsync: publishSection } = usePublishSection()
    const { mutate: archiveSection } = useArchiveSection()
    const { mutate: reorderSections } = useReorderSections()

    useEffect(() => {
        if (!data) return

        setSections((prev) => {
            const drafts = prev.filter((section) => section.isNew)
            return [
                ...data.sections.map((section) =>
                    toSectionItem(section, data.page_display)
                ),
                ...drafts,
            ]
        })
    }, [data])

    const addSection = useCallback(() => {
        setSections((prev) => [
            ...prev,
            {
                id: `draft-${Date.now()}`,
                title: '',
                body: '',
                page_display: data?.page_display ?? '',
                visible: true,
                status: 'draft',
                isNew: true,
            },
        ])
    }, [data?.page_display])

    const saveAndPublish = useCallback(
        async (id: string) => {
            const section = sections.find((item) => item.id === id)
            if (!section) {
                throw new Error('Section not found')
            }

            const pageDisplay =
                section.page_display ?? data?.page_display ?? ''
            const body = {
                title: section.title,
                body: section.body,
                is_visible: section.visible,
            }

            const saved = section.isNew
                ? await createSection({ page: PAGE, body })
                : await updateSectionAsync({
                      page: PAGE,
                      sectionId: id,
                      body,
                  })

            const published = await publishSection({
                page: PAGE,
                sectionId: saved.id,
            })

            setSections((prev) =>
                prev.map((item) =>
                    item.id === id || item.id === saved.id
                        ? toSectionItem(published, pageDisplay)
                        : item
                )
            )

            return published
        },
        [
            createSection,
            data?.page_display,
            publishSection,
            sections,
            updateSectionAsync,
        ]
    )

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

    const setSectionVisible = useCallback(
        (id: string, visible: boolean) => {
            const section = sections.find((item) => item.id === id)
            if (!section || section.isNew) {
                setSections((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, visible } : item
                    )
                )
                return
            }

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
        [sections, updateSectionMutation]
    )

    const moveSection = useCallback(
        (index: number, direction: -1 | 1) => {
            const nextIndex = index + direction
            if (nextIndex < 0 || nextIndex >= sections.length) return

            const next = [...sections]
            const [item] = next.splice(index, 1)
            next.splice(nextIndex, 0, item)
            setSections(next)
            if (next.some((section) => section.isNew)) return

            reorderSections({
                page: PAGE,
                body: { ids: next.map((section) => section.id) },
            })
        },
        [reorderSections, sections]
    )

    const removeSection = useCallback(
        (id: string) => {
            const section = sections.find((item) => item.id === id)
            if (!section) return

            if (section.isNew) {
                setSections((prev) => prev.filter((item) => item.id !== id))
                return
            }

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
        [archiveSection, sections]
    )

    const value = useMemo(
        () => ({
            sections,
            addSection,
            updateSection,
            saveAndPublish,
            setSectionVisible,
            moveSection,
            removeSection,
        }),
        [
            sections,
            addSection,
            updateSection,
            saveAndPublish,
            setSectionVisible,
            moveSection,
            removeSection,
        ]
    )

    return (
        <WorkWithUsContext.Provider value={value}>
            {children}
        </WorkWithUsContext.Provider>
    )
}

export default WorkWithUsProvider
