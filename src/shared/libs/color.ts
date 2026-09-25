export const SEMANTIC_COLOR_TOKENS = [
    'success',
    'warning',
    'info',
    'error',
    'primary',
    'yellow',
] as const

export type SemanticColorToken = (typeof SEMANTIC_COLOR_TOKENS)[number]

export type SemanticColorClasses = {
    token: SemanticColorToken
    background: string
    text: string
    className: string
}

const SEMANTIC_COLOR_CLASS: Record<
    SemanticColorToken,
    Pick<SemanticColorClasses, 'background' | 'text'>
> = {
    success: {
        background: 'bg-success-container',
        text: 'text-on-success-container',
    },
    warning: {
        background: 'bg-warning-container',
        text: 'text-on-warning-container',
    },
    info: {
        background: 'bg-info-container',
        text: 'text-on-info-container',
    },
    error: {
        background: 'bg-error-container',
        text: 'text-on-error-container',
    },
    primary: {
        background: 'bg-primary-container',
        text: 'text-on-primary-container',
    },
    yellow: {
        background: 'bg-yellow-container',
        text: 'text-on-yellow-container',
    },
}

/** Picks a random semantic color token and returns matching bg/text classes. */
export const randomColorGenerator = (): SemanticColorClasses => {
    const index = Math.floor(Math.random() * SEMANTIC_COLOR_TOKENS.length)
    const token = SEMANTIC_COLOR_TOKENS[index]
    const { background, text } = SEMANTIC_COLOR_CLASS[token]

    return {
        token,
        background,
        text,
        className: `${background} ${text}`,
    }
}
