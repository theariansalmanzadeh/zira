'use client'

import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import {
    getEventsSectionKeyFromPath,
    sectionToHeading,
} from '@/src/routes/events/constants'

const EventsLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { back, push } = useRouter()
    const isEventsRoot =
        pathname === '/admin/events' || pathname === '/admin/events/'
    const sectionKey = getEventsSectionKeyFromPath(pathname, searchParams)
    const heading = sectionToHeading[sectionKey]

    useEffect(() => {
        if (!isEventsRoot) return

        const sub = searchParams.get('sub') || 'list'
        if (searchParams.get('sub') !== sub) {
            push(`?sub=${sub}`)
        }
    }, [isEventsRoot, pathname, push, searchParams])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            {heading && (
                <HeadingWithActions>
                    {heading.hasBackButton && (
                        <HeadingWithActions.BackButton
                            onClick={() => back()}
                        />
                    )}
                    <HeadingWithActions.Title>
                        {heading.title}
                    </HeadingWithActions.Title>
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
                                                className='size-6!'
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
                                            key={index}
                                            variant={button.variant}
                                            asChild
                                        >
                                            <Link href={button.href}>
                                                {content}
                                            </Link>
                                        </Button>
                                    )
                                }

                                return (
                                    <Button
                                        key={index}
                                        variant={button.variant}
                                        onClick={button.action}
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

const EventsLayout = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={null}>
        <EventsLayoutContent>{children}</EventsLayoutContent>
    </Suspense>
)

export default EventsLayout
