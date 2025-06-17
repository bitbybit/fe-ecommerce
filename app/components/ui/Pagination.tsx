import { type ComponentProps, type ReactElement } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight, MoreHorizontalIcon } from 'lucide-react'
import { type Button } from '~/components/ui/Button'
import { buttonVariants } from '~/components/ui/Button'
import { cn } from '~/utils/ui'

export function Pagination({ className, ...props }: ComponentProps<'nav'>): ReactElement {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center my-4', className)}
      {...props}
    />
  )
}

export function PaginationContent({ className, ...props }: ComponentProps<'ul'>): ReactElement {
  return <ul data-slot="pagination-content" className={cn('flex flex-row items-center gap-1', className)} {...props} />
}

export function PaginationItem({ ...props }: ComponentProps<'li'>): ReactElement {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ComponentProps<typeof Button>, 'size'> &
  ComponentProps<'a'>

export function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps): ReactElement {
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
      {...props}
    />
  )
}

export function PaginationPrevious({ className, ...props }: ComponentProps<typeof PaginationLink>): ReactElement {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

export function PaginationNext({ className, ...props }: ComponentProps<typeof PaginationLink>): ReactElement {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

export function PaginationStart({ className, ...props }: ComponentProps<typeof PaginationLink>): ReactElement {
  return (
    <PaginationLink
      aria-label="Go to first page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronsLeft />
      <span className="hidden sm:block">Start</span>
    </PaginationLink>
  )
}

export function PaginationEnd({ className, ...props }: ComponentProps<typeof PaginationLink>): ReactElement {
  return (
    <PaginationLink
      aria-label="Go to last page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">End</span>
      <ChevronsRight />
    </PaginationLink>
  )
}

export function PaginationEllipsis({ className, ...props }: ComponentProps<'span'>): ReactElement {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}
