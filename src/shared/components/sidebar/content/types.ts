import { IconLabel } from '@/src/shared/types/icon'

export type SubSidebarLink = { label: string; href: string }
export type SubSidebarSection = { title: string; links: readonly SubSidebarLink[] }

export type SubSidebarContent = {
    headerIcon: IconLabel
    header: string
    faLabel: string
    subheader: string
    itemsList: readonly SubSidebarSection[]
}
