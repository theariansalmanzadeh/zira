'use client'

import { Button } from '@shared/components/ui/button'
import { Checkbox } from '@shared/components/ui/Checkbox'
import IconButton from '@shared/components/ui/IconButton'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@shared/components/ui/Table'
import type { BaseModalProps } from '../../types'
import GroupTableRow from './components/GroupTableRow'
import Header from './components/Header'
import UserTableRow from './components/UserTableRow'
import { TOTAL_ITEMS } from './constants'
import {
    SelectUserAndGroupsProvider,
    useSelectUserAndGroups,
} from './provider'
import type {
    SelectGroupItem,
    SelectUserAndGroupsModalData,
    SelectUserItem,
} from './types'

export type {
    SelectUserAndGroupsModalData,
    SelectUserItem,
    SelectGroupItem,
} from './types'

const SelectUserAndGroupsContent = ({ hasOnlyUsers = false }: { hasOnlyUsers?: boolean }) => {
    const {
        activeTab,
        setPage,
        selectedIds,
        filteredItems,
        headerCheckboxState,
        toggleItemSelection,
        toggleAllOnPage,
        handleSelect,
        pageStart,
        pageEnd,
        closeModal,
    } = useSelectUserAndGroups()

    return (
        <div className="flex w-full min-w-[720px] flex-col gap-4" dir="rtl">
            <Header hasOnlyUsers={hasOnlyUsers} />

            <div className="rounded-card-lg bg-surface-container-high p-2">
                <Table className="border-collapse border-spacing-y-4">
                    <TableHeader className="rounded-xl">
                        <TableRow className="[&>*]:text-outline [&>*]:text-label-lg [&>*]:font-normal">
                            <TableHead className="w-[48px]">
                                <Checkbox
                                    className='overflow-hidden size-6!'
                                    checked={headerCheckboxState}
                                    onCheckedChange={toggleAllOnPage}
                                />
                            </TableHead>
                            {activeTab === 'user' ? (
                                <>
                                    <TableHead>نام کاربر</TableHead>
                                    <TableHead>شناسه کاربر</TableHead>
                                    <TableHead>نقش‌ها</TableHead>
                                    <TableHead>دسترسی‌ها</TableHead>
                                    <TableHead>وضعیت</TableHead>
                                </>
                            ) : (
                                <>
                                    <TableHead>عنوان گروه</TableHead>
                                    <TableHead>شناسه گروه</TableHead>
                                    <TableHead>نقش گروه</TableHead>
                                    <TableHead>تعداد کاربران</TableHead>
                                    <TableHead>وضعیت</TableHead>
                                </>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeTab === 'user'
                            ? (filteredItems as SelectUserItem[]).map((user) => (
                                <UserTableRow
                                    key={user.id}
                                    user={user}
                                    checked={selectedIds.has(user.id)}
                                    onCheckedChange={(checked) =>
                                        toggleItemSelection(user.id, checked)
                                    }
                                />
                            ))
                            : (filteredItems as SelectGroupItem[]).map((group) => (
                                <GroupTableRow
                                    key={group.id}
                                    group={group}
                                    checked={selectedIds.has(group.id)}
                                    onCheckedChange={(checked) =>
                                        toggleItemSelection(group.id, checked)
                                    }
                                />
                            ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center">
                <div className="flex flex-row items-center gap-2 rounded-container-md bg-surface-container-high px-3 py-2 text-on-surface-variant">
                    <span className="text-label-md">
                        {pageStart}-{pageEnd} از {TOTAL_ITEMS}
                    </span>
                    <IconButton
                        variant="ghost"
                        icon="chevronLeft400Linear"
                        iconClassName="rotate-180"
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    />
                    <IconButton
                        variant="ghost"
                        icon="chevronRight400Linear"
                        onClick={() => setPage((prev) => prev + 1)}
                    />
                </div>
            </div>

            <div className="flex flex-row items-center justify-between pt-2">
                <Button type="button" variant="ghost" onClick={closeModal}>
                    بازگشت
                </Button>
                <Button type="button" variant="primary" onClick={handleSelect}>
                    انتخاب
                </Button>
            </div>
        </div>
    )
}

const SelectUserAndGroups = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as SelectUserAndGroupsModalData | null | undefined

    return (
        <SelectUserAndGroupsProvider modalData={modalData} closeModal={closeModal}>
            <SelectUserAndGroupsContent hasOnlyUsers={modalData?.hasOnlyUsers} />
        </SelectUserAndGroupsProvider>
    )
}

export default SelectUserAndGroups
