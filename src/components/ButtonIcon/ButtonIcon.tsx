import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

const buttonIconVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-colors duration-fast ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:   'bg-brand text-white hover:bg-brand-hover active:bg-teal-800 border border-transparent',
        secondary: 'bg-bg-elevated text-fg border border-border hover:border-border-strong hover:bg-bg-subtle',
        ghost:     'bg-transparent text-fg-muted border border-transparent hover:bg-bg-subtle hover:text-fg',
        danger:    'bg-red-700 text-white hover:bg-red-800 active:bg-red-900 border border-transparent',
      },
      size: {
        sm: 'h-8 w-8 text-sm',
        md: 'h-9 w-9 text-sm',
        lg: 'h-10 w-10 text-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

const iconSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
} satisfies Record<NonNullable<ButtonIconProps['size']>, string>

// ── Types ────────────────────────────────────────────────────────────────────

export interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonIconVariants> {
  /** Show a loading spinner instead of the icon */
  loading?: boolean
  /**
   * Accessible label — required when there is no visible text.
   * Maps to `aria-label`.
   */
  label: string
  /** Icon element to render inside the button */
  icon?: React.ReactNode
}

// ── Component ────────────────────────────────────────────────────────────────

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  (
    {
      variant,
      size,
      loading = false,
      disabled,
      className,
      label,
      icon,
      ...props
    },
    ref,
  ) => {
    const iconSize = size ?? 'md'

    return (
      <button
        ref={ref}
        aria-label={label}
        disabled={disabled || loading}
        className={cn(buttonIconVariants({ variant, size: iconSize }), className)}
        {...props}
      >
        {loading ? (
          <span
            className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', iconSizeClasses[iconSize])}
            aria-hidden
          />
        ) : (
          <span className={cn('flex items-center justify-center', iconSizeClasses[iconSize])} aria-hidden>
            {icon}
          </span>
        )}
      </button>
    )
  },
)

ButtonIcon.displayName = 'ButtonIcon'
