'use client'

import { Button } from '@/src/shared/components/ui/button'
import { useArchivePost } from '@/src/routes/contentManagment/hooks/blog'

type ActionsProps = {
    isEdit: boolean
    postId: string
    isPending: boolean
    onDeleted: () => void
}

const Actions = ({ isEdit, postId, isPending, onDeleted }: ActionsProps) => {
    const { mutate: archivePost, isPending: isArchiving } = useArchivePost()

    const onDelete = () => {
        if (!isEdit || !postId) return
        archivePost({ postId }, { onSuccess: onDeleted })
    }

    return (
        <div className="flex items-center justify-end gap-2">
            {isEdit ? (
                <Button
                    type="button"
                    variant="error"
                    onClick={onDelete}
                    isLoading={isArchiving}
                    disabled={isPending}
                >
                    حذف مقاله
                </Button>
            ) : null}
            <Button
                type="submit"
                variant="primary"
                isLoading={isPending}
                disabled={isArchiving}
            >
                {isEdit ? 'ذخیره تغییرات' : 'ثبت مقاله'}
            </Button>
        </div>
    )
}

export default Actions
