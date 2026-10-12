import UserManagement, {
    type UserManagementSearchParams,
} from '@/src/routes/userManagment'
import UserManagementLayout from '@/src/routes/userManagment/components/UserManagementLayout'

type UserManagementPageProps = {
    searchParams: Promise<UserManagementSearchParams>
}

export default async function UserManagementPage({
    searchParams,
}: UserManagementPageProps) {
    const params = await searchParams

    return (
        <>

            <UserManagementLayout searchParams={params}>
                <UserManagement searchParams={params} />
            </UserManagementLayout>
        </>
    )
}
