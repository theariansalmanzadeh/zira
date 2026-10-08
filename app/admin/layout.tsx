import AdminLayoutShell from './AdminLayoutShell'

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <AdminLayoutShell>{children}</AdminLayoutShell>
}
