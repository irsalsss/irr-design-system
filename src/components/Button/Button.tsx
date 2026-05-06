import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
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
        sm: 'h-8  px-3 text-sm gap-1.5',
        md: 'h-9  px-4 text-sm gap-2',
        lg: 'h-10 px-5 text-md gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, loading = false, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
        ) : null}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
