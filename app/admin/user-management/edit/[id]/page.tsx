import EditUser from '@/src/routes/userManagment/user/editUser/EditUser'

type EditUserPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditUserPage({ params }: EditUserPageProps) {
    const { id } = await params

    return <EditUser id={id} />
}
