'use client'

import { useCallback, useEffect, useState } from 'react'

export const useResendTimer = (durationSeconds: number) => {
    const [remaining, setRemaining] = useState(durationSeconds)

    useEffect(() => {
        if (remaining <= 0) return

        const timer = window.setTimeout(() => {
            setRemaining((seconds) => (seconds <= 1 ? 0 : seconds - 1))
        }, 1000)

        return () => window.clearTimeout(timer)
    }, [remaining])

    const restart = useCallback(() => {
        if (remaining > 0) return
        setRemaining(durationSeconds)
    }, [durationSeconds, remaining])

    return {
        remaining,
        canResend: remaining <= 0,
        restart,
    }
}
