import { type HTMLAttributes, type ReactElement } from 'react'
import { cn } from '~/utils/ui'

export function H1({ className, ...properties }: Readonly<HTMLAttributes<HTMLHeadingElement>>): ReactElement {
  return (
    <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)} {...properties} />
  )
}
