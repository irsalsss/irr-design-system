import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md font-medium select-none',
    'transition-colors duration-[120ms] ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-busy:pointer-events-none',
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
  /** Screen-reader announcement when loading=true. Defaults to "Loading". */
  loadingLabel?: string
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, loading = false, loadingLabel = 'Loading', disabled, asChild = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        aria-disabled={disabled || loading || undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
            <span className="sr-only">{loadingLabel}</span>
          </>
        ) : null}
        {children}
      </Comp>
    )
  },
)

Button.displayName = 'Button'
