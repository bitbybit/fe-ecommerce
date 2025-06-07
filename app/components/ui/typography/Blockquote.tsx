import { type HTMLAttributes, type ReactElement } from 'react'
import { cn } from '~/utils/ui'

export function Blockquote({ className, ...properties }: HTMLAttributes<HTMLQuoteElement>): ReactElement {
  return <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...properties} />
}
