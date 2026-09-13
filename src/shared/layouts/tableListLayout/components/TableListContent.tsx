import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

export type TableListContentProps = {
    isPending: boolean
    isCardLayout: boolean
    children: React.ReactNode
}

const TableListContent = ({
    isPending,
    isCardLayout,
    children,
}: TableListContentProps) => {
    if (isPending) {
        return <TableLoadingSkeleton isPending={isPending} />
    }

    if (isCardLayout) {
        return <div className='grid grid-cols-3 gap-4'>{children}</div>
    }

    return children
}

export default TableListContent
