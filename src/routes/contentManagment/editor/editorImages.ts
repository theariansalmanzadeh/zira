import type { Editor } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'

const readImageFile = (file: File, onLoad: (src: string) => void) => {
    const reader = new FileReader()
    reader.onload = () => onLoad(String(reader.result))
    reader.readAsDataURL(file)
}

export const imageFileFromList = (files?: FileList | File[] | null) =>
    Array.from(files ?? []).find((item) => item.type.startsWith('image/'))

export const insertImageFile = (view: EditorView, file: File) => {
    readImageFile(file, (src) => {
        const image = view.state.schema.nodes.image
        if (!image) return
        const node = image.create({ src, alt: file.name })
        view.dispatch(view.state.tr.replaceSelectionWith(node))
    })
}

export const insertEditorImage = (editor: Editor, file: File) => {
    readImageFile(file, (src) => {
        editor
            .chain()
            .focus()
            .insertContent({
                type: 'image',
                attrs: { src, alt: file.name },
            })
            .run()
    })
}
