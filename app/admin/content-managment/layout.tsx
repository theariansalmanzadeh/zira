'use client'

import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import {
    getContentSectionKeyFromPath,
    sectionToHeading,
    type HeadingButton,
} from '@/src/routes/contentManagment/constants'
import { OPEN_ADD_FAQ_EVENT } from '@/src/routes/contentManagment/faq/constants'

const ContentManagmentLayoutContent = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { push } = useRouter()
    const isContentRoot =
        pathname === '/admin/content-managment' ||
        pathname === '/admin/content-managment/'
    const sectionKey = getContentSectionKeyFromPath(pathname, searchParams)
    const heading = sectionKey ? sectionToHeading[sectionKey] : null
    const hidePageHeading = sectionKey === 'liecense-new'

    useEffect(() => {
        if (!isContentRoot) return

        const sub = searchParams.get('sub') || 'dashboard'
        if (searchParams.get('sub') !== sub) {
            push(`?sub=${sub}`)
        }
    }, [isContentRoot, pathname, push, searchParams])

    const handleHeadingAction = (button: HeadingButton) => {
        if (button.action) {
            button.action()
            return
        }

        if (button.actionKey === 'add-faq') {
            window.dispatchEvent(new Event(OPEN_ADD_FAQ_EVENT))
        }
    }

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            {heading && !hidePageHeading && (
                <HeadingWithActions>
                    <HeadingWithActions.Title>{heading.title}</HeadingWithActions.Title>
                    {heading.subtitle && (
                        <HeadingWithActions.SubTitle>
                            {heading.subtitle}
                        </HeadingWithActions.SubTitle>
                    )}

                    {heading.buttons && heading.buttons.length > 0 && (
                        <HeadingWithActions.ButtonWrapper>
                            {heading.buttons.map((button, index) => {
                                const content = (
                                    <>
                                        {button.icon && (
                                            <Icon
                                                label={button.icon}
                                                className={
                                                    button.variant === 'primary'
                                                        ? 'size-5! text-on-primary'
                                                        : button.actionKey ===
                                                            'export-excel'
                                                          ? 'size-5! text-success'
                                                          : 'size-5!'
                                                }
                                            />
                                        )}
                                        <span
                                            className={
                                                button.variant === 'primary'
                                                    ? 'text-label-sm text-on-primary'
                                                    : 'text-label-sm'
                                            }
                                        >
                                            {button.label}
                                        </span>
                                    </>
                                )

                                if (button.href) {
                                    return (
                                        <Button
                                            key={`${button.label}-${index}`}
                                            type="button"
                                            variant={button.variant}
                                            asChild
                                        >
                                            <Link href={button.href}>{content}</Link>
                                        </Button>
                                    )
                                }

                                return (
                                    <Button
                                        key={`${button.label}-${index}`}
                                        type="button"
                                        variant={button.variant}
                                        onClick={() => handleHeadingAction(button)}
                                    >
                                        {content}
                                    </Button>
                                )
                            })}
                        </HeadingWithActions.ButtonWrapper>
                    )}
                </HeadingWithActions>
            )}
            {children}
        </div>
    )
}

const ContentManagmentLayout = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={null}>
        <ContentManagmentLayoutContent>{children}</ContentManagmentLayoutContent>
    </Suspense>
)

export default ContentManagmentLayout
