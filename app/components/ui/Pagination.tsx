import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight, MoreHorizontalIcon } from 'lucide-react'

import { cn } from '~/utils/ui'
import type { Button } from '~/components/ui/Button'
import { buttonVariants } from '~/components/ui/Button'
import type { ComponentProps, ReactElement } from 'react'

function Pagination({ className, ...properties }: ComponentProps<'nav'>): ReactElement {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center my-4', className)}
      {...properties}
    />
  )
}

function PaginationContent({ className, ...properties }: ComponentProps<'ul'>): ReactElement {
  return (
    <ul data-slot="pagination-content" className={cn('flex flex-row items-center gap-1', className)} {...properties} />
  )
}

function PaginationItem({ ...properties }: ComponentProps<'li'>): ReactElement {
  return <li data-slot="pagination-item" {...properties} />
}

type PaginationLinkProperties = {
  isActive?: boolean
} & Pick<ComponentProps<typeof Button>, 'size'> &
  ComponentProps<'a'>

function PaginationLink({ className, isActive, size = 'icon', ...properties }: PaginationLinkProperties): ReactElement {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size
        }),
        className
      )}
      {...properties}
    />
  )
}

function PaginationPrevious({ className, ...properties }: ComponentProps<typeof PaginationLink>): ReactElement {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...properties}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, ...properties }: ComponentProps<typeof PaginationLink>): ReactElement {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...properties}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationStart({ className, ...properties }: ComponentProps<typeof PaginationLink>): ReactElement {
  return (
    <PaginationLink
      aria-label="Go to first page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...properties}
    >
      <ChevronsLeft />
      <span className="hidden sm:block">Start</span>
    </PaginationLink>
  )
}

function PaginationEnd({ className, ...properties }: ComponentProps<typeof PaginationLink>): ReactElement {
  return (
    <PaginationLink
      aria-label="Go to last page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...properties}
    >
      <span className="hidden sm:block">End</span>
      <ChevronsRight />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...properties }: ComponentProps<'span'>): ReactElement {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...properties}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationStart,
  PaginationEnd
}
