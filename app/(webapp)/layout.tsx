import PublicLayout from './PublicLayout'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <PublicLayout>{children}</PublicLayout>
}
