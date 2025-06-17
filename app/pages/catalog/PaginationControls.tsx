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

type PaginationControlsProps = {
  page: number
  totalPage: number
  onPageChange: (page: number) => void
}

export function PaginationControls({ page, totalPage, onPageChange }: PaginationControlsProps): ReactElement {
  const isFirstPage = page === 1
  const isLastPage = page === totalPage
  const classNamesDisabled = 'pointer-events-none opacity-50'

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationStart
            onClick={() => !isFirstPage && onPageChange(1)}
            className={isFirstPage ? classNamesDisabled : ''}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => !isFirstPage && onPageChange(page - 1)}
            className={isFirstPage ? classNamesDisabled : ''}
          />
        </PaginationItem>
        <PaginationItem className="px-2.5 sm:pl-2.5 border rounded-sm">
          {page} / {totalPage}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => !isLastPage && onPageChange(page + 1)}
            className={isLastPage ? classNamesDisabled : ''}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationEnd
            onClick={() => !isLastPage && onPageChange(totalPage)}
            className={isLastPage ? classNamesDisabled : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
