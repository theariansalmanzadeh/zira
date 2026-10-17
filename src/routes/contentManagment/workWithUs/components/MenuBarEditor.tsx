'use client'

import { useRef } from 'react'
import type { Editor } from '@tiptap/react'
import type { ReactNode } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { cn } from '@shared/libs/utils'
import { insertEditorImage } from '@/src/routes/contentManagment/editor/editorImages'
import { useMenuBarEditorState } from '../hooks/useMenuBarEditorState'

export type MenuBarEditorProps = {
    editor: Editor | null
    header: ReactNode
}

const MenuBarEditor = ({ editor, header }: MenuBarEditorProps) => {
    const { editorState, handleLink } = useMenuBarEditorState(editor)
    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <>
            {header}
            <div className="px-4 pt-3.5">
                <div className="flex w-fit items-center gap-0.5 rounded-card-sm bg-surface-container-high p-1">
                    <button
                        type="button"
                        title="درشت"
                        disabled={!editor || !editorState.canBold}
                        onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                        }
                        className={cn(
                            'flex size-7 items-center justify-center rounded-button-sm text-label-md font-bold text-outline transition-colors hover:bg-surface-container-lowest hover:text-on-surface disabled:opacity-40',
                            editorState.isBold &&
                                'bg-surface-container-lowest text-primary is-active'
                        )}
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
                        className={cn(
                            'flex size-7 items-center justify-center rounded-button-sm text-label-md font-bold italic text-outline transition-colors hover:bg-surface-container-lowest hover:text-on-surface disabled:opacity-40',
                            editorState.isItalic &&
                                'bg-surface-container-lowest text-primary is-active'
                        )}
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
                        className={cn(
                            'flex size-7 items-center justify-center rounded-button-sm text-label-md font-bold underline text-outline transition-colors hover:bg-surface-container-lowest hover:text-on-surface disabled:opacity-40',
                            editorState.isUnderline &&
                                'bg-surface-container-lowest text-primary is-active'
                        )}
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
                        className={cn(
                            'flex size-7 items-center justify-center rounded-button-sm text-label-md font-bold text-outline transition-colors hover:bg-surface-container-lowest hover:text-on-surface disabled:opacity-40',
                            editorState.isBulletList &&
                                'bg-surface-container-lowest text-primary is-active'
                        )}
                    >
                        •
                    </button>
                    <button
                        type="button"
                        title="پیوند"
                        disabled={!editor}
                        onClick={handleLink}
                        className={cn(
                            'flex size-7 items-center justify-center rounded-button-sm text-label-md font-bold text-outline transition-colors hover:bg-surface-container-lowest hover:text-on-surface disabled:opacity-40',
                            editorState.isLink &&
                                'bg-surface-container-lowest text-primary is-active'
                        )}
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
                        className={cn(
                            'flex size-7 items-center justify-center rounded-button-sm text-label-md font-bold text-outline transition-colors hover:bg-surface-container-lowest hover:text-on-surface disabled:opacity-40',
                            editorState.isBlockquote &&
                                'bg-surface-container-lowest text-primary is-active'
                        )}
                    >
                        ❝
                    </button>
                    <button
                        type="button"
                        title="تصویر"
                        disabled={!editor}
                        onClick={() => fileInputRef.current?.click()}
                        className="flex size-7 items-center justify-center rounded-button-sm text-label-md font-bold text-outline transition-colors hover:bg-surface-container-lowest hover:text-on-surface disabled:opacity-40"
                    >
                        <ImageIcon className="size-4" />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                            const file = event.target.files?.[0]
                            if (file && editor) insertEditorImage(editor, file)
                            event.target.value = ''
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default MenuBarEditor
