import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'

const Settings = () => {
    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <HeadingWithActions>
                <HeadingWithActions.Title>تنظیمات</HeadingWithActions.Title>
                <HeadingWithActions.SubTitle>
                    پیکربندی سامانه
                </HeadingWithActions.SubTitle>
            </HeadingWithActions>
            <div className="flex min-h-48 items-center justify-center rounded-card-md bg-surface-container-lowest p-6">
                <span className="text-label-lg text-outline">به زودی</span>
            </div>
        </div>
    )
}

export default Settings
