'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import {
    getCategoriesSectionKeyFromPath,
    sectionToHeading,
} from '@/src/routes/catalog/constants'

const CategoriesLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { back } = useRouter()
    const isCategoriesRoot =
        pathname === '/admin/catalog' || pathname === '/admin/catalog/'

    const sectionKey = isCategoriesRoot
        ? searchParams.get('sub') || 'dashboard'
        : getCategoriesSectionKeyFromPath(pathname)

    const heading = sectionToHeading[sectionKey]

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            {heading && (
                <HeadingWithActions>
                    {heading.hasBackButton && (
                        <HeadingWithActions.BackButton onClick={() => back()} />
                    )}
                    <HeadingWithActions.Title>{heading.title}</HeadingWithActions.Title>
                    <HeadingWithActions.SubTitle>{heading.subtitle}</HeadingWithActions.SubTitle>
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
                                                        ? 'size-4! text-on-primary'
                                                        : 'size-6!'
                                                }
                                            />
                                        )}
                                        <span
                                            className={
                                                button.variant === 'primary'
                                                    ? 'text-label-lg text-on-primary'
                                                    : undefined
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
                                            <Link href={button.href}>{content}</Link>
                                        </Button>
                                    )
                                }

                                return (
                                    <Button
                                        key={index}
                                        type={button.type ?? 'button'}
                                        form={button.form}
                                        variant={button.variant}
                                        className={button.form ? 'gap-1.5' : undefined}
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

const CategoriesLayout = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={null}>
        <CategoriesLayoutContent>{children}</CategoriesLayoutContent>
    </Suspense>
)

export default CategoriesLayout
