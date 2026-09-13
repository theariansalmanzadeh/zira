import {
    TableHead,
    TableHeader as UiHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'

const TABLE_HEADERS = ['', 'نام کاربر', 'نقش', 'ساعت کاری', 'دسترسی‌ها']

const EployeeTableHeader = () => {
    return (
        <UiHeader className="rounded-xl">
            <TableRow className="[&>*]:text-outline [&>*]:text-label-sm [&>*]:font-normal">
                {TABLE_HEADERS.map((header, index) => (
                    <TableHead
                        key={`${header}-${index}`}
                        className="bg-transparent!"
                    >
                        {header}
                    </TableHead>
                ))}
            </TableRow>
        </UiHeader>
    )
}

export default EployeeTableHeader
