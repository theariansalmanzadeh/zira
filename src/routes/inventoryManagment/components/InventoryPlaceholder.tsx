type InventoryPlaceholderProps = {
    title: string
}

const InventoryPlaceholder = ({ title }: InventoryPlaceholderProps) => {
    return (
        <div className='flex min-h-48 items-center justify-center rounded-card-md bg-surface-container-lowest p-6'>
            <span className='text-label-lg text-outline'>{title}</span>
        </div>
    )
}

export default InventoryPlaceholder
