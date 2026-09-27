'use client'

import { useState } from 'react'
import DocumentFileUpload from '@/src/routes/contentManagment/liecense/new/components/DocumentFileUpload'
import { Button } from '@/src/shared/components/ui/button'
import { Textarea } from '@/src/shared/components/ui/TextArea'

const outlineClassName =
    'h-10 rounded-full border border-outline-variant bg-surface-container-lowest px-5 text-label-md text-on-surface hover:bg-surface-container-high'

const successClassName =
    'h-10 rounded-full border-0 bg-success-container px-5 text-label-md text-on-success-container hover:bg-success-container/80'

const InPersonActions = () => {
    const [signedReceipt, setSignedReceipt] = useState<File | null>(null)
    const [notes, setNotes] = useState('')

    return (
        <div className="flex flex-col gap-3 bg-surface-container-lowest p-3 rounded-card-lg" dir="rtl">
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="in-person-notes"
                    className="text-label-md text-on-surface"
                >
                    ثبت توضیحات
                </label>
                <Textarea
                    id="in-person-notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="توضیحات تحویل را بنویسید"
                    className="min-h-28 rounded-card-lg border border-outline-variant bg-surface-container-lowest"
                />
                <div className="flex flex-col gap-2">
                    <span className="text-label-md text-on-surface">
                        بارگذاری رسید امضا شده
                    </span>
                    <DocumentFileUpload
                        isImg={false}
                        fileName={signedReceipt?.name}
                        onChange={(file) => setSignedReceipt(file ?? null)}
                    />
                </div>
                <div className="flex flex-row flex-wrap items-center gap-2 mt-5">
                    <Button type="button" variant="outline" className={outlineClassName}>
                        چاپ رسید تحویل
                    </Button>
                    <Button type="button" variant="success">
                        ثبت تحویل و خروج
                    </Button>
                    <Button type="button" variant="error" >
                        رد
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default InPersonActions
