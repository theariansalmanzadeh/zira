'use client'

import { useEffect, useRef } from 'react'

export const useEnterKey = <T extends HTMLElement>(onEnter: () => void) => {
    const ref = useRef<T>(null)
    const onEnterRef = useRef(onEnter)

    useEffect(() => {
        onEnterRef.current = onEnter
    }, [onEnter])

    useEffect(() => {
        const node = ref.current
        if (!node) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Enter' || event.shiftKey || event.isComposing) return
            event.preventDefault()
            onEnterRef.current()
        }

        node.addEventListener('keydown', handleKeyDown)
        return () => node.removeEventListener('keydown', handleKeyDown)
    }, [])

    return ref
}
