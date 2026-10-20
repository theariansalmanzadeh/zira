import type { ItemImageKind, SetItemImagesPayload } from '@/src/api/types/admin/catalog'
import {
    GALLERY_KIND_ORDER,
    type GalleryImagesFormValues,
} from '../schema'

type ImageRow = {
    kind: ItemImageKind
    is_primary: boolean
    sort_order: number
    file_index: number
}

export const toSetItemImagesPayload = (
    gallery: GalleryImagesFormValues
): SetItemImagesPayload | null => {
    const files: File[] = []
    const rows: ImageRow[] = []

    GALLERY_KIND_ORDER.forEach((kind) => {
        gallery[kind].forEach((file) => {
            rows.push({
                kind,
                is_primary: rows.length === 0,
                sort_order: rows.length,
                file_index: files.length,
            })
            files.push(file)
        })
    })

    if (files.length === 0) return null

    return {
        rows: JSON.stringify(rows),
        files,
    }
}
