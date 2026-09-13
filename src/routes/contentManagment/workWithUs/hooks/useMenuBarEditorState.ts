'use client'

import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'

const EMPTY_EDITOR_STATE = {
    isBold: false,
    canBold: false,
    isItalic: false,
    canItalic: false,
    isUnderline: false,
    canUnderline: false,
    isBulletList: false,
    canBulletList: false,
    isLink: false,
    canLink: false,
    isBlockquote: false,
    canBlockquote: false,
} as const

export type MenuBarEditorState = {
    isBold: boolean
    canBold: boolean
    isItalic: boolean
    canItalic: boolean
    isUnderline: boolean
    canUnderline: boolean
    isBulletList: boolean
    canBulletList: boolean
    isLink: boolean
    canLink: boolean
    isBlockquote: boolean
    canBlockquote: boolean
}

export const useMenuBarEditorState = (editor: Editor | null) => {
    const editorState =
        useEditorState({
            editor,
            selector: (ctx): MenuBarEditorState => {
                if (!ctx.editor) return { ...EMPTY_EDITOR_STATE }

                return {
                    isBold: ctx.editor.isActive('bold'),
                    canBold: ctx.editor.can().chain().focus().toggleBold().run(),
                    isItalic: ctx.editor.isActive('italic'),
                    canItalic: ctx.editor
                        .can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run(),
                    isUnderline: ctx.editor.isActive('underline'),
                    canUnderline: ctx.editor
                        .can()
                        .chain()
                        .focus()
                        .toggleUnderline()
                        .run(),
                    isBulletList: ctx.editor.isActive('bulletList'),
                    canBulletList: ctx.editor
                        .can()
                        .chain()
                        .focus()
                        .toggleBulletList()
                        .run(),
                    isLink: ctx.editor.isActive('link'),
                    canLink: ctx.editor
                        .can()
                        .chain()
                        .focus()
                        .setLink({ href: '' })
                        .run(),
                    isBlockquote: ctx.editor.isActive('blockquote'),
                    canBlockquote: ctx.editor
                        .can()
                        .chain()
                        .focus()
                        .toggleBlockquote()
                        .run(),
                }
            },
        }) ?? EMPTY_EDITOR_STATE

    const handleLink = () => {
        if (!editor) return

        const previousUrl = editor.getAttributes('link').href as
            | string
            | undefined
        const url = window.prompt('آدرس پیوند', previousUrl ?? 'https://')

        if (url === null) return

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run()
    }

    return { editorState, handleLink }
}
