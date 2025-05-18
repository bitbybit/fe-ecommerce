import { type HTMLAttributes, type ReactElement } from 'react'
import { cn } from '~/utils/ui'

export function H1({ className, ...properties }: Readonly<HTMLAttributes<HTMLHeadingElement>>): ReactElement {
  return (
    <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)} {...properties} />
  )
}

export function H2({ className, ...properties }: Readonly<HTMLAttributes<HTMLHeadingElement>>): ReactElement {
  return <h2 className={cn('scroll-m-20 text-3xl font-semibold tracking-tight', className)} {...properties} />
}

export function H3({ className, ...properties }: Readonly<HTMLAttributes<HTMLHeadingElement>>): ReactElement {
  return <h3 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...properties} />
}

export function H4({ className, ...properties }: Readonly<HTMLAttributes<HTMLHeadingElement>>): ReactElement {
  return <h4 className={cn('scroll-m-20 text-lg tracking-tight', className)} {...properties} />
}

export function H5({ className, ...properties }: Readonly<HTMLAttributes<HTMLHeadingElement>>): ReactElement {
  return <h5 className={cn('scroll-m-20 text-md font-semibold tracking-tight', className)} {...properties} />
}

export function P({ className, ...properties }: Readonly<HTMLAttributes<HTMLParagraphElement>>): ReactElement {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...properties} />
}

export function Blockquote({ className, ...properties }: Readonly<HTMLAttributes<HTMLQuoteElement>>): ReactElement {
  return <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...properties} />
}
