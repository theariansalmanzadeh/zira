import { Input } from '@/src/shared/components/ui/Input'
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'
import IconButton from '@/src/shared/components/ui/IconButton'
import { TOGGLE_OPTIONS } from '../constants'
import { useSelectUserAndGroups } from '../provider'
import type { SelectUserAndGroupsTab } from '../types'

type HeaderProps = {
    hasOnlyUsers?: boolean
}

const Header = ({ hasOnlyUsers = false }: HeaderProps) => {
    const { activeTab, setActiveTab, searchQuery, setSearchQuery, setPage } =
        useSelectUserAndGroups()

    return (
        <div className="flex flex-row items-center justify-between gap-3">
            {!hasOnlyUsers && (
                <ToggleGroup
                    type="single"
                    value={activeTab}
                    variant="filled"
                    className="shrink-0 rounded-container-md! bg-surface-container-high p-1.5 flex-row-reverse"
                    onValueChange={(nextValue) => {
                        if (nextValue) {
                            setActiveTab(nextValue as SelectUserAndGroupsTab)
                            setPage(1)
                        }
                    }}
                >
                    {TOGGLE_OPTIONS.map((item) => (
                        <ToggleGroupItem key={item.value} value={item.value}>
                            {item.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            )}
            <div className="mr-auto flex flex-row items-center gap-1">
                <Input
                    dir="rtl"
                    value={searchQuery}
                    onChange={setSearchQuery}
                    iconId="magnifier"
                    placeholder="جستجو با شناسه یا نام کاربر..."
                    wrapperClassName="min-w-[320px] rounded-full flex-row-reverse px-1"
                    className="text-right"
                />
                <IconButton icon="filter400Linear" />
                <IconButton icon="sort400Linear" onClick={() => { }} />
            </div>
        </div>
    )
}

export default Header
