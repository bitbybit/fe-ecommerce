import { type ReactElement } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '~/utils/ui'

const alertVariants = cva(
  'border-red-300 ml-6 mr-6 relative rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive: 'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export function Alert({
  className,
  variant,
  ...properties
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>): ReactElement {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...properties} />
}

export function AlertTitle({ className, ...properties }: React.ComponentProps<'div'>): ReactElement {
  return (
    <div
      data-slot="alert-title"
      className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)}
      {...properties}
    />
  )
}

export function AlertDescription({ className, ...properties }: React.ComponentProps<'div'>): ReactElement {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-xs [&_p]:leading-relaxed',
        className
      )}
      {...properties}
    />
  )
}
