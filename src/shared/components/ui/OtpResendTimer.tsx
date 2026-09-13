"use client"

import { cn } from "@/src/shared/libs/utils"
import { formatFaNumber } from "@/src/shared/libs/formatter"

const formatMmSsFa = (totalSeconds: number) => {
  const safe = Math.max(0, totalSeconds)
  const minutes = Math.floor(safe / 60)
  const seconds = safe % 60
  const fmt = (n: number) =>
    formatFaNumber(n, {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 0,
      useGrouping: false,
    })
  return `${fmt(minutes)} : ${fmt(seconds)}`
}

export type OtpResendTimerProps = {
  remaining: number
  className?: string
}

export function OtpResendTimer({
  remaining,
  className,
}: OtpResendTimerProps) {
  return (
    <div
      dir="rtl"
      className={cn(
        "mb-5 text-center text-sm text-on-surface-variant",
        className
      )}
    >
      <span className="tabular-nums">{formatMmSsFa(remaining)}</span>{" "}
      <span>مانده تا دریافت مجدد کد</span>
    </div>
  )
}
