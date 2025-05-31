import { type HTMLAttributes, type ReactElement } from 'react'
import { cn } from '~/utils/ui'

export function P({ className, ...properties }: Readonly<HTMLAttributes<HTMLParagraphElement>>): ReactElement {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...properties} />
}
