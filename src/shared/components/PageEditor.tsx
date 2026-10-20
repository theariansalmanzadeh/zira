'use client'

import {
    createUsePuck,
    Puck,
    RichTextMenu,
    registerOverlayPortal,
    usePuck,
    type Data,
} from '@puckeditor/core'
import type { Config } from '@puckeditor/core'
import { FontSize, TextStyle } from '@tiptap/extension-text-style'
import type { Editor } from '@tiptap/react'
import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode, type SyntheticEvent } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import '@puckeditor/core/puck.css'
import './pageEditor.css'

type HeadingProps = {
    text: string
    level: 'h1' | 'h2' | 'h3'
    span: number
}

type TextProps = {
    text: string
    span: number
}

type ImageProps = {
    src: string
    alt: string
    width: number
    alignment: 'left' | 'center' | 'right'
    span: number
}

type GridProps = {
    gap: number
}

type CardProps = {
    title: string
    body: string
    imageSrc: string
    span: number
}

type CardsRowProps = {
    gap: number
    cards: Array<{
        title: string
        body: string
        imageSrc: string
    }>
}

type TableProps = {
    span: number
    headers: Array<{ label: string }>
    rows: Array<{
        cells: Array<{ value: string }>
    }>
}

type Components = {
    Heading: HeadingProps
    Text: TextProps
    Image: ImageProps
    Grid: GridProps
    Card: CardProps
    CardsRow: CardsRowProps
    Table: TableProps
}

const usePuckStore = createUsePuck<Config<Components>>()

const GRID_ALLOWED = [
    'Heading',
    'Text',
    'Image',
    'Card',
    'CardsRow',
    'Table',
] as const

const FONT_SIZES = ['14px', '16px', '18px', '20px', '24px', '32px']

const spanField = {
    type: 'number' as const,
    label: 'ستون',
    min: 1,
    max: 8,
}

const columnSpan = (span: number) => Math.max(1, Math.min(8, span || 1))

function BlockFrame({
    span,
    children,
}: {
    span: number
    children: ReactNode
}) {
    return (
        <div className="editor-block" data-span={columnSpan(span)}>
            <div className="editor-block-handle" aria-label="جابه‌جایی بلوک">
                ⋮⋮
            </div>
            <div className="editor-block-body">{children}</div>
        </div>
    )
}

const textField = {
    type: 'richtext' as const,
    contentEditable: true,
    tiptap: {
        extensions: [TextStyle, FontSize],
    },
    renderMenu: ({
        children,
        editor,
    }: {
        children: ReactNode
        editor: Editor | null
    }) => <TextFormatMenu editor={editor}>{children}</TextFormatMenu>,
}

function TextFormatMenu({
    editor,
    children,
}: {
    editor: Editor | null
    children: ReactNode
}) {
    const setLink = (event: SyntheticEvent) => {
        event.preventDefault()
        if (!editor) return
        const current = editor.getAttributes('link').href as string | undefined
        const href = window.prompt('آدرس پیوند', current ?? 'https://')
        if (href === null) return
        if (!href.trim()) {
            editor.chain().focus().unsetLink().run()
            return
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
    }

    return (
        <div className="text-format-menu">
            <RichTextMenu>
                {children}
                <RichTextMenu.Group>
                    <RichTextMenu.Bold />
                    <RichTextMenu.Italic />
                    <RichTextMenu.Control
                        title="پیوند"
                        active={Boolean(editor?.isActive('link'))}
                        icon={<span>↗</span>}
                        onClick={setLink}
                    />
                </RichTextMenu.Group>
            </RichTextMenu>
            <select
                className="text-format-size"
                aria-label="اندازه قلم"
                defaultValue="16px"
                onChange={(event) => {
                    const size = event.target.value
                    if (!editor) return
                    editor
                        .chain()
                        .focus()
                        .setFontSize(size)
                        .run()
                }}
            >
                {FONT_SIZES.map((size) => (
                    <option key={size} value={size}>
                        {size.replace('px', '')}
                    </option>
                ))}
            </select>
        </div>
    )
}

function ResizableImage({
    id,
    src,
    alt,
    width,
    alignment,
    span,
    puck,
}: ImageProps & {
    id?: string
    puck?: { isEditing?: boolean }
}) {
    const imageRef = useRef<HTMLImageElement>(null)
    const handleRef = useRef<HTMLButtonElement>(null)
    const { dispatch } = usePuck()

    useEffect(
        () => registerOverlayPortal(handleRef.current, { disableDrag: true }),
        []
    )

    function startResize(event: ReactPointerEvent<HTMLButtonElement>) {
        event.preventDefault()
        event.stopPropagation()

        const startX = event.clientX
        const startWidth =
            imageRef.current?.getBoundingClientRect().width ?? width
        let nextWidth = startWidth

        const onMove = (moveEvent: PointerEvent) => {
            nextWidth = Math.max(
                80,
                Math.min(1200, startWidth + moveEvent.clientX - startX)
            )
            if (imageRef.current) {
                imageRef.current.style.width = `${nextWidth}px`
            }
        }

        const onUp = () => {
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
            const rounded = Math.round(nextWidth)
            if (!id) return
            dispatch({
                type: 'setData',
                data: (previous) => ({
                    content: previous.content.map((item) =>
                        item.props.id === id
                            ? {
                                  ...item,
                                  props: { ...item.props, width: rounded },
                              }
                            : item
                    ),
                    zones: previous.zones
                        ? Object.fromEntries(
                              Object.entries(previous.zones).map(
                                  ([zone, items]) => [
                                      zone,
                                      items.map((item) =>
                                          item.props.id === id
                                              ? {
                                                    ...item,
                                                    props: {
                                                        ...item.props,
                                                        width: rounded,
                                                    },
                                                }
                                              : item
                                      ),
                                  ]
                              )
                          )
                        : previous.zones,
                }),
            })
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp, { once: true })
    }

    return (
        <div
            className="image-block"
            data-span={columnSpan(span)}
            style={{ textAlign: alignment }}
        >
            <div className="image-resize-wrapper">
                <img
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    draggable={false}
                    style={{
                        width: `${width}px`,
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                />
                {puck?.isEditing && (
                    <button
                        ref={handleRef}
                        type="button"
                        className="image-resize-handle"
                        aria-label="تغییر اندازه تصویر"
                        title="برای تغییر اندازه بکشید"
                        onPointerDown={startResize}
                    />
                )}
            </div>
        </div>
    )
}

const config: Config<Components> = {
    components: {
        Heading: {
            label: 'عنوان',
            fields: {
                text: textField,
                span: spanField,
                level: {
                    type: 'select',
                    options: [
                        { label: 'H1', value: 'h1' },
                        { label: 'H2', value: 'h2' },
                        { label: 'H3', value: 'h3' },
                    ],
                },
            },
            defaultProps: {
                text: 'عنوان صفحه',
                level: 'h2',
                span: 4,
            },
            render: ({ text, level, span }) => {
                const Tag = level
                return (
                    <BlockFrame span={span}>
                        <Tag>{text}</Tag>
                    </BlockFrame>
                )
            },
        },
        Text: {
            label: 'متن',
            fields: {
                text: textField,
                span: spanField,
            },
            defaultProps: {
                text: 'متن خود را اینجا بنویسید.',
                span: 4,
            },
            render: ({ text, span }) => (
                <BlockFrame span={span}>
                    <div>{text}</div>
                </BlockFrame>
            ),
        },
        Image: {
            label: 'تصویر',
            fields: {
                src: { type: 'text' },
                alt: { type: 'text' },
                width: { type: 'number', min: 80, max: 1200 },
                alignment: {
                    type: 'radio',
                    options: [
                        { label: 'چپ', value: 'left' },
                        { label: 'وسط', value: 'center' },
                        { label: 'راست', value: 'right' },
                    ],
                },
                span: spanField,
            },
            defaultProps: {
                src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200',
                alt: 'تصویر',
                width: 480,
                alignment: 'center',
                span: 4,
            },
            render: (props) => (
                <BlockFrame span={props.span}>
                    <ResizableImage {...props} />
                </BlockFrame>
            ),
        },
        Grid: {
            label: 'بخش شبکه‌ای',
            fields: {
                gap: { type: 'number', label: 'فاصله', min: 0, max: 64 },
            },
            defaultProps: {
                gap: 16,
            },
            render: ({ gap, puck }) => (
                <div className="grid-section">
                    {puck.renderDropZone({
                        zone: 'grid-content',
                        allow: [...GRID_ALLOWED],
                        collisionAxis: 'dynamic',
                        className: 'content-grid',
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
                            gap,
                        },
                    })}
                </div>
            ),
        },
        Card: {
            label: 'کارت',
            fields: {
                title: { type: 'text', label: 'عنوان' },
                body: textField,
                imageSrc: { type: 'text', label: 'آدرس تصویر' },
                span: spanField,
            },
            defaultProps: {
                title: 'عنوان کارت',
                body: 'توضیحات کارت را اینجا بنویسید.',
                imageSrc: '',
                span: 4,
            },
            render: ({ title, body, imageSrc, span }) => (
                <BlockFrame span={span}>
                    <article className="editor-card" dir="rtl">
                        {imageSrc ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={imageSrc}
                                alt=""
                                className="editor-card-image"
                            />
                        ) : null}
                        <h3 className="editor-card-title">{title}</h3>
                        <div className="editor-card-body">{body}</div>
                    </article>
                </BlockFrame>
            ),
        },
        CardsRow: {
            label: '۳ کارت در یک ردیف',
            fields: {
                gap: { type: 'number', label: 'فاصله', min: 0, max: 64 },
                cards: {
                    type: 'array',
                    label: 'کارت‌ها',
                    min: 3,
                    max: 3,
                    getItemSummary: (item) => item.title || 'کارت',
                    defaultItemProps: {
                        title: 'عنوان کارت',
                        body: 'توضیحات کارت را اینجا بنویسید.',
                        imageSrc: '',
                    },
                    arrayFields: {
                        title: { type: 'text', label: 'عنوان' },
                        body: { type: 'textarea', label: 'متن' },
                        imageSrc: { type: 'text', label: 'آدرس تصویر' },
                    },
                },
            },
            defaultProps: {
                gap: 16,
                cards: [
                    {
                        title: 'کارت ۱',
                        body: 'توضیحات کارت را اینجا بنویسید.',
                        imageSrc: '',
                    },
                    {
                        title: 'کارت ۲',
                        body: 'توضیحات کارت را اینجا بنویسید.',
                        imageSrc: '',
                    },
                    {
                        title: 'کارت ۳',
                        body: 'توضیحات کارت را اینجا بنویسید.',
                        imageSrc: '',
                    },
                ],
            },
            render: ({ gap, cards }) => (
                <div
                    className="cards-row"
                    dir="rtl"
                    style={{ gap }}
                >
                    {(cards ?? []).map((card, index) => (
                        <article key={index} className="editor-card">
                            {card.imageSrc ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={card.imageSrc}
                                    alt=""
                                    className="editor-card-image"
                                />
                            ) : null}
                            <h3 className="editor-card-title">{card.title}</h3>
                            <div className="editor-card-body">{card.body}</div>
                        </article>
                    ))}
                </div>
            ),
        },
        Table: {
            label: 'جدول',
            fields: {
                span: spanField,
                headers: {
                    type: 'array',
                    label: 'ستون‌ها',
                    min: 1,
                    getItemSummary: (item) => item.label || 'ستون',
                    defaultItemProps: { label: 'ستون' },
                    arrayFields: {
                        label: { type: 'text', label: 'عنوان ستون' },
                    },
                },
                rows: {
                    type: 'array',
                    label: 'ردیف‌ها',
                    getItemSummary: (_item, index) => `ردیف ${(index ?? 0) + 1}`,
                    defaultItemProps: {
                        cells: [
                            { value: '' },
                            { value: '' },
                            { value: '' },
                        ],
                    },
                    arrayFields: {
                        cells: {
                            type: 'array',
                            label: 'سلول‌ها',
                            getItemSummary: (item) => item.value || 'سلول',
                            defaultItemProps: { value: '' },
                            arrayFields: {
                                value: { type: 'text', label: 'مقدار' },
                            },
                        },
                    },
                },
            },
            defaultProps: {
                span: 8,
                headers: [
                    { label: 'ستون ۱' },
                    { label: 'ستون ۲' },
                    { label: 'ستون ۳' },
                ],
                rows: [
                    {
                        cells: [
                            { value: 'مقدار ۱' },
                            { value: 'مقدار ۲' },
                            { value: 'مقدار ۳' },
                        ],
                    },
                    {
                        cells: [
                            { value: 'مقدار ۴' },
                            { value: 'مقدار ۵' },
                            { value: 'مقدار ۶' },
                        ],
                    },
                ],
            },
            render: ({ span, headers, rows }) => (
                <BlockFrame span={span}>
                    <div className="editor-table-wrap" dir="rtl">
                        <table className="editor-table">
                            <thead>
                                <tr>
                                    {(headers ?? []).map((header, index) => (
                                        <th key={index}>{header.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {(rows ?? []).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {(headers ?? []).map((_, cellIndex) => (
                                            <td key={cellIndex}>
                                                {row.cells?.[cellIndex]?.value ??
                                                    ''}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </BlockFrame>
            ),
        },
    },
    root: {
        render: ({ children }) => (
            <div className="page-sections">{children}</div>
        ),
    },
}

export const initialPageData: Data = {
    content: [
        {
            type: 'Grid',
            props: {
                gap: 16,
                id: 'grid-1',
            },
        },
    ],
    zones: {
        'grid-1:grid-content': [
            {
                type: 'Heading',
                props: {
                    text: 'چیدمان صفحه',
                    level: 'h1',
                    span: 4,
                    id: 'heading-1',
                },
            },
            {
                type: 'Text',
                props: {
                    text: 'بلوک‌ها را داخل بخش شبکه‌ای کنار هم بگذارید.',
                    span: 4,
                    id: 'text-1',
                },
            },
            {
                type: 'Image',
                props: {
                    src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200',
                    alt: 'تصویر',
                    width: 480,
                    alignment: 'center',
                    span: 4,
                    id: 'image-1',
                },
            },
        ],
    },
    root: {},
}

export const pageDataFromBody = (body: string): Data => {
    if (!body.trim()) return initialPageData
    try {
        const parsed = JSON.parse(body) as Data
        if (parsed && Array.isArray(parsed.content)) return parsed
    } catch {
        return {
            root: {},
            content: [
                {
                    type: 'Text',
                    props: {
                        id: 'existing-text',
                        text: body,
                    },
                },
            ],
        }
    }
    return initialPageData
}

type PageEditorProps = {
    data?: Data
    onChange?: (data: Data) => void
    onPublish?: (data: Data) => void | Promise<void>
}

function PublishHeaderActions({
    onPublish,
}: {
    onPublish?: (data: Data) => void | Promise<void>
}) {
    const data = usePuckStore((s) => s.appState.data)

    return (
        <Button
            type="button"
            variant="primary"
            onClick={() => {
                void onPublish?.(data)
            }}
        >
            ثبت
        </Button>
    )
}

const PageEditor = ({
    data = initialPageData,
    onChange,
    onPublish,
}: PageEditorProps) => (
    <div className="editor-shell" dir="ltr">
        <Puck
            config={config}
            data={data}
            height="70vh"
            iframe={{ enabled: false }}
            dnd={{ behavior: 'fluid' }}
            onChange={onChange}
            onPublish={onPublish}
            overrides={{
                headerActions: () => (
                    <PublishHeaderActions onPublish={onPublish} />
                ),
            }}
        />
    </div>
)

export default PageEditor
