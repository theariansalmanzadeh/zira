'use client'

import { useEffect, useRef } from 'react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { TextStyleKit } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import type { EditorView as ProseMirrorView } from '@tiptap/pm/view'
import { Image as ImageIcon } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { cn } from '@shared/libs/utils'
import {
    editorContentType,
    MarkdownExtension,
    readEditorMarkdown,
} from '@/src/routes/contentManagment/editor/markdownContent'
import { useMenuBarEditorState } from '@/src/routes/contentManagment/workWithUs/hooks/useMenuBarEditorState'
import type { AddAndEditBlogFormValues } from '../schema'

const extensions = [
    TextStyleKit,
    StarterKit,
    Underline,
    Image.configure({
        inline: false,
        allowBase64: true,
    }),
    Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-primary underline' },
    }),
    MarkdownExtension,
]

const insertImageFile = (view: ProseMirrorView, file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
        const image = view.state.schema.nodes.image
        if (!image) return
        const node = image.create({ src: String(reader.result), alt: file.name })
        view.dispatch(view.state.tr.replaceSelectionWith(node))
    }
    reader.readAsDataURL(file)
}

const toolbarButtonClassName = (active: boolean) =>
    cn(
        'flex size-7 items-center justify-center rounded-button-sm text-label-md font-bold text-outline transition-colors hover:bg-surface-container-lowest hover:text-on-surface disabled:opacity-40',
        active && 'bg-surface-container-lowest text-primary'
    )

const EditorView = () => {
    const { control, setValue } = useFormContext<AddAndEditBlogFormValues>()
    const content = useWatch({ control, name: 'content' }) ?? ''
    const fileInputRef = useRef<HTMLInputElement>(null)

    const editor = useEditor({
        extensions,
        content,
        contentType: editorContentType(content),
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: cn(
                    'min-h-72 w-full px-4 py-3 text-body-md leading-8 text-on-surface outline-none',
                    '[&_ul]:list-disc [&_ul]:ps-5',
                    '[&_ol]:list-decimal [&_ol]:ps-5',
                    '[&_blockquote]:border-s-2 [&_blockquote]:border-outline-variant [&_blockquote]:ps-3',
                    '[&_a]:text-primary [&_a]:underline',
                    '[&_img]:my-3 [&_img]:max-h-80 [&_img]:w-full [&_img]:rounded-card-md [&_img]:object-contain'
                ),
            },
            handlePaste: (view, event) => {
                const file = Array.from(event.clipboardData?.files ?? []).find(
                    (item) => item.type.startsWith('image/')
                )
                if (!file) return false
                event.preventDefault()
                insertImageFile(view, file)
                return true
            },
            handleDrop: (view, event) => {
                const file = Array.from(event.dataTransfer?.files ?? []).find(
                    (item) => item.type.startsWith('image/')
                )
                if (!file) return false
                event.preventDefault()
                insertImageFile(view, file)
                return true
            },
        },
        onUpdate: ({ editor: currentEditor }) => {
            setValue('content', readEditorMarkdown(currentEditor), {
                shouldDirty: true,
            })
        },
    })

    useEffect(() => {
        if (!editor) return
        const markdown = readEditorMarkdown(editor)
        if (markdown === content) return
        if (editorContentType(content) === 'html' && editor.getHTML() === content) {
            return
        }
        editor.commands.setContent(content || '', {
            emitUpdate: false,
            contentType: editorContentType(content),
        })
    }, [content, editor])

    const { editorState, handleLink } = useMenuBarEditorState(editor)
    const isEmpty =
        useEditorState({
            editor,
            selector: (ctx) => ctx.editor?.isEmpty ?? true,
        }) ?? true

    const addImage = (file?: File) => {
        if (!file || !editor) return
        const reader = new FileReader()
        reader.onload = () => {
            editor
                .chain()
                .focus()
                .insertContent({
                    type: 'image',
                    attrs: { src: String(reader.result), alt: file.name },
                })
                .run()
        }
        reader.readAsDataURL(file)
    }

    return (
        <div
            className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
        >
            <h3 className="mb-3 text-label-lg font-semibold text-on-surface">
                محتوای مقاله
            </h3>
            <div className="mb-3 flex justify-end">
                <div className="flex w-fit items-center gap-0.5 rounded-card-sm bg-surface-container-high p-1">
                    <button
                        type="button"
                        title="درشت"
                        disabled={!editor || !editorState.canBold}
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className={toolbarButtonClassName(editorState.isBold)}
                    >
                        B
                    </button>
                    <button
                        type="button"
                        title="مورب"
                        disabled={!editor || !editorState.canItalic}
                        onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                        }
                        className={toolbarButtonClassName(editorState.isItalic)}
                    >
                        I
                    </button>
                    <button
                        type="button"
                        title="زیرخط"
                        disabled={!editor || !editorState.canUnderline}
                        onClick={() =>
                            editor?.chain().focus().toggleUnderline().run()
                        }
                        className={toolbarButtonClassName(editorState.isUnderline)}
                    >
                        U
                    </button>
                    <button
                        type="button"
                        title="فهرست"
                        disabled={!editor || !editorState.canBulletList}
                        onClick={() =>
                            editor?.chain().focus().toggleBulletList().run()
                        }
                        className={toolbarButtonClassName(editorState.isBulletList)}
                    >
                        •
                    </button>
                    <button
                        type="button"
                        title="پیوند"
                        disabled={!editor}
                        onClick={handleLink}
                        className={toolbarButtonClassName(editorState.isLink)}
                    >
                        🔗
                    </button>
                    <button
                        type="button"
                        title="نقل‌قول"
                        disabled={!editor || !editorState.canBlockquote}
                        onClick={() =>
                            editor?.chain().focus().toggleBlockquote().run()
                        }
                        className={toolbarButtonClassName(editorState.isBlockquote)}
                    >
                        ❝
                    </button>
                    <button
                        type="button"
                        title="تصویر"
                        disabled={!editor}
                        onClick={() => fileInputRef.current?.click()}
                        className={toolbarButtonClassName(false)}
                    >
                        <ImageIcon className="size-4" />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                            addImage(event.target.files?.[0])
                            event.target.value = ''
                        }}
                    />
                </div>
            </div>
            <div className="relative rounded-card-md border border-outline-variant">
                {isEmpty ? (
                    <span className="pointer-events-none absolute top-3 right-4 text-body-md text-outline">
                        متن کامل مقاله را اینجا بنویسید...
                    </span>
                ) : null}
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default EditorView
