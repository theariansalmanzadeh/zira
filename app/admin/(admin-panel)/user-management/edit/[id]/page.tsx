import { redirect } from 'next/navigation'

type LegacyEditUserPageProps = {
    params: Promise<{ id: string }>
}

export default async function LegacyEditUserPage({
    params,
}: LegacyEditUserPageProps) {
    const { id } = await params
    redirect(`/admin/user-management/user/${encodeURIComponent(id)}/edit`)
}
