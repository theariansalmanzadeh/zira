'use client'

import { Controller, useFormContext } from 'react-hook-form'
import {
    DOCUMENT_FILE_TYPE_OPTIONS,
    DOCUMENT_VISIBILITY_OPTIONS,
} from '../constants'
import type { NewLiecenseFormValues } from '../schema'
import ChoiceGroup from './ChoiceGroup'

const FileAndVisibilityFields = () => {
    const { control } = useFormContext<NewLiecenseFormValues>()

    return (
        <div className="flex flex-col gap-4">
            <Controller
                control={control}
                name="fileType"
                render={({ field }) => (
                    <ChoiceGroup
                        label="نوع فایل"
                        options={DOCUMENT_FILE_TYPE_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name="visibility"
                render={({ field }) => (
                    <ChoiceGroup
                        label="وضعیت نمایش"
                        options={DOCUMENT_VISIBILITY_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
        </div>
    )
}

export default FileAndVisibilityFields
