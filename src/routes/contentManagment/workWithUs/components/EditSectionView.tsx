'use client'

import { useEffect, useRef, useState } from 'react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { TextStyleKit } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import {
    imageFileFromList,
    insertImageFile,
} from '@/src/routes/contentManagment/editor/editorImages'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    editorContentType,
    MarkdownExtension,
    readEditorMarkdown,
} from '@/src/routes/contentManagment/editor/markdownContent'
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
    Image.configure({
        inline: false,
        allowBase64: true,
    }),
    Link.configure({
        openOnClick: false,
        HTMLAttributes: {
            class: 'text-primary underline',
        },
    }),
    MarkdownExtension,
]

const EditSectionView = ({ id, index, className }: EditSectionViewProps) => {
    const { sections, updateSection, saveAndPublish } = useWorkWithUs()
    const section = sections.find((item) => item.id === id)
    const [isTouched, setIsTouched] = useState(false)
    const baselineRef = useRef<{
        id: string
        title: string
        body: string
    } | null>(null)

    if (section) {
        const baseline = baselineRef.current
        if (!baseline || baseline.id !== section.id) {
            baselineRef.current = {
                id: section.id,
                title: section.title,
                body: section.body,
            }
            if (isTouched) setIsTouched(false)
        } else if (
            !isTouched &&
            (baseline.title !== section.title || baseline.body !== section.body)
        ) {
            setIsTouched(true)
        }
    }

    const initialBody = section?.body ?? ''

    const editor = useEditor({
        extensions,
        content: initialBody,
        contentType: editorContentType(initialBody),
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
                    '[&_a]:text-primary [&_a]:underline',
                    '[&_img]:my-3 [&_img]:max-h-80 [&_img]:w-full [&_img]:rounded-card-md [&_img]:object-contain'
                ),
            },
            handlePaste: (view, event) => {
                const file = imageFileFromList(event.clipboardData?.files)
                if (!file) return false
                event.preventDefault()
                insertImageFile(view, file)
                return true
            },
            handleDrop: (view, event) => {
                const file = imageFileFromList(event.dataTransfer?.files)
                if (!file) return false
                event.preventDefault()
                insertImageFile(view, file)
                return true
            },
        },
        onUpdate: ({ editor: currentEditor }) => {
            updateSection(id, { body: readEditorMarkdown(currentEditor) })
        },
    })

    useEffect(() => {
        if (!editor || !section) return
        const markdown = readEditorMarkdown(editor)
        if (markdown === section.body) return
        if (
            editorContentType(section.body) === 'html' &&
            editor.getHTML() === section.body
        ) {
            return
        }
        editor.commands.setContent(section.body, {
            emitUpdate: false,
            contentType: editorContentType(section.body),
        })
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
                        variant="primary"
                        className="h-9 gap-1.5 rounded-button-md px-4"
                        disabled={!isTouched}
                        onClick={async () => {
                            const published = await saveAndPublish(id)
                            baselineRef.current = {
                                id: published.id,
                                title: published.title,
                                body: published.body,
                            }
                            setIsTouched(false)
                        }}
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
