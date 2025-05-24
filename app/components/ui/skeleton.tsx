import type { ReactElement } from 'react'
import { cn } from '~/utils/ui'

function Skeleton({ className, ...properties }: React.ComponentProps<'div'>): ReactElement {
  return <div data-slot="skeleton" className={cn('bg-accent animate-pulse rounded-md', className)} {...properties} />
}

export { Skeleton }
