import Link from 'next/link'
import { Icon } from '@shared/components/Icons/Icon'
import { Avatar, AvatarFallback } from '@shared/components/ui/Avatar'
import { Button } from '@shared/components/ui/button'
import type { ChatAttachment, ChatOperator } from '@shared/store/chat-store'
import { cn } from '@shared/libs/utils'
import { formatFaDateTime } from '@/src/shared/libs/formatter'

type QueryBlubbeProps = {
    textContent: string
    date: string
    operator: ChatOperator
    attachment?: ChatAttachment
    linkText?: string
    linkHref?: string
    onPin?: () => void
    className?: string
}

const QueryBlubbe = ({
    textContent,
    date,
    operator,
    attachment,
    linkText,
    linkHref = '#',
    onPin,
    className,
}: QueryBlubbeProps) => {
    return (
        <div
            className={cn(
                'flex w-min max-w-[712px] flex-col items-start gap-2',
                className
            )}
            dir="rtl"
        >
            <div className="flex w-full flex-col gap-3 rounded-card-lg bg-inverse-surface p-6">
                <p className="text-nowrap text-right text-label-md text-on-inverse-surface">
                    {textContent}
                </p>

                {linkText && (
                    <Link
                        href={linkHref}
                        className="w-fit text-label-md text-on-inverse-surface underline"
                    >
                        {linkText}
                    </Link>
                )}

                {attachment && (
                    <a
                        href={attachment.url}
                        className="flex w-fit flex-row items-center gap-2 rounded-container-md bg-inverse-surface-variant/20 px-3 py-2 text-label-sm text-on-inverse-surface"
                    >
                        <Icon
                            label="attachment400Linear"
                            className="size-4! text-on-inverse-surface"
                        />
                        <span>{attachment.name}</span>
                    </a>
                )}

                {onPin && (
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={onPin}
                            aria-label="سنجاق"
                        >
                            <Icon
                                label="pin"
                                className="size-5! text-on-inverse-surface"
                            />
                        </Button>
                    </div>
                )}
            </div>

            <div className="flex flex-row items-center gap-2 px-1">
                <Avatar size="sm" className="bg-surface-container-highest">
                    <AvatarFallback className="bg-surface-container-highest text-label-sm text-outline">
                        {operator.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <span className="text-label-sm text-outline">{operator.name}</span>
                <span className="text-label-sm text-outline">.</span>
                <span className="text-label-sm text-outline text-nowrap">
                    {formatFaDateTime(date)}
                </span>
            </div>
        </div>
    )
}

export default QueryBlubbe
