'use client'

import InfoCardField from '@/src/shared/components/infoCard/components/InfoCardField'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { Button } from '@/src/shared/components/ui/button'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import {
    DEFAULT_CUSTOMER_GROUP_DETAILS,
    type CustomerGroupMember,
} from '@/src/shared/components/modals/components/CustomerGroupDetails.types'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import MembersTableHeader from './components/MembersTableHeader'
import MembersTableRow from './components/MembersTableRow'

const SectionDivider = () => (
    <hr className="border-0 border-t border-dashed border-outline-variant" />
)

type CustomerGroupDetailsPageProps = {
    code?: string
    name?: string
    userLevel?: string
    marketerName?: string
    chequeLevel?: string
    goldLevel?: string
    userStatus?: string
    members?: CustomerGroupMember[]
}

const CustomerGroupDetails = ({
    code = DEFAULT_CUSTOMER_GROUP_DETAILS.code,
    name = DEFAULT_CUSTOMER_GROUP_DETAILS.name,
    userLevel = DEFAULT_CUSTOMER_GROUP_DETAILS.userLevel,
    marketerName = DEFAULT_CUSTOMER_GROUP_DETAILS.marketerName,
    chequeLevel = DEFAULT_CUSTOMER_GROUP_DETAILS.chequeLevel,
    goldLevel = DEFAULT_CUSTOMER_GROUP_DETAILS.goldLevel,
    userStatus = DEFAULT_CUSTOMER_GROUP_DETAILS.userStatus,
    members = DEFAULT_CUSTOMER_GROUP_DETAILS.members,
}: CustomerGroupDetailsPageProps) => {
    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <div className="rounded-card-md bg-surface-container-lowest p-6">
                <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-5">
                    <InfoCardField label="کد گروه" value={code} />
                    <InfoCardField label="نام گروه" value={name} />
                    <InfoCardField label="سطح کاربران گروه" value={userLevel} />
                    <div className="flex flex-col gap-3 text-right">
                        <span className="text-label-md text-outline">
                            نام بازاریاب
                        </span>
                        <div className="flex flex-row items-center gap-2">
                            <Avatar size="sm">
                                <AvatarFallback className="bg-surface-container-highest text-label-sm text-on-surface-variant">
                                    {marketerName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-label-lg text-on-surface-variant">
                                {marketerName}
                            </span>
                        </div>
                    </div>
                    <InfoCardField label="سطح اعتبار چک" value={chequeLevel} />
                </div>

                <SectionDivider />

                <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-5">
                    <InfoCardField
                        label="سطح اعتبار طلایی"
                        value={goldLevel}
                    />
                    <InfoCardField
                        label="وضعیت کاربران گروه"
                        value={userStatus}
                    />
                </div>

                <SectionDivider />
            </div>

            <div className="overflow-hidden rounded-card-md border border-outline-variant bg-surface-container-lowest">
                <div className="flex flex-row flex-wrap items-center justify-between gap-2 border-b border-outline-variant px-5 py-4">
                    <span className="text-title-md font-semibold text-on-surface">
                        اعضای گروه{' '}
                        <span className="text-label-md font-normal text-outline">
                            ({formatFaNumber(members.length)} نفر)
                        </span>
                    </span>
                    <Button
                        type="button"
                        variant="primary-outline"
                        size="sm"
                        className="gap-1.5"
                    >
                        <span className="text-base leading-none">+</span>
                        افزودن کاربر
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <Table className="min-w-[640px] border-collapse">
                        <MembersTableHeader />
                        <TableBody>
                            {members.map((member) => (
                                <MembersTableRow
                                    key={member.code}
                                    data={member}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default CustomerGroupDetails
