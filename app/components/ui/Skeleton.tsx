import { type ComponentProps, type ReactElement } from 'react'
import { cn } from '~/utils/ui'

export function Skeleton({ className, ...properties }: ComponentProps<'div'>): ReactElement {
  return (
    <div
      data-testid="skeleton"
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...properties}
    />
  )
}
