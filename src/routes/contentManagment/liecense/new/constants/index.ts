import type {
    DocumentFileType,
    DocumentTab,
    DocumentVisibility,
} from '../schema'

export type {
    DocumentFileType,
    DocumentTab,
    DocumentVisibility,
    NewLiecenseFormValues,
} from '../schema'

export {
    NEW_LIECENSE_DEFAULT_VALUES,
    newLiecenseFormSchema,
} from '../schema'

export const DOCUMENT_TAB_OPTIONS: {
    value: DocumentTab
    label: string
}[] = [
    { value: 'certificate', label: 'گواهی' },
    { value: 'license', label: 'مجوز و استاندارد' },
]

export const DOCUMENT_FILE_TYPE_OPTIONS: {
    value: DocumentFileType
    label: string
}[] = [
    { value: 'pdf', label: 'فایل PDF' },
    { value: 'image', label: 'تصویر' },
]

export const DOCUMENT_VISIBILITY_OPTIONS: {
    value: DocumentVisibility
    label: string
}[] = [
    { value: 'visible', label: 'نمایش در فروشگاه' },
    { value: 'hidden', label: 'فعلاً پنهان' },
]

export const FILE_UPLOAD_HINT = 'PDF یا تصویر (JPG/PNG) · حداکثر ۵ مگابایت'
export const FILE_UPLOAD_PDF_HINT = 'PDF · حداکثر ۵ مگابایت'
