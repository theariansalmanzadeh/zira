'use client'

import { useEffect } from 'react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { TextStyleKit } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import { useWorkWithUs } from '../provider'
import EditorHeader from './EditorHeader'
import MenuBarEditor from './MenuBarEditor'

export type EditSectionStatus = 'published' | 'draft' | 'hidden'

export type EditSectionViewProps = {
    id: string
    index: number
    className?: string
}

const extensions = [
    TextStyleKit,
    StarterKit,
    Underline,
    Link.configure({
        openOnClick: false,
        HTMLAttributes: {
            class: 'text-primary underline',
        },
    }),
]

const EditSectionView = ({ id, index, className }: EditSectionViewProps) => {
    const { sections, updateSection, saveSection } = useWorkWithUs()
    const section = sections.find((item) => item.id === id)

    const editor = useEditor({
        extensions,
        content: section?.body ?? '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: cn(
                    'min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2',
                    'text-body-md leading-8 text-on-surface outline-none',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    '[&_ul]:list-disc [&_ul]:ps-5',
                    '[&_ol]:list-decimal [&_ol]:ps-5',
                    '[&_blockquote]:border-s-2 [&_blockquote]:border-outline-variant [&_blockquote]:ps-3 [&_blockquote]:text-on-surface-variant',
                    '[&_a]:text-primary [&_a]:underline'
                ),
            },
        },
        onUpdate: ({ editor: currentEditor }) => {
            updateSection(id, { body: currentEditor.getHTML() })
        },
    })

    useEffect(() => {
        if (!editor || !section) return
        if (editor.getHTML() === section.body) return
        editor.commands.setContent(section.body, { emitUpdate: false })
    }, [section?.body, editor, section])

    const characterCount =
        useEditorState({
            editor,
            selector: (ctx) => ctx.editor?.getText().length ?? 0,
        }) ?? 0

    if (!section) return null

    return (
        <div
            className={cn(
                'overflow-hidden rounded-card-lg border border-outline-variant bg-surface-container-lowest',
                !section.visible && 'opacity-60',
                className
            )}
            dir="rtl"
        >
            <MenuBarEditor
                editor={editor}
                header={<EditorHeader id={id} index={index} />}
            />

            <div className="flex flex-col gap-3 px-4 pt-3 pb-3.5">
                <EditorContent editor={editor} />

                <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <span className="text-label-sm text-outline">
                        {formatFaNumber(characterCount)} نویسه
                    </span>
                    <Button
                        type="button"
                        variant="outline"
                        className="h-9 gap-1.5 rounded-button-md px-4"
                        onClick={() => saveSection(id)}
                    >
                        <Icon label="draft400Linear" className="size-4!" />
                        <span className="text-label-md font-semibold">
                            ذخیره پیش‌نویس
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditSectionView
