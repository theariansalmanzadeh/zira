'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@shared/components/Icons/Icon'
import { cn, getAdminSection, isPathActive } from '@shared/libs/utils'
import type { IconLabel } from '@shared/types/icon'
import { SIDEBAR_CONTENT, SUB_SIDEBAR_CONTENT } from './content'
import SubSidebar from './components/SubSidebar'
import MegaMenu from './components/MegaMenu'
import styles from './Sidebar.module.css'

type Drawer = 'main' | 'sub'

const DRAWER_KEY = 'zm.admin.navDrawer'

const readDrawer = (): Drawer => {
    try {
        return localStorage.getItem(DRAWER_KEY) === 'main' ? 'main' : 'sub'
    } catch {
        return 'sub'
    }
}

const Sidebar = () => {
    const pathname = usePathname()
    const section = getAdminSection(pathname)
    const subSidebarContent = SUB_SIDEBAR_CONTENT[section]
    const [drawer, setDrawerState] = useState<Drawer>('sub')
    const [megaOpen, setMegaOpen] = useState(false)

    useEffect(() => {
        setDrawerState(readDrawer())
    }, [])

    const setDrawer = (next: Drawer) => {
        setDrawerState(next)
        try {
            localStorage.setItem(DRAWER_KEY, next)
        } catch {
            /* ignore */
        }
    }

    const isMain = drawer === 'main'
    const activeMeta =
        SIDEBAR_CONTENT.find((item) => getAdminSection(item.link) === section) ??
        null

    const headerIcon =
        subSidebarContent?.headerIcon ??
        activeMeta?.icon ??
        ('dashboard400Linear' as IconLabel)
    const header = subSidebarContent?.header ?? activeMeta?.faLabel ?? 'پنل'
    const subheader =
        subSidebarContent?.subheader ?? activeMeta?.breadcrumb ?? ''

    const onRailNavigate = (itemLink: string) => {
        const nextSection = getAdminSection(itemLink)
        if (isMain && SUB_SIDEBAR_CONTENT[nextSection]) {
            setDrawer('sub')
        }
    }

    return (
        <>
            <aside
                className={cn(
                    styles.side,
                    isMain && styles.sideMain,
                    'hidden! lg:flex!'
                )}
                aria-label='منوی پنل'
            >
                <div className={styles.rail}>
                    <div className={styles.railHead}>
                        <span className={styles.logoTile} aria-hidden>
                            <Icon
                                label='logoMark'
                                size={26}
                                className='!size-[26px] text-white'
                                fill='currentColor'
                            />
                        </span>
                        <span className={styles.railTitle}>منوی اصلی</span>
                    </div>

                    <button
                        type='button'
                        className={styles.drawerBtn}
                        onClick={() => setDrawer(isMain ? 'sub' : 'main')}
                        aria-label={
                            isMain ? 'باز کردن زیرمنو' : 'باز کردن منوی اصلی'
                        }
                        aria-expanded={isMain}
                    >
                        <span className={styles.railIcon}>
                            <Icon
                                label={
                                    isMain
                                        ? 'chevronRight400Linear'
                                        : 'chevronLeft400Linear'
                                }
                                size={19}
                                className='!size-[19px]'
                                fill='currentColor'
                            />
                        </span>
                        <span className={styles.railText}>
                            <span className={styles.drawerLabel}>
                                باز کردن زیرمنو
                            </span>
                        </span>
                    </button>

                    <div className={styles.railList}>
                        {SIDEBAR_CONTENT.map((item) => {
                            const pathKey = getAdminSection(item.link)
                            const faLabel =
                                SUB_SIDEBAR_CONTENT[pathKey]?.faLabel ??
                                item.faLabel
                            const subLabel =
                                SUB_SIDEBAR_CONTENT[pathKey]?.subheader ??
                                item.breadcrumb
                            const on = isPathActive(item.link, section)

                            return (
                                <Link
                                    key={`${item.link}-${item.icon}`}
                                    href={item.link}
                                    className={cn(
                                        styles.railBtn,
                                        on && styles.railOn
                                    )}
                                    aria-label={faLabel}
                                    aria-current={on ? 'page' : undefined}
                                    title={isMain ? undefined : faLabel}
                                    onClick={() => onRailNavigate(item.link)}
                                >
                                    <span className={styles.railIcon}>
                                        <Icon
                                            label={item.icon as IconLabel}
                                            size={21}
                                            className='!size-[21px]'
                                            fill='currentColor'
                                        />
                                    </span>
                                    <span className={styles.railText}>
                                        <span className={styles.railName}>
                                            {faLabel}
                                        </span>
                                        <span className={styles.railSub}>
                                            {subLabel}
                                        </span>
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.panel} aria-hidden={isMain}>
                    <div className={styles.panelCard}>
                        <button
                            type='button'
                            className={styles.moduleHead}
                            onClick={() => setMegaOpen(true)}
                            aria-label='همه‌ی ماژول‌ها'
                            tabIndex={isMain ? -1 : 0}
                        >
                            <span className={styles.moduleTile}>
                                <Icon
                                    label={headerIcon}
                                    size={22}
                                    className='!size-[22px] text-primary'
                                    fill='currentColor'
                                />
                            </span>
                            <span className={styles.moduleText}>
                                <span className={styles.moduleName}>
                                    {header}
                                </span>
                                <span className={styles.moduleSub}>
                                    {subheader}
                                </span>
                            </span>
                            <Icon
                                label='menuTrigger400Linear'
                                size={17}
                                className={cn(
                                    styles.moduleGrid,
                                    '!size-[17px]'
                                )}
                                fill='currentColor'
                            />
                        </button>

                        <nav
                            className={styles.panelNav}
                            aria-label='صفحه‌های ماژول'
                        >
                            {subSidebarContent ? (
                                <SubSidebar
                                    icon={subSidebarContent.headerIcon}
                                    header={subSidebarContent.header}
                                    subheader={subSidebarContent.subheader}
                                    itemsList={subSidebarContent.itemsList}
                                    hideHeading
                                    tabIndexDisabled={isMain}
                                />
                            ) : null}
                        </nav>
                    </div>
                </div>
            </aside>

            <MegaMenu
                activeSection={section}
                open={megaOpen}
                onClose={() => setMegaOpen(false)}
            />
        </>
    )
}

export default Sidebar
