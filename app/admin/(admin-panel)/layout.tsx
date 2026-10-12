import GuardLayout from './GuardLayout'

const AdminPanelLayout = ({ children }: { children: React.ReactNode }) => {
    return <GuardLayout>{children}</GuardLayout>
}

export default AdminPanelLayout
