import { type HTMLAttributes, type ReactElement } from 'react'
import { cn } from '~/utils/ui'

export function H4({ className, ...properties }: HTMLAttributes<HTMLHeadingElement>): ReactElement {
  return <h4 className={cn('scroll-m-20 text-lg tracking-tight', className)} {...properties} />
}
