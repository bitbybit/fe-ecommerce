import type { ReactElement } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEnd,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationStart
} from '~/components/ui/Pagination'

export const ITEMS_PER_PAGE = 12

type PaginationControlsProperties = {
  page: number
  totalPage: number
  onPageChange: (page: number) => void
}

export function PaginationControls({ page, totalPage, onPageChange }: PaginationControlsProperties): ReactElement {
  const isFirstPage = page === 1
  const isLastPage = page === totalPage
  const disabledState = 'pointer-events-none opacity-50'

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationStart
            onClick={() => !isFirstPage && onPageChange(1)}
            className={isFirstPage ? disabledState : ''}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => !isFirstPage && onPageChange(page - 1)}
            className={isFirstPage ? disabledState : ''}
          />
        </PaginationItem>
        <PaginationItem className="px-2.5 sm:pl-2.5 border rounded-sm">
          {page} / {totalPage}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => !isLastPage && onPageChange(page + 1)}
            className={isLastPage ? disabledState : ''}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationEnd
            onClick={() => !isLastPage && onPageChange(totalPage)}
            className={isLastPage ? disabledState : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
