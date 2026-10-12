import AdminLayoutShell from '../AdminLayoutShell'
import GuardLayout from './GuardLayout'

const AdminPanelLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <GuardLayout>
            <AdminLayoutShell>
                {children}
            </AdminLayoutShell>
        </GuardLayout>
    )
}

export default AdminPanelLayout
