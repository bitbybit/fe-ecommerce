import { render, screen } from '@testing-library/react'
import { ProductBreadcrumbs } from './ProductBreadcrumbs'
import '@testing-library/jest-dom'
import { type ProductListCategory } from '~/api/namespaces/product'
import { MemoryRouter } from 'react-router'
import { ROUTES } from '~/routes'
import { generatePath } from 'react-router'

describe('ProductBreadcrumbs', () => {
  it('renders category breadcrumbs with correct labels and links', () => {
    const breadcrumbs: ProductListCategory[] = [
      { id: 'case', label: 'Case' },
      { id: 'table', label: 'Table' }
    ]

    render(
      <MemoryRouter>
        <ProductBreadcrumbs breadcrumbs={breadcrumbs} />
      </MemoryRouter>
    )

    expect(screen.getByText('Case')).toBeInTheDocument()
    expect(screen.getByText('Table')).toBeInTheDocument()

    expect(screen.getByText('Case').closest('a')).toHaveAttribute(
      'href',
      generatePath(ROUTES.CATEGORY, { categoryId: 'case' })
    )
    expect(screen.getByText('Table').closest('a')).toHaveAttribute(
      'href',
      generatePath(ROUTES.CATEGORY, { categoryId: 'table' })
    )
  })
})
