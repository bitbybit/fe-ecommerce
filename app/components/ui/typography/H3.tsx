import { type HTMLAttributes, type ReactElement } from 'react'
import { cn } from '~/utils/ui'

export function H3({ className, ...properties }: HTMLAttributes<HTMLHeadingElement>): ReactElement {
  return <h3 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...properties} />
}
