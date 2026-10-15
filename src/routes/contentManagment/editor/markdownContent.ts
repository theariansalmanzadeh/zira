import type { Editor } from '@tiptap/react'
import { Markdown } from '@tiptap/markdown'

export const MarkdownExtension = Markdown

const HTML_MARKUP = /<\/?[a-z][\s\S]*>/i

export const editorContentType = (value: string): 'html' | 'markdown' =>
    HTML_MARKUP.test(value) ? 'html' : 'markdown'

export const readEditorMarkdown = (editor: Editor) => editor.getMarkdown()
