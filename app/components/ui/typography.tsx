import { cn } from '~/utils/ui'
import { type ReactElement } from 'react'

export function H1({ className, ...properties }: React.HTMLAttributes<HTMLHeadingElement>): ReactElement {
  return (
    <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)} {...properties} />
  )
}

export function H2({ className, ...properties }: React.HTMLAttributes<HTMLHeadingElement>): ReactElement {
  return <h2 className={cn('scroll-m-20 text-3xl font-semibold tracking-tight', className)} {...properties} />
}

export function P({ className, ...properties }: React.HTMLAttributes<HTMLParagraphElement>): ReactElement {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...properties} />
}

export function Blockquote({ className, ...properties }: React.HTMLAttributes<HTMLQuoteElement>): ReactElement {
  return <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...properties} />
}
