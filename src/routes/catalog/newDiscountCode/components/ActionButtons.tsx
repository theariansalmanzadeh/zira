'use client'

import { Button } from '@/src/shared/components/ui/button'

type ActionButtonsProps = {
    onSaveDraft?: () => void
    onSaveAndPublish?: () => void
    isSavingDraft?: boolean
    isPublishing?: boolean
    disabled?: boolean
}

const ActionButtons = ({
    onSaveDraft,
    onSaveAndPublish,
    isSavingDraft = false,
    isPublishing = false,
    disabled = false,
}: ActionButtonsProps) => {
    return (
        <div className='mt-4 flex flex-row items-center gap-2'>
            <Button
                type='button'
                variant='primary'
                size='default'
                disabled={disabled || isPublishing}
                isLoading={isSavingDraft}
                onClick={onSaveDraft}
            >
                ذخیره پیش‌نویس
            </Button>
            <Button
                type='button'
                variant='default'
                size='default'
                disabled={disabled || isSavingDraft}
                isLoading={isPublishing}
                onClick={onSaveAndPublish}
            >
                ذخیره و انتشار
            </Button>
        </div>
    )
}

export default ActionButtons
