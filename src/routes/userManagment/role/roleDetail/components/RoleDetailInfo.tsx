type RoleDetailFieldProps = {
    label: string
    value: string
}

const RoleDetailField = ({ label, value }: RoleDetailFieldProps) => (
    <div className="flex min-w-0 flex-col gap-1 text-right">
        <span className="text-label-md text-on-surface">{label}</span>
        <span className="text-label-lg text-outline">{value}</span>
    </div>
)

const RoleDetailInfo = () => {
    return (
        <div className="rounded-card-md bg-surface-container-lowest p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <RoleDetailField label="سطح نقش" value="مدیر" />
                <RoleDetailField label="بخش مربوطه" value="مالی" />
                <RoleDetailField label="توضیحات" value="-" />
            </div>

            <hr className="my-6 border-0 border-t border-dashed border-outline-variant" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <RoleDetailField label="دسترسی‌ها" value="8 دسترسی" />
                <RoleDetailField label="کاربران" value="12 کاربر" />
            </div>
        </div>
    )
}

export default RoleDetailInfo
