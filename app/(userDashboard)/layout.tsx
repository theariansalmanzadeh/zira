import UserSidebar from '@/src/shared/components/userSidebar/UserSidebar'

export default function UserDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex min-h-screen w-full flex-row-reverse bg-surface-container-high p-lg">
            <div className="grow bg-surface-container-high">
                <div className="flex flex-col gap-2">{children}</div>
            </div>
            <div>
                <UserSidebar />
            </div>
        </div>
    )
}
