'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { SIDEBAR_CONTENT, SUB_SIDEBAR_CONTENT } from '../content'
import { getAdminSection } from '@shared/libs/utils'
import styles from '../Sidebar.module.css'
import { cn } from '@shared/libs/utils'

type MegaMenuProps = {
    activeSection: string
    open: boolean
    onClose: () => void
}

const MegaMenu = ({ activeSection, open, onClose }: MegaMenuProps) => {
    const [query, setQuery] = useState('')
    const [closing, setClosing] = useState(false)
    const [mounted, setMounted] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleClose = useCallback(() => {
        setClosing(true)
        window.setTimeout(() => {
            setClosing(false)
            onClose()
        }, 180)
    }, [onClose])

    useEffect(() => {
        if (!open) return
        setClosing(false)
        setQuery('')
        const id = requestAnimationFrame(() => inputRef.current?.focus())
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose()
        }
        document.addEventListener('keydown', onKey)
        return () => {
            cancelAnimationFrame(id)
            document.removeEventListener('keydown', onKey)
        }
    }, [open, handleClose])

    const modules = useMemo(
        () =>
            SIDEBAR_CONTENT.map((item) => {
                const section = getAdminSection(item.link)
                const sub = SUB_SIDEBAR_CONTENT[section]
                const links =
                    sub?.itemsList.flatMap((sec) =>
                        sec.links.map((link) => ({
                            label: link.label,
                            href: link.href,
                        }))
                    ) ?? []
                return {
                    key: item.link,
                    section,
                    name: sub?.header ?? item.faLabel,
                    sub: sub?.subheader ?? item.breadcrumb,
                    icon: sub?.headerIcon ?? item.icon,
                    href: item.link,
                    links,
                }
            }),
        []
    )

    const term = query.trim()
    const list = useMemo(() => {
        if (!term) return modules
        return modules
            .map((mod) => {
                const nameMatch = mod.name.includes(term)
                const filteredLinks = mod.links.filter((l) =>
                    l.label.includes(term)
                )
                if (nameMatch) return mod
                return { ...mod, links: filteredLinks }
            })
            .filter((mod) => mod.name.includes(term) || mod.links.length > 0)
    }, [modules, term])

    if (!mounted || (!open && !closing)) return null

    return createPortal(
        <div
            className={cn(
                styles.megaOverlay,
                closing && styles.megaOverlayClosing
            )}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) handleClose()
            }}
        >
            <div
                className={cn(styles.mega, closing && styles.megaClosing)}
                role='dialog'
                aria-modal='true'
                aria-label='همه‌ی ماژول‌ها'
            >
                <div className={styles.megaHead}>
                    <span className={styles.megaHeadIcon}>
                        <Icon
                            label='menuTrigger400Linear'
                            size={20}
                            className='!size-5 text-white'
                            fill='currentColor'
                        />
                    </span>
                    <div>
                        <h2 className={styles.megaTitle}>همه‌ی ماژول‌ها</h2>
                        <p className={styles.megaSub}>
                            ماژول یا صفحه‌ی مورد نظر را انتخاب کنید
                        </p>
                    </div>
                    <label className={styles.megaSearch}>
                        <Icon
                            label='search400Linear'
                            size={17}
                            className='!size-[17px]'
                            fill='currentColor'
                        />
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='جست‌وجوی ماژول یا صفحه'
                        />
                    </label>
                    <button
                        type='button'
                        className={styles.megaX}
                        onClick={handleClose}
                        aria-label='بستن'
                    >
                        <Icon
                            label='closeLg400Linear'
                            size={19}
                            className='!size-[19px]'
                            fill='currentColor'
                        />
                    </button>
                </div>

                <div className={styles.megaGrid}>
                    {list.map((mod) => (
                        <div
                            key={mod.key}
                            className={cn(
                                styles.megaCard,
                                mod.section === activeSection &&
                                    styles.megaCardOn
                            )}
                        >
                            <Link
                                href={mod.href}
                                className={styles.megaCardHead}
                                onClick={handleClose}
                            >
                                <span className={styles.megaIcon}>
                                    <Icon
                                        label={mod.icon}
                                        size={20}
                                        className='!size-5 text-primary'
                                        fill='currentColor'
                                    />
                                </span>
                                <span className={styles.megaCardName}>
                                    {mod.name}
                                </span>
                            </Link>
                            {mod.links.length > 0 ? (
                                <ul className={styles.megaItems}>
                                    {mod.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                onClick={handleClose}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    ))}
                    {list.length === 0 ? (
                        <div className={styles.megaEmpty}>موردی پیدا نشد.</div>
                    ) : null}
                </div>

                <div className={styles.megaFoot}>
                    برای بستن <kbd>Esc</kbd>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default MegaMenu
