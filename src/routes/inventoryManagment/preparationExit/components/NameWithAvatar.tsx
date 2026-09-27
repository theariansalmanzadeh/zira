'use client'

import { useMemo } from 'react'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { randomColorGenerator } from '@/src/shared/libs/color'
import { cn } from '@/src/shared/libs/utils'

const NameWithAvatar = ({ name }: { name: string }) => {
    const color = useMemo(() => randomColorGenerator(), [name])

    if (!name || name === '—') {
        return <span className="text-label-lg text-on-surface-variant">—</span>
    }

    return (
        <div className="flex items-center gap-2">
            <Avatar size="sm">
                <AvatarFallback
                    className={cn('text-label-sm', color.className)}
                >
                    {name.trim().charAt(0)}
                </AvatarFallback>
            </Avatar>
            <span className="text-label-lg text-on-surface-variant">{name}</span>
        </div>
    )
}

export default NameWithAvatar
