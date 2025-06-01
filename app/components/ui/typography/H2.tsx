import { type HTMLAttributes, type ReactElement } from 'react'
import { cn } from '~/utils/ui'

export function H2({ className, ...properties }: Readonly<HTMLAttributes<HTMLHeadingElement>>): ReactElement {
  return <h2 className={cn('scroll-m-20 text-3xl font-semibold tracking-tight', className)} {...properties} />
}
