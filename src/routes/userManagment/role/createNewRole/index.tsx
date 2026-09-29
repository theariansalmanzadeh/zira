'use client'

import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'

const CreateNewRole = () => {
    return (
        <div className="mx-auto flex w-full max-w-[700px] flex-col gap-6" dir="rtl">
            <div className="rounded-card-md bg-surface-container-lowest p-6">
                <div className="grid grid-cols-2 gap-6">
                    <Input label="نام نقش *" placeholder="نام نقش" value="" onChange={() => {}} />
                    <CopyableInput value="RL-5318_92" onCopy={() => {}} readOnly />
                    <div className="col-span-2 flex flex-col">
                        <label className="mb-1.5 text-label-md text-on-surface-variant">توضیحات</label>
                        <Textarea
                            className="min-h-32 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-2 text-on-surface placeholder:text-outline"
                            placeholder=""
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewRole
