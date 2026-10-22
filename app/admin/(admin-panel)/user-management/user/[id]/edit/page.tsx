import AddAndUpdateUser from '@/src/routes/userManagment/user/addAndUpdateUser'

type EditUserPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditUserPage({ params }: EditUserPageProps) {
    const { id } = await params

    return <AddAndUpdateUser id={id} />
}
