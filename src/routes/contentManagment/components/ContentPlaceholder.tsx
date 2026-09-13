type ContentPlaceholderProps = {
    title: string
}

const ContentPlaceholder = ({ title }: ContentPlaceholderProps) => {
    return (
        <div className="flex min-h-48 items-center justify-center rounded-card-md bg-surface-container-lowest p-6">
            <span className="text-label-lg text-outline">{title}</span>
        </div>
    )
}

export default ContentPlaceholder
