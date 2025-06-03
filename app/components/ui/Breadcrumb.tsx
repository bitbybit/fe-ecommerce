import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import type { ComponentProps, ReactElement } from 'react'

import { cn } from '~/utils/ui'

function Breadcrumb({ ...properties }: ComponentProps<'nav'>): ReactElement {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...properties} />
}

function BreadcrumbList({ className, ...properties }: ComponentProps<'ol'>): ReactElement {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
        className
      )}
      {...properties}
    />
  )
}

function BreadcrumbItem({ className, ...properties }: ComponentProps<'li'>): ReactElement {
  return (
    <li data-slot="breadcrumb-item" className={cn('inline-flex items-center gap-1.5', className)} {...properties} />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...properties
}: ComponentProps<'a'> & {
  asChild?: boolean
}): ReactElement {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('hover:text-foreground transition-colors', className)}
      {...properties}
    />
  )
}

function BreadcrumbPage({ className, ...properties }: ComponentProps<'span'>): ReactElement {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-normal', className)}
      {...properties}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...properties }: ComponentProps<'li'>): ReactElement {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...properties}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...properties }: ComponentProps<'span'>): ReactElement {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...properties}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
}
