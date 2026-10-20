import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import UnitList from './unitList/UnitList'

const Settings = () => {
    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <HeadingWithActions>
                <HeadingWithActions.Title>تنظیمات</HeadingWithActions.Title>
                <HeadingWithActions.SubTitle>
                    پیکربندی سامانه
                </HeadingWithActions.SubTitle>
            </HeadingWithActions>
            <UnitList />
        </div>
    )
}

export default Settings
