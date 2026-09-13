'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { USER_SIDEBAR_CONTENT } from './content'
import { cn } from '../../libs/utils'
import { usePathname } from 'next/navigation'

const UserSidebar = () => {
    const pathname = usePathname()
    return (
        <aside
            className="bg-surface-container-lowest hidden! lg:flex! mx-3 w-min p-lg gap-sm flex-col items-stretch rounded-card-lg h-full"
            dir="rtl"
        >
            <div className="flex flex-row items-start justify-start gap-2">
                <div className="rounded-full bg-surface-container-high h-8 w-8">
                    <Image
                        src="/images/user.png"
                        alt="user"
                        width={32}
                        height={32}
                    />
                </div>
                <div>
                    <p className="text-sm font-medium text-on-surface">John Doe</p>
                    <p className="text-sm text-outline">john.doe@example.com</p>
                </div>
            </div>

            <nav className="mt-4 flex flex-col gap-1">
                {USER_SIDEBAR_CONTENT.map((item) => (
                    <Link
                        key={item.link}
                        href={item.link}
                        className={cn("flex flex-row items-center gap-3 rounded-container-md px-3 py-2 text-on-surface-variant hover:bg-primary/16",
                            pathname === item.link && "bg-primary/16 text-primary"
                        )}
                    >
                        <Icon label={item.icon} className="size-6!" />
                        <span className="text-label-lg whitespace-nowrap">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

export default UserSidebar
