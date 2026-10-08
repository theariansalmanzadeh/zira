'use client'

import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { TableHead, TableHeader, TableRow } from '@/src/shared/components/ui/Table'
import { TABLE_HEADERS } from '../constants'

type CustomerTableHeaderProps = {
    allSelected: boolean
    someSelected: boolean
    onToggleAll: (checked: boolean) => void
}

const CustomerTableHeader = ({
    allSelected,
    someSelected,
    onToggleAll,
}: CustomerTableHeaderProps) => {
    return (
        <TableHeader className="rounded-xl">
            <TableRow className="hover:bg-transparent [&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline">
                {TABLE_HEADERS.map((label, index) => (
                    <TableHead
                        key={label || `select-${index}`}
                        className={label === '' ? 'w-[48px]' : undefined}
                    >
                        {label === '' ? (
                            <Checkbox
                                className="size-6! overflow-hidden"
                                checked={
                                    allSelected
                                        ? true
                                        : someSelected
                                          ? 'indeterminate'
                                          : false
                                }
                                onCheckedChange={(checked) =>
                                    onToggleAll(checked === true)
                                }
                            />
                        ) : (
                            label
                        )}
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
    )
}

export default CustomerTableHeader
