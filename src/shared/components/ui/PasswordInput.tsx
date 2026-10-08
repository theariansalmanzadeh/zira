import { cn } from '@shared/libs/utils'
import type { IconLabel } from '@shared/types/icon'
import React, { useState, type ComponentProps } from 'react'
import { Icon } from '@shared/components/Icons/Icon'

type PasswordInputProps = ComponentProps<'input'> & {
  iconClassName?: string
  wrapperClassName?: string
  iconId?: IconLabel
  isPassword?: boolean
  error?: boolean
  message?: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { className, wrapperClassName, iconClassName, error, message, ...props },
    ref
  ) => {
    const [showInput, setShowInput] =
      useState<React.HTMLInputTypeAttribute>('password')

    return (
      <div className='flex flex-col items-start gap-lg'>
        <div
          className={cn(
            'flex w-full flex-row items-center gap-1.5 rounded-lg bg-surface-container-high px-3 aria-invalid:border aria-invalid:border-error',
            wrapperClassName
          )}
          aria-invalid={error}
        >
          <Icon label='key400Linear' className={cn('text-on-surface-variant', iconClassName)} />
          <input
            type={showInput === 'password' ? 'password' : 'text'}
            className={cn(
              'flex w-full bg-transparent py-3 text-base text-on-surface ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-outline focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              className
            )}
            aria-invalid={error}
            ref={ref}
            {...props}
          />
          <button
            type='button'
            className='shrink-0'
            onClick={() => {
              setShowInput((prev) =>
                prev === 'password' ? 'text' : 'password'
              )
            }}
          >
            {showInput !== 'password' ? (
              <Icon label='visibilityOff400Linear' className='text-on-surface-variant' />
            ) : (
              <Icon label='visibility400Linear' className='text-on-surface-variant' />
            )}
          </button>
        </div>
        {message && (
          <div className='flex items-center gap-1'>
            <Icon
              className='h-[20px]! w-[20px]!'
              label='info400Linear'
              fill={error ? '#bf0329' : '#006c50'}
            />
            <span
              className={`text-label-sm font-medium ${error ? 'text-error' : 'text-success'
                }`}
            >
              {message}
            </span>
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
